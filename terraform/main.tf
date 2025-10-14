terraform {
  required_providers {
    ssh = {
      source  = "loafoe/ssh"
      version = "2.2.0"
    }
  }
}

provider "ssh" {}

# Cài đặt K3s master node
resource "ssh_resource" "install_master" {
  host        = var.master_ip
  user        = var.user
  private_key = file(var.ssh_private_key)
  timeout     = "15m"
  
  commands = [
    # Dừng và gỡ K3s cũ hoàn toàn
    "sudo systemctl stop k3s 2>/dev/null || true",
    "sudo /usr/local/bin/k3s-uninstall.sh 2>/dev/null || true",
    "sudo pkill -9 k3s 2>/dev/null || true",
    "sleep 10",
    
    # Xóa thư mục cũ
    "sudo rm -rf /var/lib/rancher/k3s",
    "sudo rm -rf /etc/rancher/k3s",
    
    # Cài đặt K3s master (bỏ --cluster-init nếu chỉ có 1 master)
    "curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC='server' sh -",
    
    # Chờ K3s service active
    "echo 'Waiting for K3s service to start...'",
    "timeout 180 bash -c 'until sudo systemctl is-active k3s >/dev/null 2>&1; do echo \"Waiting...\"; sleep 5; done'",
    
    # Chờ API server sẵn sàng
    "timeout 120 bash -c 'until sudo kubectl get nodes >/dev/null 2>&1; do echo \"Waiting for API server...\"; sleep 3; done'",
    
    # Chờ token file được tạo
    "timeout 60 bash -c 'until sudo test -f /var/lib/rancher/k3s/server/node-token; do echo \"Waiting for token file...\"; sleep 3; done'",
    
    # Verify cài đặt
    "echo '=== K3s Master Status ==='",
    "sudo systemctl status k3s --no-pager | head -10",
    "echo '=== Node Status ==='",
    "sudo kubectl get nodes",
    "echo 'K3s master installed successfully!'"
  ]
}

# Lấy token từ master node (dùng resource riêng)
resource "ssh_resource" "get_token" {
  host        = var.master_ip
  user        = var.user
  private_key = file(var.ssh_private_key)
  timeout     = "5m"
  
  commands = [
    "sleep 5",
    "if ! sudo test -f /var/lib/rancher/k3s/server/node-token; then echo 'ERROR: Token file not found!'; exit 1; fi",
    "sudo cat /var/lib/rancher/k3s/server/node-token"
  ]
  
  depends_on = [ssh_resource.install_master]
}

# Cài đặt K3s worker node
resource "ssh_resource" "install_worker" {
  host        = var.worker_ip
  user        = var.user
  private_key = file(var.ssh_private_key)
  timeout     = "15m"
  
  commands = [
    # Dừng và gỡ agent cũ
    "sudo systemctl stop k3s-agent 2>/dev/null || true",
    "sudo /usr/local/bin/k3s-agent-uninstall.sh 2>/dev/null || true",
    "sleep 5",
    
    # Join vào cluster
    "curl -sfL https://get.k3s.io | K3S_URL='https://${var.master_ip}:6443' K3S_TOKEN='${trimspace(ssh_resource.get_token.result)}' sh -",
    
    # Chờ agent active
    "echo 'Waiting for K3s agent to start...'",
    "timeout 180 bash -c 'until sudo systemctl is-active k3s-agent >/dev/null 2>&1; do echo \"Waiting...\"; sleep 5; done'",
    
    # Verify
    "echo '=== K3s Agent Status ==='",
    "sudo systemctl status k3s-agent --no-pager | head -10",
    "echo 'K3s worker joined successfully!'"
  ]
  
  depends_on = [ssh_resource.get_token]
}
