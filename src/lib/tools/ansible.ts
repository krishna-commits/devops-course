import type { ToolGuide } from "../types";

export const ansible: ToolGuide = {
  slug: "ansible",
  name: "Ansible",
  category: "iac",
  description: "Agentless IT automation and configuration management",
  icon: "📋",
  install: {
    id: "install",
    title: "Install Ansible",
    steps: [
      {
        title: "(01) Install Ansible",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y ansible

# Or via pip (recommended for latest version)
sudo apt-get install -y python3-pip
pip3 install ansible --user

# RHEL / Fedora
sudo dnf install -y ansible`,
          mac: "brew install ansible",
          windows: `# Install via WSL (recommended)
# In WSL Ubuntu:
sudo apt update && sudo apt install -y ansible

# Or via pip in PowerShell
pip install ansible`,
        },
      },
      {
        title: "(02) Create Inventory File",
        commands: {
          linux: `cat > inventory.ini << 'EOF'
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
EOF`,
          mac: `cat > inventory.ini << 'EOF'
[webservers]
web1.example.com

[dbservers]
db1.example.com
EOF`,
          windows: `# Create inventory.ini in WSL or use:
@'
[webservers]
web1.example.com
'@ | Out-File -Encoding utf8 inventory.ini`,
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
          linux: "ansible --version",
          mac: "ansible --version",
          windows: "ansible --version",
        },
      },
      {
        title: "(02) Ping Hosts",
        commands: {
          linux: "ansible all -i inventory.ini -m ping",
          mac: "ansible all -i inventory.ini -m ping",
          windows: "ansible all -i inventory.ini -m ping",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Ansible",
    steps: [
      {
        title: "(01) Ad-hoc Commands",
        commands: {
          linux: `# Run command on all hosts
ansible all -i inventory.ini -a "uptime"

# Run with sudo
ansible webservers -i inventory.ini -a "apt update" -b

# Copy file
ansible webservers -i inventory.ini -m copy -a "src=./file dest=/tmp/file"`,
          mac: `ansible all -i inventory.ini -a "uptime"
ansible webservers -i inventory.ini -a "brew update" -b
ansible webservers -i inventory.ini -m copy -a "src=./file dest=/tmp/file"`,
          windows: `ansible all -i inventory.ini -a "uptime"
ansible webservers -i inventory.ini -m copy -a "src=./file dest=/tmp/file"`,
        },
      },
      {
        title: "(02) Playbook Operations",
        commands: {
          linux: `# Run playbook
ansible-playbook -i inventory.ini site.yml

# Check mode (dry run)
ansible-playbook -i inventory.ini site.yml --check

# Limit to specific hosts
ansible-playbook -i inventory.ini site.yml --limit webservers`,
          mac: `ansible-playbook -i inventory.ini site.yml
ansible-playbook -i inventory.ini site.yml --check
ansible-playbook -i inventory.ini site.yml --limit webservers`,
          windows: `ansible-playbook -i inventory.ini site.yml
ansible-playbook -i inventory.ini site.yml --check`,
        },
      },
    ],
  },
};
