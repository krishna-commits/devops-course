import type { ToolGuide } from "../types";

export const kvm: ToolGuide = {
  slug: "kvm",
  name: "KVM Virtualization",
  category: "virtualization",
  description: "Kernel-based virtual machine hypervisor for Linux",
  icon: "🖥️",
  install: {
    id: "install",
    title: "Install KVM",
    steps: [
      {
        title: "(01) Install KVM and tools",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager

# RHEL / Fedora
sudo dnf install -y @virtualization
sudo systemctl enable --now libvirtd

# Add user to libvirt group
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER`,
          mac: "# Use UTM, Parallels, or VMware — KVM is Linux-only",
          windows: "# Use Hyper-V:\nEnable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All",
        },
      },
      {
        title: "(02) Verify CPU virtualization support",
        commands: {
          linux: `egrep -c '(vmx|svm)' /proc/cpuinfo   # should be > 0
kvm-ok                                    # Ubuntu
lsmod | grep kvm
virsh list --all`,
          mac: "# Not applicable — use UTM for VM on Mac",
          windows: "systeminfo | findstr /i hyper",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure KVM",
    steps: [
      {
        title: "(01) Create bridge network",
        commands: {
          linux: `sudo nano /etc/netplan/01-bridge.yaml

# network:
#   version: 2
#   ethernets:
#     enp0s3:
#       dhcp4: no
#   bridges:
#     br0:
#       interfaces: [enp0s3]
#       dhcp4: yes

sudo netplan apply
ip addr show br0`,
          mac: "# Bridge networking via UTM settings",
          windows: "# Configure Hyper-V virtual switch",
        },
      },
      {
        title: "(02) Create VM with virt-install",
        commands: {
          linux: `# Download ISO first, then:
sudo virt-install \\
  --name ubuntu-vm \\
  --ram 2048 \\
  --disk path=/var/lib/libvirt/images/ubuntu.qcow2,size=20 \\
  --vcpus 2 \\
  --os-variant ubuntu22.04 \\
  --network bridge=br0 \\
  --graphics vnc,listen=0.0.0.0 \\
  --cdrom /path/to/ubuntu-22.04.iso

# Or use GUI:
virt-manager`,
          mac: "# Use UTM: File → New → Virtualize",
          windows: `# Hyper-V — New Virtual Machine wizard
New-VM -Name "Ubuntu" -MemoryStartupBytes 2GB -NewVHDPath C:\\VMs\\ubuntu.vhdx -NewVHDSizeBytes 20GB`,
        },
      },
      {
        title: "(03) Manage VMs with virsh",
        commands: {
          linux: `virsh list --all
virsh start ubuntu-vm
virsh shutdown ubuntu-vm
virsh destroy ubuntu-vm      # force stop
virsh console ubuntu-vm
virsh dumpxml ubuntu-vm > vm-backup.xml`,
          mac: "# UTM CLI or GUI management",
          windows: "Get-VM\nStart-VM -Name Ubuntu\nStop-VM -Name Ubuntu",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify KVM",
    steps: [
      {
        title: "(01) Check libvirt",
        commands: {
          linux: "sudo systemctl status libvirtd\nvirsh net-list --all\nvirsh pool-list --all",
          mac: "N/A",
          windows: "Get-VMHost",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage KVM",
    steps: [
      {
        title: "(01) Snapshots and cloning",
        commands: {
          linux: `# Snapshot
virsh snapshot-create-as ubuntu-vm snap1 "before upgrade"

# Clone
virt-clone --original ubuntu-vm --name ubuntu-vm-clone --auto-clone

# Export/import
virsh dumpxml ubuntu-vm > ubuntu-vm.xml
virsh define ubuntu-vm.xml`,
          mac: "# UTM snapshot feature",
          windows: "Checkpoint-VM -Name Ubuntu -SnapshotName BeforeUpdate",
        },
      },
    ],
  },
};

export const cloudCompute: ToolGuide = {
  slug: "cloud-compute",
  name: "Cloud Compute (OpenStack)",
  category: "virtualization",
  description: "Open-source cloud platform for VMs, networking, and storage",
  icon: "☁️",
  install: {
    id: "install",
    title: "Install OpenStack (DevStack)",
    steps: [
      {
        title: "(01) DevStack — all-in-one lab install",
        description: "DevStack is the fastest way to get OpenStack running for learning.",
        commands: {
          linux: `# Requirements: Ubuntu 22.04, 16GB+ RAM, 100GB disk
sudo useradd -s /bin/bash -d /opt/stack -m stack
echo "stack ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/stack

sudo -u stack git clone https://opendev.org/openstack/devstack /opt/stack/devstack
sudo -u stack cp /opt/stack/devstack/samples/local.conf /opt/stack/devstack/local.conf

# Edit local.conf — set ADMIN_PASSWORD, DATABASE_PASSWORD, etc.
cd /opt/stack/devstack && sudo -u stack ./stack.sh`,
          mac: "# Run DevStack in a Linux VM (Multipass/UTM)",
          windows: "# Run DevStack in WSL2 or Linux VM",
        },
      },
      {
        title: "(02) Install OpenStack CLI client",
        commands: {
          linux: `pip install python-openstackclient
openstack --version

# Source credentials after DevStack:
source /opt/stack/devstack/openrc`,
          mac: "pip install python-openstackclient",
          windows: "pip install python-openstackclient",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure OpenStack",
    steps: [
      {
        title: "(01) Create network and instance",
        commands: {
          linux: `# Source admin credentials
source /opt/stack/devstack/openrc

# Create network
openstack network create private-net
openstack subnet create --network private-net --subnet-range 10.0.0.0/24 private-subnet

# Create router (if needed)
openstack router create router1
openstack router add subnet router1 private-subnet

# Upload image
openstack image create "Ubuntu-22.04" --file jammy-server-cloudimg-amd64.img --disk-format qcow2

# Create flavor and keypair
openstack flavor create --ram 2048 --disk 10 --vcpus 2 m1.small
openstack keypair create --public-key ~/.ssh/id_ed25519.pub mykey

# Launch instance
openstack server create --flavor m1.small --image Ubuntu-22.04 --network private-net --key-name mykey my-instance`,
          mac: "# Same openstack CLI commands in Linux VM",
          windows: "# Same openstack CLI in WSL",
        },
      },
      {
        title: "(02) Horizon web dashboard",
        commands: {
          linux: `# After DevStack install, access Horizon:
# http://<server-ip>/dashboard
# Login: admin / ADMIN_PASSWORD from local.conf

openstack server list
openstack console log show my-instance`,
          mac: "# Access Horizon in browser",
          windows: "# Access Horizon in browser",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify OpenStack",
    steps: [
      {
        title: "(01) Check services",
        commands: {
          linux: `openstack service list
openstack endpoint list
openstack compute service list
openstack network agent list`,
          mac: "openstack service list",
          windows: "openstack service list",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Cloud Compute",
    steps: [
      {
        title: "(01) Instance lifecycle",
        commands: {
          linux: `openstack server list
openstack server stop my-instance
openstack server start my-instance
openstack server delete my-instance

# Floating IP
openstack floating ip create public
openstack server add floating ip my-instance <floating-ip>`,
          mac: "# Same openstack commands",
          windows: "# Same openstack commands",
        },
      },
    ],
  },
};
