import type { ToolGuide } from "../types";

export const awsCli: ToolGuide = {
  slug: "aws-cli",
  name: "AWS CLI",
  category: "cloud",
  description: "Command-line interface for Amazon Web Services",
  icon: "☁️",
  install: {
    id: "install",
    title: "Install AWS CLI",
    steps: [
      {
        title: "(01) Install AWS CLI v2",
        commands: {
          linux: `# Linux x86_64
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
rm -rf aws awscliv2.zip

# Or via package manager (Ubuntu)
sudo snap install aws-cli --classic`,
          mac: `# Official installer
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Or Homebrew
brew install awscli`,
          windows: `# MSI installer
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Or winget
winget install Amazon.AWSCLI`,
        },
      },
      {
        title: "(02) Configure Credentials",
        commands: {
          linux: `aws configure
# AWS Access Key ID: YOUR_KEY
# AWS Secret Access Key: YOUR_SECRET
# Default region: us-east-1
# Default output format: json`,
          mac: `aws configure`,
          windows: `aws configure`,
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Installation",
    steps: [
      {
        title: "(01) Check Version & Identity",
        commands: {
          linux: "aws --version\naws sts get-caller-identity",
          mac: "aws --version\naws sts get-caller-identity",
          windows: "aws --version\naws sts get-caller-identity",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage AWS CLI",
    steps: [
      {
        title: "(01) EC2 Operations",
        commands: {
          linux: `aws ec2 describe-instances
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 stop-instances --instance-ids i-1234567890abcdef0`,
          mac: `aws ec2 describe-instances
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 stop-instances --instance-ids i-1234567890abcdef0`,
          windows: `aws ec2 describe-instances
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 stop-instances --instance-ids i-1234567890abcdef0`,
        },
      },
      {
        title: "(02) S3 Operations",
        commands: {
          linux: `aws s3 ls
aws s3 mb s3://my-bucket-name
aws s3 cp file.txt s3://my-bucket-name/
aws s3 sync ./local-dir s3://my-bucket-name/`,
          mac: `aws s3 ls
aws s3 mb s3://my-bucket-name
aws s3 cp file.txt s3://my-bucket-name/
aws s3 sync ./local-dir s3://my-bucket-name/`,
          windows: `aws s3 ls
aws s3 mb s3://my-bucket-name
aws s3 cp file.txt s3://my-bucket-name/
aws s3 sync .\\local-dir s3://my-bucket-name/`,
        },
      },
      {
        title: "(03) Profile Management",
        commands: {
          linux: `aws configure --profile production
aws s3 ls --profile production
export AWS_PROFILE=production`,
          mac: `aws configure --profile production
aws s3 ls --profile production
export AWS_PROFILE=production`,
          windows: `aws configure --profile production
aws s3 ls --profile production
$env:AWS_PROFILE="production"`,
        },
      },
    ],
  },
};
