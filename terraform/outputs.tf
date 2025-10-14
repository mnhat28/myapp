output "cluster_name" {
  description = "Tên cụm cluster"
  value       = var.cluster_name
}

output "master_ip" {
  description = "Địa chỉ IP của master node"
  value       = var.master_ip
}

output "worker_ip" {
  description = "Địa chỉ IP của worker node"
  value       = var.worker_ip
}

output "join_token" {
  description = "Token dùng để join worker node vào master"
  value       = trimspace(ssh_resource.get_token.result)
  sensitive   = true
}

output "k3s_url" {
  description = "Địa chỉ API của K3s Master"
  value       = "https://${var.master_ip}:6443"
}

output "kubeconfig_command" {
  description = "Lệnh để lấy kubeconfig từ master"
  value       = "ssh ${var.user}@${var.master_ip} 'sudo cat /etc/rancher/k3s/k3s.yaml'"
}
