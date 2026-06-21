import { guide } from "./guide-utils";

export const php = guide(
  "php", "PHP", "build", "Server-side language for WordPress, Laravel, and web apps", "🐘",
  {
    linux: "sudo apt-get install -y php php-cli php-fpm php-mysql php-curl php-xml php-mbstring\nsudo systemctl enable php8.3-fpm",
    mac: "brew install php",
    windows: "winget install PHP.PHP.8.3",
  },
  {
    configure: { linux: "php -v\nsudo nano /etc/php/8.3/fpm/php.ini\n# Set memory_limit, upload_max_filesize\nsudo systemctl restart php8.3-fpm" },
    verify: { linux: "php -v\nphp -m | grep -E 'curl|mysql|mbstring'", mac: "php -v", windows: "php -v" },
    manage: { linux: "composer --version\ncomposer create-project laravel/laravel myapp", mac: "composer create-project laravel/laravel myapp", windows: "composer --version" },
  }
);

export const openvpn = guide(
  "openvpn", "OpenVPN", "networking", "Classic VPN server for secure remote network access", "🔐",
  {
    linux: "sudo apt-get install -y openvpn easy-rsa\nsudo mkdir -p /etc/openvpn/server",
    mac: "brew install openvpn",
    windows: "# Use OpenVPN Connect client; server on Linux/WSL",
  },
  {
    configure: {
      linux: `# Easy-RSA PKI (Debian/Ubuntu)
make-cadir ~/openvpn-ca && cd ~/openvpn-ca
./easyrsa init-pki
./easyrsa build-ca nopass
./easyrsa gen-dh
./easyrsa build-server-full server nopass
./easyrsa gen-crl

sudo cp pki/ca.crt pki/issued/server.crt pki/private/server.key pki/dh.pem /etc/openvpn/server/
sudo systemctl enable openvpn-server@server
sudo systemctl start openvpn-server@server`,
      mac: "# OpenVPN server typically on Linux; Mac uses client",
      windows: "# Install OpenVPN Connect from openvpn.net",
    },
    verify: { linux: "sudo systemctl status openvpn-server@server\nsudo ss -tulpn | grep 1194", mac: "openvpn --version", windows: "openvpn --version" },
  }
);

export const velero = guide(
  "velero", "Velero", "container", "Backup and restore Kubernetes clusters and persistent volumes", "💾",
  {
    linux: `# Install Velero CLI
wget https://github.com/vmware-tanzu/velero/releases/download/v1.14.0/velero-v1.14.0-linux-amd64.tar.gz
tar xf velero-v1.14.0-linux-amd64.tar.gz
sudo mv velero-v1.14.0-linux-amd64/velero /usr/local/bin/`,
    mac: "brew install velero",
    windows: "choco install velero",
  },
  {
    configure: {
      linux: `# Install Velero in cluster (Minikube example — use your bucket provider)
velero install \\
  --provider aws \\
  --plugins velero/velero-plugin-for-aws:v1.10.0 \\
  --bucket my-backup-bucket \\
  --secret-file ./credentials-velero \\
  --use-volume-snapshots=false

velero backup create first-backup --include-namespaces default`,
      mac: "velero version",
      windows: "velero version",
    },
    verify: { linux: "velero backup get\nvelero schedule get", mac: "velero backup get", windows: "velero backup get" },
    manage: { linux: "velero restore create --from-backup first-backup\nvelero backup delete first-backup", mac: "velero restore get", windows: "velero restore get" },
  }
);

export const johnbedeirGuides = [php, openvpn, velero];
