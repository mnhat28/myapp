variable "master_ip" {
  description = "Địa chỉ IP của master node"
  default     = "192.168.2.61"
}

variable "worker_ip" {
  description = "Địa chỉ IP của worker node"
  default     = "192.168.2.166"
}

variable "user" {
  description = "Tên user SSH để đăng nhập vào các node"
  default     = "mnhat"
}

variable "ssh_private_key" {
  description = "Đường dẫn tới private key SSH"
  default     = "~/.ssh/id_rsa"
}

variable "cluster_name" {
  description = "Tên cụm cluster K3s"
  default     = "lan-cluster"
}
