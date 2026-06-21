import type { ToolGuide } from "../types";

export const jenkins: ToolGuide = {
  slug: "jenkins",
  name: "Jenkins",
  category: "cicd",
  description: "Open-source automation server for CI/CD pipelines",
  icon: "🔧",
  install: {
    id: "install",
    title: "Install Jenkins",
    steps: [
      {
        title: "(01) Install Java (required)",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y openjdk-21-jdk

# RHEL / Fedora
sudo dnf install -y java-21-openjdk`,
          mac: "brew install openjdk@21",
          windows: "winget install Microsoft.OpenJDK.21",
        },
      },
      {
        title: "(02) Install Jenkins",
        commands: {
          linux: `# Ubuntu / Debian
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install -y jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins`,
          mac: `brew install jenkins-lts
brew services start jenkins-lts`,
          windows: `# Download MSI installer from:
# https://www.jenkins.io/download/

# Or via Chocolatey
choco install jenkins -y`,
        },
      },
      {
        title: "(03) Get Initial Admin Password",
        commands: {
          linux: "sudo cat /var/lib/jenkins/secrets/initialAdminPassword",
          mac: "cat ~/.jenkins/secrets/initialAdminPassword",
          windows: "# Found in: C:\\Program Files\\Jenkins\\secrets\\initialAdminPassword",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Pipeline as Code",
    steps: [
      {
        title: "(01) Add Jenkinsfile to repo root",
        description: "For Pipeline jobs, place Jenkinsfile in the repository root. Jenkins checks out the repo and runs the file.",
        commands: {
          linux: `cat > Jenkinsfile << 'EOF'
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm ci && npm test'
      }
    }
  }
}
EOF
git add Jenkinsfile && git commit -m "Add Jenkins pipeline" && git push`,
          mac: "# Create Jenkinsfile in repository root",
          windows: "# Create Jenkinsfile in repository root",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Installation",
    steps: [
      {
        title: "(01) Access Jenkins UI",
        commands: {
          linux: "# Open http://localhost:8080 in your browser",
          mac: "open http://localhost:8080",
          windows: "Start-Process http://localhost:8080",
        },
      },
      {
        title: "(02) Check Service Status",
        commands: {
          linux: "sudo systemctl status jenkins",
          mac: "brew services list | grep jenkins",
          windows: "Get-Service Jenkins",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Jenkins",
    steps: [
      {
        title: "(01) Service Control",
        commands: {
          linux: `sudo systemctl start jenkins
sudo systemctl stop jenkins
sudo systemctl restart jenkins
sudo systemctl status jenkins`,
          mac: `brew services start jenkins-lts
brew services stop jenkins-lts
brew services restart jenkins-lts`,
          windows: `Start-Service Jenkins
Stop-Service Jenkins
Restart-Service Jenkins
Get-Service Jenkins`,
        },
      },
      {
        title: "(02) View Logs",
        commands: {
          linux: "sudo journalctl -u jenkins -f",
          mac: "tail -f /usr/local/var/log/jenkins/jenkins.log",
          windows: "Get-Content 'C:\\Program Files\\Jenkins\\jenkins.out.log' -Wait",
        },
      },
      {
        title: "(03) CLI Operations",
        commands: {
          linux: `# Download CLI jar from Jenkins UI, then:
java -jar jenkins-cli.jar -s http://localhost:8080/ help
java -jar jenkins-cli.jar -s http://localhost:8080/ list-jobs`,
          mac: `java -jar jenkins-cli.jar -s http://localhost:8080/ help
java -jar jenkins-cli.jar -s http://localhost:8080/ list-jobs`,
          windows: `java -jar jenkins-cli.jar -s http://localhost:8080/ help
java -jar jenkins-cli.jar -s http://localhost:8080/ list-jobs`,
        },
      },
    ],
  },
};
