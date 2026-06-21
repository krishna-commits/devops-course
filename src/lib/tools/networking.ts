import type { ToolGuide } from "../types";

export const ssh: ToolGuide = {
  slug: "ssh",
  name: "SSH Server",
  category: "networking",
  description: "Secure remote shell access, key authentication, and file transfer",
  icon: "🔑",
  install: {
    id: "install",
    title: "Install OpenSSH Server",
    steps: [
      {
        title: "(01) Install SSH server",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y openssh-server

# RHEL / CentOS / Fedora
sudo dnf install -y openssh-server

# Enable and start
sudo systemctl enable sshd
sudo systemctl start sshd`,
          mac: `# macOS — enable Remote Login
sudo systemsetup -setremotelogin on
# Or: System Settings → General → Sharing → Remote Login`,
          windows: `# Install OpenSSH Server (PowerShell Admin)
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic`,
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure SSH",
    steps: [
      {
        title: "(01) Harden sshd_config",
        commands: {
          linux: `sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudo nano /etc/ssh/sshd_config

# Recommended settings:
# Port 22
# PermitRootLogin no
# PasswordAuthentication yes
# PubkeyAuthentication yes
# AllowUsers youruser

sudo systemctl restart sshd
sudo sshd -t   # test config`,
          mac: `sudo nano /etc/ssh/sshd_config
sudo launchctl unload /System/Library/LaunchDaemons/ssh.plist
sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist`,
          windows: `notepad C:\\ProgramData\\ssh\\sshd_config
Restart-Service sshd`,
        },
      },
      {
        title: "(02) SSH key pair authentication",
        commands: {
          linux: `# On client — generate key
ssh-keygen -t ed25519 -C "you@example.com"

# Copy public key to server
ssh-copy-id user@server-ip

# Connect with key
ssh user@server-ip`,
          mac: `ssh-keygen -t ed25519
ssh-copy-id user@server-ip
ssh user@server-ip`,
          windows: `ssh-keygen -t ed25519
type $env:USERPROFILE\\.ssh\\id_ed25519.pub | ssh user@server-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"`,
        },
      },
      {
        title: "(03) Disable password auth (keys only)",
        commands: {
          linux: `# In /etc/ssh/sshd_config:
# PasswordAuthentication no
# ChallengeResponseAuthentication no
sudo systemctl restart sshd`,
          mac: "# Set PasswordAuthentication no in sshd_config",
          windows: "# Set PasswordAuthentication no in sshd_config",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify SSH",
    steps: [
      {
        title: "(01) Test connection",
        commands: {
          linux: "sudo systemctl status sshd\nssh -v user@localhost\nss -tlnp | grep :22",
          mac: "ssh -v user@localhost",
          windows: "Get-Service sshd\nssh user@localhost",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage SSH",
    steps: [
      {
        title: "(01) SCP and SFTP file transfer",
        commands: {
          linux: `# Copy to server
scp file.txt user@server:/home/user/
scp -r ./folder user@server:/home/user/

# SFTP session
sftp user@server
# put file.txt  / get file.txt`,
          mac: `scp file.txt user@server:/home/user/
sftp user@server`,
          windows: `scp file.txt user@server:C:/Users/user/
sftp user@server`,
        },
      },
      {
        title: "(02) SSH agent and tunneling",
        commands: {
          linux: `eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Local port forward
ssh -L 8080:localhost:80 user@server

# Remote port forward
ssh -R 9090:localhost:3000 user@server`,
          mac: `ssh-add --apple-use-keychain ~/.ssh/id_ed25519
ssh -L 8080:localhost:80 user@server`,
          windows: `Start-Service ssh-agent
ssh-add $env:USERPROFILE\\.ssh\\id_ed25519
ssh -L 8080:localhost:80 user@server`,
        },
      },
    ],
  },
};

export const dns: ToolGuide = {
  slug: "dns",
  name: "DNS Server (BIND)",
  category: "networking",
  description: "Configure BIND9 DNS server for internal and external name resolution",
  icon: "🌍",
  install: {
    id: "install",
    title: "Install BIND9",
    steps: [
      {
        title: "(01) Install BIND DNS server",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y bind9 bind9utils bind9-doc

# RHEL / Fedora
sudo dnf install -y bind bind-utils

sudo systemctl enable named
sudo systemctl start named`,
          mac: "# Use Docker: docker run -d -p 53:53/udp internetsystemsconsortium/bind9:9.18",
          windows: "# Install BIND via WSL or use Windows DNS Server role",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure DNS",
    steps: [
      {
        title: "(01) Forward zone (example.com)",
        commands: {
          linux: `sudo nano /etc/bind/named.conf.local

# Add zone block:
zone "example.com" {
    type master;
    file "/etc/bind/db.example.com";
};

# Create zone file:
sudo nano /etc/bind/db.example.com

# Example records:
# $TTL 86400
# @   IN SOA ns1.example.com. admin.example.com. (2024010101 3600 1800 604800 86400)
# @   IN NS  ns1.example.com.
# ns1 IN A   192.168.1.10
# www IN A   192.168.1.20

sudo named-checkconf
sudo named-checkzone example.com /etc/bind/db.example.com
sudo systemctl restart named`,
          mac: "# Configure via Docker BIND container volumes",
          windows: "# Configure in WSL BIND installation",
        },
      },
      {
        title: "(02) Reverse zone (PTR records)",
        commands: {
          linux: `zone "1.168.192.in-addr.arpa" {
    type master;
    file "/etc/bind/db.192";
};

# db.192:
# 10  IN PTR ns1.example.com.
# 20  IN PTR www.example.com.`,
          mac: "# Same pattern in Docker BIND",
          windows: "# WSL BIND configuration",
        },
      },
      {
        title: "(03) Configure client to use DNS server",
        commands: {
          linux: `# Ubuntu — Netplan or resolv.conf
echo "nameserver 192.168.1.10" | sudo tee /etc/resolv.conf

# Test
dig @192.168.1.10 www.example.com
nslookup www.example.com 192.168.1.10`,
          mac: "dig @192.168.1.10 www.example.com",
          windows: "nslookup www.example.com 192.168.1.10",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify DNS",
    steps: [
      {
        title: "(01) Query and check logs",
        commands: {
          linux: `dig @localhost example.com
dig @localhost www.example.com A
sudo journalctl -u named -f`,
          mac: "dig @localhost example.com",
          windows: "nslookup example.com localhost",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage DNS",
    steps: [
      {
        title: "(01) Add records and reload",
        commands: {
          linux: `# Increment serial number in SOA when editing zone
sudo rndc reload example.com
sudo rndc status

# Flush cache
sudo rndc flush`,
          mac: "docker exec bind rndc reload",
          windows: "# rndc reload in WSL",
        },
      },
    ],
  },
};

export const dhcp: ToolGuide = {
  slug: "dhcp",
  name: "DHCP Server",
  category: "networking",
  description: "Automatic IP address assignment for network clients",
  icon: "📡",
  install: {
    id: "install",
    title: "Install DHCP Server",
    steps: [
      {
        title: "(01) Install ISC DHCP or dnsmasq",
        commands: {
          linux: `# Option A — ISC DHCP (Ubuntu)
sudo apt-get install -y isc-dhcp-server

# Option B — dnsmasq (lightweight, DNS+DHCP)
sudo apt-get install -y dnsmasq

# RHEL / Fedora
sudo dnf install -y dhcp-server`,
          mac: "# macOS: use dnsmasq via brew\nbrew install dnsmasq",
          windows: `# Install DHCP Server role (Server Manager or PowerShell)
Install-WindowsFeature -Name DHCP -IncludeManagementTools`,
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure DHCP",
    steps: [
      {
        title: "(01) ISC DHCP server config",
        commands: {
          linux: `sudo nano /etc/dhcp/dhcpd.conf

# Example:
default-lease-time 600;
max-lease-time 7200;
authoritative;

subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.100 192.168.1.200;
  option routers 192.168.1.1;
  option domain-name-servers 192.168.1.10, 8.8.8.8;
  option domain-name "example.com";
}

# Set interface in /etc/default/isc-dhcp-server:
# INTERFACESv4="eth0"

sudo systemctl restart isc-dhcp-server`,
          mac: `# dnsmasq — /usr/local/etc/dnsmasq.conf
# dhcp-range=192.168.1.100,192.168.1.200,12h
# dhcp-option=3,192.168.1.1
brew services restart dnsmasq`,
          windows: `# Configure scope in DHCP Management Console
# Or: Add-DhcpServerv4Scope -Name "LAN" -StartRange 192.168.1.100 -EndRange 192.168.1.200 -SubnetMask 255.255.255.0`,
        },
      },
      {
        title: "(02) dnsmasq DHCP + DNS combo",
        commands: {
          linux: `sudo nano /etc/dnsmasq.conf

interface=eth0
dhcp-range=192.168.1.100,192.168.1.200,255.255.255.0,12h
dhcp-option=3,192.168.1.1
dhcp-option=6,192.168.1.10
domain=example.com

sudo systemctl restart dnsmasq`,
          mac: "brew services restart dnsmasq",
          windows: "# Use Windows DHCP role",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify DHCP",
    steps: [
      {
        title: "(01) Check leases",
        commands: {
          linux: `cat /var/lib/dhcp/dhcpd.leases
sudo journalctl -u isc-dhcp-server -f
# On client: sudo dhclient -v eth0`,
          mac: "cat /usr/local/var/lib/dnsmasq/dnsmasq.leases",
          windows: "Get-DhcpServerv4Lease -ScopeId 192.168.1.0",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage DHCP",
    steps: [
      {
        title: "(01) Static reservations",
        commands: {
          linux: `# In dhcpd.conf:
host webserver {
  hardware ethernet 00:11:22:33:44:55;
  fixed-address 192.168.1.50;
}

sudo systemctl restart isc-dhcp-server`,
          mac: "# dnsmasq: dhcp-host=00:11:22:33:44:55,192.168.1.50",
          windows: "Add-DhcpServerv4Reservation -ScopeId 192.168.1.0 -IPAddress 192.168.1.50 -ClientId <mac>",
        },
      },
    ],
  },
};

export const haproxy: ToolGuide = {
  slug: "haproxy",
  name: "HAProxy",
  category: "networking",
  description: "High availability load balancer and reverse proxy for TCP/HTTP traffic",
  icon: "⚖️",
  install: {
    id: "install",
    title: "Install HAProxy",
    steps: [
      {
        title: "(01) Install HAProxy",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get install -y haproxy

# RHEL / Fedora
sudo dnf install -y haproxy

sudo systemctl enable haproxy`,
          mac: "brew install haproxy",
          windows: "# Use WSL or Docker:\ndocker run -d -p 80:80 haproxy:2.9-alpine",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure HAProxy",
    steps: [
      {
        title: "(01) HTTP load balancing",
        commands: {
          linux: `sudo nano /etc/haproxy/haproxy.cfg

# global / defaults sections first, then:

frontend http_front
    bind *:80
    default_backend http_back

backend http_back
    balance roundrobin
    server web1 192.168.1.21:80 check
    server web2 192.168.1.22:80 check

# Stats page (optional):
listen stats
    bind *:8404
    stats enable
    stats uri /stats
    stats refresh 10s

sudo haproxy -c -f /etc/haproxy/haproxy.cfg
sudo systemctl restart haproxy`,
          mac: "# Edit /usr/local/etc/haproxy/haproxy.cfg\nbrew services restart haproxy",
          windows: "# Configure in Docker or WSL",
        },
      },
      {
        title: "(02) HTTPS / SSL termination",
        commands: {
          linux: `frontend https_front
    bind *:443 ssl crt /etc/haproxy/certs/example.com.pem
    default_backend http_back

# Combine cert + key:
# cat cert.pem key.pem > example.com.pem`,
          mac: "# Same haproxy.cfg SSL frontend block",
          windows: "# WSL HAProxy SSL config",
        },
      },
      {
        title: "(03) TCP (Layer 4) load balancing",
        commands: {
          linux: `frontend mysql_front
    bind *:3306
    mode tcp
    default_backend mysql_back

backend mysql_back
    mode tcp
    balance leastconn
    server db1 192.168.1.31:3306 check
    server db2 192.168.1.32:3306 check`,
          mac: "# TCP mode in haproxy.cfg",
          windows: "# TCP mode in haproxy.cfg",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify HAProxy",
    steps: [
      {
        title: "(01) Check status",
        commands: {
          linux: `sudo systemctl status haproxy\ncurl http://localhost/stats\nsudo ss -tlnp | grep haproxy`,
          mac: "curl http://localhost:8404/stats",
          windows: "curl http://localhost/stats",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage HAProxy",
    steps: [
      {
        title: "(01) Reload without downtime",
        commands: {
          linux: `sudo haproxy -c -f /etc/haproxy/haproxy.cfg
sudo systemctl reload haproxy
echo "show stat" | sudo socat stdio /run/haproxy/admin.sock`,
          mac: "brew services restart haproxy",
          windows: "docker restart haproxy",
        },
      },
    ],
  },
};

export const ftp: ToolGuide = {
  slug: "ftp",
  name: "FTP Server (vsftpd)",
  category: "networking",
  description: "File transfer protocol server for uploading and downloading files",
  icon: "📁",
  install: {
    id: "install",
    title: "Install FTP Server",
    steps: [
      {
        title: "(01) Install vsftpd",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get install -y vsftpd

# RHEL / Fedora
sudo dnf install -y vsftpd

sudo systemctl enable vsftpd
sudo systemctl start vsftpd`,
          mac: "# Use SFTP (SSH) instead — built into macOS Remote Login",
          windows: `# Enable IIS FTP or use FileZilla Server
# Or OpenSSH SFTP (recommended over plain FTP)`,
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure FTP",
    steps: [
      {
        title: "(01) Basic vsftpd configuration",
        commands: {
          linux: `sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.bak
sudo nano /etc/vsftpd.conf

# Key settings:
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
chroot_local_user=YES
allow_writeable_chroot=YES
pasv_enable=YES
pasv_min_port=40000
pasv_max_port=40100

sudo systemctl restart vsftpd
sudo ufw allow 20,21/tcp
sudo ufw allow 40000:40100/tcp`,
          mac: "# Use SFTP: sftp user@host",
          windows: "# Configure IIS FTP site or FileZilla Server",
        },
      },
      {
        title: "(02) FTP over SSL/TLS (FTPS)",
        commands: {
          linux: `# In vsftpd.conf:
ssl_enable=YES
rsa_cert_file=/etc/ssl/certs/vsftpd.pem
rsa_private_key_file=/etc/ssl/private/vsftpd.key
force_local_data_ssl=YES
force_local_logins_ssl=YES

sudo systemctl restart vsftpd`,
          mac: "# SFTP over SSH is encrypted by default",
          windows: "# Enable FTPS in IIS or FileZilla Server",
        },
      },
      {
        title: "(03) Create FTP user",
        commands: {
          linux: `sudo useradd -m ftpuser
sudo passwd ftpuser
sudo usermod -d /home/ftpuser ftpuser

# Connect:
ftp ftpuser@server-ip
# Or: lftp ftpuser@server-ip`,
          mac: "sftp ftpuser@server-ip",
          windows: "ftp server-ip",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify FTP",
    steps: [
      {
        title: "(01) Test connection",
        commands: {
          linux: `sudo systemctl status vsftpd\nftp localhost\n# Or: curl ftp://ftpuser:pass@localhost/`,
          mac: "sftp user@localhost",
          windows: "ftp localhost",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage FTP",
    steps: [
      {
        title: "(01) User management and logs",
        commands: {
          linux: `sudo tail -f /var/log/vsftpd.log
sudo userdel -r ftpuser
sudo systemctl restart vsftpd`,
          mac: "# Manage via SSH/SFTP",
          windows: "# Check FTP logs in IIS or FileZilla",
        },
      },
    ],
  },
};
