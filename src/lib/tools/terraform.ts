import type { ToolGuide } from "../types";

export const terraform: ToolGuide = {
  slug: "terraform",
  name: "Terraform",
  category: "iac",
  description: "Infrastructure as Code tool by HashiCorp",
  icon: "🏗️",
  install: {
    id: "install",
    title: "Install Terraform",
    steps: [
      {
        title: "(01) Install Terraform",
        commands: {
          linux: `# HashiCorp official repo (Ubuntu/Debian)
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Or direct download
curl -fsSL https://releases.hashicorp.com/terraform/1.10.0/terraform_1.10.0_linux_amd64.zip -o terraform.zip
unzip terraform.zip && sudo mv terraform /usr/local/bin/`,
          mac: "brew tap hashicorp/tap && brew install hashicorp/tap/terraform",
          windows: `# winget
winget install Hashicorp.Terraform

# Or Chocolatey
choco install terraform -y`,
        },
      },
      {
        title: "(02) Enable Tab Completion",
        commands: {
          linux: `terraform -install-autocomplete
# Add to ~/.bashrc or ~/.zshrc:
# complete -C /usr/bin/terraform terraform`,
          mac: "terraform -install-autocomplete",
          windows: "# Tab completion available in PowerShell 5+ via PSReadLine",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Installation",
    steps: [
      {
        title: "(01) Check Version",
        commands: {
          linux: "terraform version",
          mac: "terraform version",
          windows: "terraform version",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Terraform",
    steps: [
      {
        title: "(01) Initialize & Plan",
        commands: {
          linux: `cd your-project/
terraform init
terraform validate
terraform plan -out=tfplan`,
          mac: `cd your-project/
terraform init
terraform validate
terraform plan -out=tfplan`,
          windows: `cd your-project/
terraform init
terraform validate
terraform plan -out=tfplan`,
        },
      },
      {
        title: "(02) Apply & Destroy",
        commands: {
          linux: `terraform apply tfplan
terraform apply -auto-approve
terraform destroy`,
          mac: `terraform apply tfplan
terraform apply -auto-approve
terraform destroy`,
          windows: `terraform apply tfplan
terraform apply -auto-approve
terraform destroy`,
        },
      },
      {
        title: "(03) State Management",
        commands: {
          linux: `terraform state list
terraform state show aws_instance.example
terraform import aws_instance.example i-1234567890abcdef0
terraform fmt -recursive`,
          mac: `terraform state list
terraform state show aws_instance.example
terraform import aws_instance.example i-1234567890abcdef0
terraform fmt -recursive`,
          windows: `terraform state list
terraform state show aws_instance.example
terraform import aws_instance.example i-1234567890abcdef0
terraform fmt -recursive`,
        },
      },
    ],
  },
};
