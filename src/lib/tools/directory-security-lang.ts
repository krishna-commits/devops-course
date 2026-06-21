import type { ToolGuide } from "../types";

export const ldap: ToolGuide = {
  slug: "ldap",
  name: "OpenLDAP",
  category: "directory",
  description: "Lightweight directory access protocol for centralized user and group management",
  icon: "👥",
  install: {
    id: "install",
    title: "Install OpenLDAP",
    steps: [
      {
        title: "(01) Install OpenLDAP server",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get install -y slapd ldap-utils

# During install, set admin password (dc=example,dc=com)

# RHEL / Fedora
sudo dnf install -y openldap-servers openldap-clients
sudo systemctl enable --now slapd`,
          mac: "# Docker:\ndocker run -d -p 389:389 -p 636:636 osixia/openldap:1.5.0",
          windows: "# Use Docker or Active Directory Domain Services role",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure LDAP",
    steps: [
      {
        title: "(01) Reconfigure base DN and admin",
        commands: {
          linux: `sudo dpkg-reconfigure slapd
# DNS domain name: example.com
# Organization: Example Inc
# Admin password: (your password)

# Verify config
sudo slapcat | head -20`,
          mac: "# Configure via Docker env:\n# LDAP_ORGANISATION=Example\n# LDAP_DOMAIN=example.com\n# LDAP_ADMIN_PASSWORD=admin",
          windows: "# Install AD DS: Install-WindowsFeature -Name AD-Domain-Services",
        },
      },
      {
        title: "(02) Add organizational units and users",
        commands: {
          linux: `# Create OU structure LDIF
cat > ou.ldif << 'EOF'
dn: ou=people,dc=example,dc=com
objectClass: organizationalUnit
ou: people

dn: ou=groups,dc=example,dc=com
objectClass: organizationalUnit
ou: groups
EOF

sudo ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f ou.ldif

# Add user
cat > user.ldif << 'EOF'
dn: uid=john,ou=people,dc=example,dc=com
objectClass: inetOrgPerson
uid: john
sn: Doe
cn: John Doe
userPassword: {SSHA}password_hash
mail: john@example.com
EOF

# Generate password hash:
slappasswd -s mypassword
sudo ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f user.ldif`,
          mac: "# Use ldapadd against Docker OpenLDAP",
          windows: "# Use Active Directory Users and Computers (ADUC)",
        },
      },
      {
        title: "(03) Configure LDAP client (Linux)",
        commands: {
          linux: `sudo apt-get install -y libnss-ldap libpam-ldap nscd

sudo nano /etc/ldap/ldap.conf
# BASE    dc=example,dc=com
# URI     ldap://192.168.1.10

sudo nano /etc/nsswitch.conf
# passwd: files ldap
# group:  files ldap
# shadow: files ldap

sudo systemctl restart nscd
getent passwd john`,
          mac: "# LDAP client via Directory Utility",
          windows: "# Join domain: Add-Computer -DomainName example.com",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify LDAP",
    steps: [
      {
        title: "(01) Search directory",
        commands: {
          linux: `ldapsearch -x -H ldap://localhost -b "dc=example,dc=com" -D "cn=admin,dc=example,dc=com" -W
ldapwhoami -x -H ldap://localhost -D "uid=john,ou=people,dc=example,dc=com" -W`,
          mac: "ldapsearch -x -H ldap://localhost -b 'dc=example,dc=com'",
          windows: "ldp.exe  # LDAP browser tool",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage LDAP",
    steps: [
      {
        title: "(01) Modify and delete entries",
        commands: {
          linux: `# Modify user
cat > modify.ldif << 'EOF'
dn: uid=john,ou=people,dc=example,dc=com
changetype: modify
replace: mail
mail: john.doe@example.com
EOF
ldapmodify -x -D "cn=admin,dc=example,dc=com" -W -f modify.ldif

# Delete user
ldapdelete -x -D "cn=admin,dc=example,dc=com" -W "uid=john,ou=people,dc=example,dc=com"`,
          mac: "# Same ldapmodify/ldapdelete",
          windows: "# Manage via ADUC or ldp.exe",
        },
      },
    ],
  },
};

export const selinux: ToolGuide = {
  slug: "selinux",
  name: "SELinux",
  category: "security",
  description: "Security-Enhanced Linux mandatory access control for RHEL, CentOS, and Fedora",
  icon: "🔐",
  install: {
    id: "install",
    title: "Install / Enable SELinux",
    steps: [
      {
        title: "(01) SELinux is pre-installed on RHEL-based systems",
        commands: {
          linux: `# Check if installed
rpm -q libselinux selinux-policy
sestatus

# Ubuntu (optional):
sudo apt-get install -y selinux-basics selinux-policy-default
sudo selinux-activate  # requires reboot`,
          mac: "# SELinux is Linux-only (RHEL/Fedora/CentOS)",
          windows: "# Use Windows Defender / AppLocker instead",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure SELinux",
    steps: [
      {
        title: "(01) Set operating mode",
        commands: {
          linux: `# Check current mode
getenforce          # Enforcing, Permissive, or Disabled
sestatus

# Temporary change
sudo setenforce 0   # Permissive (logs but doesn't block)
sudo setenforce 1   # Enforcing

# Permanent — edit /etc/selinux/config:
# SELINUX=enforcing
# SELINUXTYPE=targeted
# Reboot required for Disabled → Enabling`,
          mac: "N/A",
          windows: "N/A",
        },
      },
      {
        title: "(02) File contexts and booleans",
        commands: {
          linux: `# View file context
ls -Z /var/www/html/
ps auxZ | grep httpd

# Restore default context
sudo restorecon -Rv /var/www/html/

# Change context type
sudo semanage fcontext -a -t httpd_sys_content_t "/web(/.*)?"
sudo restorecon -Rv /web

# Boolean settings
getsebool -a | grep httpd
sudo setsebool -P httpd_can_network_connect on`,
          mac: "N/A",
          windows: "N/A",
        },
      },
      {
        title: "(03) Troubleshoot denials",
        commands: {
          linux: `# View AVC denials
sudo ausearch -m avc -ts recent
sudo sealert -a /var/log/audit/audit.log

# Generate custom policy from denial
sudo ausearch -m avc -c 'httpd' --raw | audit2allow -M myhttpd
sudo semodule -i myhttpd.pp

# audit2why for explanation
sudo ausearch -m avc -ts recent | audit2why`,
          mac: "N/A",
          windows: "N/A",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify SELinux",
    steps: [
      {
        title: "(01) Check status and policies",
        commands: {
          linux: `sestatus\nsemodule -l | head\nsesearch --allow -s httpd_t -t httpd_sys_content_t`,
          mac: "N/A",
          windows: "N/A",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage SELinux",
    steps: [
      {
        title: "(01) Port labeling and policy modules",
        commands: {
          linux: `# Allow custom port
sudo semanage port -a -t http_port_t -p tcp 8080
sudo semanage port -l | grep http

# Install/remove policy module
sudo semodule -i mypolicy.pp
sudo semodule -r mypolicy

# Full relabel (after enable)
sudo touch /.autorelabel
sudo reboot`,
          mac: "N/A",
          windows: "N/A",
        },
      },
    ],
  },
};

export const python: ToolGuide = {
  slug: "python",
  name: "Python",
  category: "build",
  description: "Install and configure Python for DevOps scripting and automation",
  icon: "🐍",
  install: {
    id: "install",
    title: "Install Python",
    steps: [
      {
        title: "(01) Install Python 3",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv python3-dev

# RHEL / Fedora
sudo dnf install -y python3 python3-pip

# pyenv (multiple versions)
curl https://pyenv.run | bash`,
          mac: `brew install python@3.12
# Or pyenv:
brew install pyenv
pyenv install 3.12.0
pyenv global 3.12.0`,
          windows: `winget install Python.Python.3.12
# Or: choco install python -y`,
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Python",
    steps: [
      {
        title: "(01) Virtual environments",
        commands: {
          linux: `python3 -m venv ~/venvs/myproject
source ~/venvs/myproject/bin/activate
pip install --upgrade pip
pip install boto3 ansible requests flask

# deactivate when done
deactivate`,
          mac: `python3 -m venv ~/venvs/myproject
source ~/venvs/myproject/bin/activate
pip install boto3 flask`,
          windows: `python -m venv C:\\venvs\\myproject
C:\\venvs\\myproject\\Scripts\\activate
pip install boto3 flask`,
        },
      },
      {
        title: "(02) pip and requirements.txt",
        commands: {
          linux: `pip freeze > requirements.txt
pip install -r requirements.txt

# User-level install
pip install --user ansible
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc`,
          mac: `pip freeze > requirements.txt\npip install -r requirements.txt`,
          windows: `pip freeze > requirements.txt\npip install -r requirements.txt`,
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Python",
    steps: [
      {
        title: "(01) Check installation",
        commands: {
          linux: "python3 --version\npip3 --version\npython3 -c \"import sys; print(sys.executable)\"",
          mac: "python3 --version\npip3 --version",
          windows: "python --version\npip --version",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Python",
    steps: [
      {
        title: "(01) Common DevOps packages",
        commands: {
          linux: `pip install ansible boto3 kubernetes docker pyyaml jinja2 requests
pip list
pip show boto3`,
          mac: "pip install ansible boto3 kubernetes docker",
          windows: "pip install ansible boto3 kubernetes docker",
        },
      },
    ],
  },
};

export const go: ToolGuide = {
  slug: "go",
  name: "Go (Golang)",
  category: "build",
  description: "Install Go for building CLI tools, Kubernetes operators, and cloud-native apps",
  icon: "🔵",
  install: {
    id: "install",
    title: "Install Go",
    steps: [
      {
        title: "(01) Install Go",
        commands: {
          linux: `# Official binary
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
source ~/.bashrc

# Ubuntu package
sudo apt-get install -y golang-go`,
          mac: "brew install go",
          windows: "winget install GoLang.Go\n# Or: choco install golang -y",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Go",
    steps: [
      {
        title: "(01) Set GOPATH and workspace",
        commands: {
          linux: `mkdir -p ~/go/{bin,src,pkg}
go env -w GOPATH=$HOME/go
go env -w GO111MODULE=on
echo 'export PATH=$PATH:$HOME/go/bin' >> ~/.bashrc
source ~/.bashrc
go env`,
          mac: `mkdir -p ~/go/{bin,src,pkg}\ngo env -w GOPATH=$HOME/go\ngo env -w GO111MODULE=on`,
          windows: `# Set environment variables:
# GOPATH=C:\\Users\\you\\go
# Add C:\\Users\\you\\go\\bin to PATH
go env`,
        },
      },
      {
        title: "(02) Create and build a project",
        commands: {
          linux: `mkdir -p ~/projects/hello && cd ~/projects/hello
go mod init github.com/you/hello
cat > main.go << 'EOF'
package main
import "fmt"
func main() { fmt.Println("Hello, DevOps!") }
EOF
go run main.go
go build -o hello main.go
./hello`,
          mac: "# Same go mod init / go build steps",
          windows: "# Same go mod init / go build steps",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Go",
    steps: [
      {
        title: "(01) Check version",
        commands: {
          linux: "go version\ngo env GOPATH GOROOT",
          mac: "go version",
          windows: "go version",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Go",
    steps: [
      {
        title: "(01) Install DevOps CLI tools",
        commands: {
          linux: `go install github.com/weaveworks/eksctl/latest/cmd/eksctl@latest
go install sigs.k8s.io/kind@latest
go install github.com/hasura/graphql-engine/cli/v2@latest

# Tools installed to $GOPATH/bin
ls ~/go/bin/`,
          mac: `go install sigs.k8s.io/kind@latest\ngo install github.com/weaveworks/eksctl/latest/cmd/eksctl@latest`,
          windows: "go install sigs.k8s.io/kind@latest",
        },
      },
    ],
  },
};
