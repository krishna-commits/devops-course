import type { ToolGuide } from "../types";

export const nfs: ToolGuide = {
  slug: "nfs",
  name: "NFS Server",
  category: "storage",
  description: "Network File System for shared storage across Linux servers",
  icon: "💾",
  install: {
    id: "install",
    title: "Install NFS",
    steps: [
      {
        title: "(01) Install NFS server packages",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y nfs-kernel-server

# RHEL / CentOS / Fedora
sudo dnf install -y nfs-utils
sudo systemctl enable --now nfs-server`,
          mac: `# macOS NFS server (enable in System Settings or):
sudo nfsd enable
sudo nfsd checkexports`,
          windows: `# Enable NFS client (optional server via WSL)
Enable-WindowsOptionalFeature -Online -FeatureName ServicesForNFS-ClientOnly`,
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure NFS",
    steps: [
      {
        title: "(01) Export shared directory (server)",
        commands: {
          linux: `# Create shared directory
sudo mkdir -p /srv/nfs/share
sudo chown nobody:nogroup /srv/nfs/share
sudo chmod 777 /srv/nfs/share

# Configure exports
sudo nano /etc/exports

# Add line (adjust network):
/srv/nfs/share 192.168.1.0/24(rw,sync,no_subtree_check,no_root_squash)

# Apply exports
sudo exportfs -ra
sudo exportfs -v
sudo systemctl restart nfs-kernel-server`,
          mac: `sudo mkdir -p /Users/Shared/nfs
sudo nano /etc/exports
# /Users/Shared/nfs -network 192.168.1.0 -mask 255.255.255.0 -alldirs -mapall=501:20
sudo nfsd update`,
          windows: "# Configure NFS exports in WSL Linux",
        },
      },
      {
        title: "(02) Mount NFS on client",
        commands: {
          linux: `# Install client
sudo apt-get install -y nfs-common

# Create mount point
sudo mkdir -p /mnt/nfs-share

# Mount
sudo mount -t nfs 192.168.1.10:/srv/nfs/share /mnt/nfs-share

# Persistent mount in /etc/fstab:
# 192.168.1.10:/srv/nfs/share /mnt/nfs-share nfs defaults 0 0

df -h | grep nfs`,
          mac: `sudo mkdir -p /mnt/nfs-share
sudo mount -t nfs 192.168.1.10:/srv/nfs/share /mnt/nfs-share
df -h | grep nfs`,
          windows: `# Mount NFS share
mount -o anon \\\\192.168.1.10\\srv\\nfs\\share Z:`,
        },
      },
      {
        title: "(03) NFSv4 with fsid (recommended)",
        commands: {
          linux: `# /etc/exports for NFSv4:
/srv/nfs *(rw,fsid=0,sync,no_subtree_check)

# Client mount:
sudo mount -t nfs4 192.168.1.10:/ /mnt/nfs-share`,
          mac: "sudo mount -t nfs4 server:/ /mnt/nfs-share",
          windows: "# NFSv4 mount via Services for NFS client",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify NFS",
    steps: [
      {
        title: "(01) Test read/write",
        commands: {
          linux: `# On server
showmount -e localhost

# On client
echo "test" | sudo tee /mnt/nfs-share/test.txt
cat /mnt/nfs-share/test.txt
sudo nfsstat`,
          mac: "showmount -e localhost\ncat /mnt/nfs-share/test.txt",
          windows: "dir Z:\\",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage NFS",
    steps: [
      {
        title: "(01) Export management and firewall",
        commands: {
          linux: `sudo exportfs -v
sudo exportfs -ua          # unexport all
sudo exportfs -ra          # re-export

# Firewall (NFS uses 2049)
sudo ufw allow from 192.168.1.0/24 to any port nfs
sudo rpcinfo -p | grep nfs`,
          mac: "sudo nfsd restart",
          windows: "Get-NfsMappedIdentity",
        },
      },
      {
        title: "(02) Kubernetes NFS provisioner",
        commands: {
          linux: `# Install nfs-utils on all K8 nodes
# Create PV manually:
kubectl apply -f - <<EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: 10Gi
  accessModes: [ReadWriteMany]
  nfs:
    server: 192.168.1.10
    path: /srv/nfs/share
EOF`,
          mac: "# Same kubectl PV manifest",
          windows: "# Same kubectl PV manifest",
        },
      },
    ],
  },
};
