import { guide } from "./guide-utils";
import type { ToolGuide } from "../types";

export const gcloud = guide(
  "gcloud", "Google Cloud CLI", "cloud", "Manage Google Cloud Platform from your terminal", "☁️",
  {
    linux: `# Debian/Ubuntu
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list
sudo apt-get update && sudo apt-get install -y google-cloud-cli`,
    mac: "brew install --cask google-cloud-sdk\ngcloud init",
    windows: "winget install Google.CloudSDK",
  },
  {
    configure: { linux: "gcloud init\ngcloud auth login\ngcloud config set project YOUR_PROJECT_ID", mac: "gcloud init", windows: "gcloud init" },
    verify: { linux: "gcloud --version\ngcloud projects list", mac: "gcloud projects list", windows: "gcloud projects list" },
  }
);

export const githubCli = guide(
  "github-cli", "GitHub CLI (gh)", "cloud", "Manage GitHub repos, PRs, and Actions from the terminal", "🐙",
  {
    linux: `(type -p wget >/dev/null || sudo apt-get install wget) \\
&& sudo mkdir -p -m 755 /etc/apt/keyrings \\
&& wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \\
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list \\
&& sudo apt-get update && sudo apt-get install -y gh`,
    mac: "brew install gh",
    windows: "winget install GitHub.cli",
  },
  {
    configure: { linux: "gh auth login\ngh repo clone owner/repo", mac: "gh auth login", windows: "gh auth login" },
    verify: { linux: "gh --version\ngh auth status", mac: "gh auth status", windows: "gh auth status" },
  }
);

export const doctl = guide(
  "doctl", "DigitalOcean CLI", "cloud", "Manage DigitalOcean droplets, K8s, and DNS from terminal", "🌊",
  {
    linux: `cd ~ && wget https://github.com/digitalocean/doctl/releases/download/v1.104.0/doctl-1.104.0-linux-amd64.tar.gz
tar xf doctl-1.104.0-linux-amd64.tar.gz && sudo mv doctl /usr/local/bin/`,
    mac: "brew install doctl",
    windows: "choco install doctl",
  },
  {
    configure: { linux: "doctl auth init\n# Paste API token from cloud.digitalocean.com/account/api/tokens", mac: "doctl auth init", windows: "doctl auth init" },
    verify: { linux: "doctl account get\ndoctl compute droplet list", mac: "doctl account get", windows: "doctl account get" },
  }
);

// ── IaC extensions ───────────────────────────────────────────

export const terragrunt = guide(
  "terragrunt", "Terragrunt", "iac", "DRY wrapper for Terraform — manage many environments cleanly", "🏔️",
  {
    linux: `wget https://github.com/gruntwork-io/terragrunt/releases/download/v0.67.0/terragrunt_linux_amd64
chmod +x terragrunt_linux_amd64 && sudo mv terragrunt_linux_amd64 /usr/local/bin/terragrunt`,
    mac: "brew install terragrunt",
    windows: "choco install terragrunt",
  },
  {
    configure: { linux: "# terragrunt.hcl in each module folder\nterragrunt init\nterragrunt plan\nterragrunt apply" },
    verify: { linux: "terragrunt --version", mac: "terragrunt --version", windows: "terragrunt --version" },
  }
);

export const kustomize = guide(
  "kustomize", "Kustomize", "container", "Customize Kubernetes YAML without templates or Helm", "🎨",
  {
    linux: `curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash
sudo mv kustomize /usr/local/bin/`,
    mac: "brew install kustomize",
    windows: "choco install kubernetes-cli # includes kustomize",
  },
  {
    configure: { linux: "kubectl kustomize overlays/prod\nkubectl apply -k overlays/prod" },
    verify: { linux: "kustomize version\nkubectl kustomize .", mac: "kustomize version", windows: "kustomize version" },
  }
);

export const vagrant = guide(
  "vagrant", "Vagrant", "virtualization", "Create and manage portable development VMs", "📦",
  {
    linux: "sudo apt-get install -y vagrant\n# Requires VirtualBox or libvirt provider",
    mac: "brew install --cask vagrant",
    windows: "choco install vagrant",
  },
  {
    configure: { linux: "vagrant init ubuntu/jammy64\nvagrant up\nvagrant ssh", mac: "vagrant init ubuntu/jammy64 && vagrant up", windows: "vagrant init ubuntu/jammy64" },
    verify: { linux: "vagrant status", mac: "vagrant status", windows: "vagrant status" },
  }
);

export const direnv = guide(
  "direnv", "direnv", "build", "Auto-load project env vars when you cd into a folder", "📂",
  {
    linux: "sudo apt-get install -y direnv\necho 'eval \"$(direnv hook bash)\"' >> ~/.bashrc",
    mac: "brew install direnv\necho 'eval \"$(direnv hook zsh)\"' >> ~/.zshrc",
    windows: "# Use WSL:\nsudo apt-get install direnv",
  },
  {
    configure: { linux: "echo 'export API_KEY=dev' > .envrc\ndirenv allow", mac: "echo 'export API_KEY=dev' > .envrc && direnv allow", windows: "direnv allow" },
    verify: { linux: "direnv version", mac: "direnv version", windows: "direnv version" },
  }
);

// ── CI/CD platforms (HariSekhon cicd/ configs) ───────────────

export const circleci = guide(
  "circleci", "CircleCI", "cicd", "Cloud CI/CD with fast parallel builds", "⭕",
  {
    linux: `curl -fLSs https://raw.githubusercontent.com/CircleCI-Public/circleci-cli/main/install.sh | bash
sudo mv ~/bin/circleci /usr/local/bin/ 2>/dev/null || true`,
    mac: "brew install circleci",
    windows: "choco install circleci-cli",
  },
  {
    configure: {
      linux: `mkdir -p .circleci
cat > .circleci/config.yml << 'EOF'
version: 2.1
jobs:
  build:
    docker:
      - image: cimg/node:20.0
    steps:
      - checkout
      - run: npm ci && npm test
EOF
git add .circleci/config.yml && git commit -m "Add CircleCI" && git push`,
      mac: "# Create .circleci/config.yml in your repository",
      windows: "# Create .circleci/config.yml in your repository",
    },
    configureStep: {
      title: "(01) Add .circleci/config.yml",
      description: "Place config.yml inside .circleci/ at the repository root.",
    },
    verify: { linux: "circleci version\ncircleci config validate", mac: "circleci config validate", windows: "circleci version" },
  }
);

export const droneCi = guide(
  "drone-ci", "Drone CI", "cicd", "Container-native CI/CD — pipelines run in Docker", "🚁",
  {
    linux: `docker run -d --name drone -p 80:80 -p 443:443 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -e DRONE_GITHUB_CLIENT_ID=your_id \\
  -e DRONE_GITHUB_CLIENT_SECRET=your_secret \\
  -e DRONE_RPC_SECRET=your_rpc_secret \\
  -e DRONE_SERVER_HOST=drone.example.com \\
  -e DRONE_SERVER_PROTO=https \\
  drone/drone:2`,
    mac: "# Same Docker run on Mac",
    windows: "docker run -d -p 80:80 drone/drone:2",
  },
  {
    configure: {
      linux: `cat > .drone.yml << 'EOF'
kind: pipeline
type: docker
name: default
steps:
  - name: test
    image: node:20
    commands:
      - npm ci
      - npm test
EOF
git add .drone.yml && git commit -m "Add Drone CI" && git push`,
      mac: "# Create .drone.yml in repository root",
      windows: "# Create .drone.yml in repository root",
    },
    configureStep: {
      title: "(01) Add .drone.yml to repo root",
      description: "Drone reads .drone.yml from the repository root on each push.",
    },
    verify: { linux: "docker ps | grep drone", mac: "docker ps | grep drone", windows: "docker ps" },
  }
);

export const buildkite = guide(
  "buildkite", "Buildkite", "cicd", "Self-hosted agents with cloud pipeline orchestration", "🐝",
  {
    linux: `# Install agent
curl -fsSL https://apt.buildkite.com/buildkite-agent.gpg.key | sudo apt-key add -
echo "deb https://apt.buildkite.com/buildkite-agent stable main" | sudo tee /etc/apt/sources.list.d/buildkite-agent.list
sudo apt-get update && sudo apt-get install -y buildkite-agent`,
    mac: "brew tap buildkite/buildkite && brew install buildkite-agent",
    windows: "choco install buildkite-agent",
  },
  {
    configure: {
      linux: `mkdir -p .buildkite
cat > .buildkite/pipeline.yml << 'EOF'
steps:
  - label: ":nodejs: Test"
    command: npm ci && npm test
EOF
git add .buildkite/pipeline.yml && git commit -m "Add Buildkite pipeline" && git push`,
      mac: "# Create .buildkite/pipeline.yml in repository",
      windows: "# Create .buildkite/pipeline.yml in repository",
    },
    configureStep: {
      title: "(01) Add .buildkite/pipeline.yml",
      description: "Default path is .buildkite/pipeline.yml — or set a custom path in the Buildkite UI.",
    },
    verify: { linux: "buildkite-agent --version", mac: "buildkite-agent --version", windows: "buildkite-agent --version" },
  }
);

export const teamcity = guide(
  "teamcity", "TeamCity", "cicd", "JetBrains CI/CD server with powerful build chains", "🏗️",
  {
    linux: "docker run -d --name teamcity-server -p 8111:8111 jetbrains/teamcity-server",
    mac: "docker run -d -p 8111:8111 jetbrains/teamcity-server",
    windows: "docker run -d -p 8111:8111 jetbrains/teamcity-server",
  },
  {
    configure: { linux: "# Open http://localhost:8111 — setup wizard\n# Install agent on build nodes" },
    verify: { linux: "curl -I http://localhost:8111", mac: "open http://localhost:8111", windows: "curl http://localhost:8111" },
  }
);

export const travisCi = guide(
  "travis-ci", "Travis CI", "cicd", "Classic GitHub-integrated CI — .travis.yml in your repo", "🔷",
  {
    linux: `gem install travis\n# Or:
sudo apt-get install -y ruby-dev && gem install travis`,
    mac: "brew install ruby && gem install travis",
    windows: "gem install travis",
  },
  {
    configure: {
      linux: `cat > .travis.yml << 'EOF'
language: node_js
node_js: "20"
script: npm test
EOF
travis login --github-token YOUR_TOKEN
git add .travis.yml && git commit -m "Add Travis CI" && git push`,
      mac: "# Add .travis.yml to repository root and enable at travis-ci.com",
      windows: "# Add .travis.yml to repository root and enable at travis-ci.com",
    },
    configureStep: {
      title: "(01) Add .travis.yml to repo root",
      description: "Travis CI reads .travis.yml from the repository root.",
    },
    verify: { linux: "travis --version", mac: "travis --version", windows: "travis --version" },
  }
);

export const azureDevOps = guide(
  "azure-devops", "Azure DevOps Pipelines", "cicd", "Microsoft CI/CD for Azure and multi-cloud deploys", "🔷",
  {
    linux: `# Install Azure DevOps CLI extension
az extension add --name azure-devops\naz devops configure --defaults organization=https://dev.azure.com/YOUR_ORG project=YOUR_PROJECT`,
    mac: "brew install azure-cli && az extension add --name azure-devops",
    windows: "az extension add --name azure-devops",
  },
  {
    configure: {
      linux: `# From repo root — same level as README:
cat > azure-pipelines.yml << 'EOF'
trigger:
  - main
pool:
  vmImage: ubuntu-latest
steps:
  - task: NodeTool@0
    inputs:
      versionSpec: "20.x"
  - script: npm ci && npm test
    displayName: npm install and test
EOF
git add azure-pipelines.yml && git commit -m "Add Azure Pipeline" && git push`,
      mac: "# Create azure-pipelines.yml in repository root",
      windows: "# Create azure-pipelines.yml in repository root",
    },
    configureStep: {
      title: "(01) Add azure-pipelines.yml to repo root",
      description: "Azure DevOps reads azure-pipelines.yml from the repository root (unless overridden in project settings).",
    },
    verify: { linux: "az pipelines list", mac: "az pipelines list", windows: "az pipelines list" },
  }
);

export const bitbucketPipelines: ToolGuide = {
  slug: "bitbucket-pipelines",
  name: "Bitbucket Pipelines",
  category: "cicd",
  description: "Built-in CI/CD for Bitbucket repositories",
  icon: "🪣",
  install: {
    id: "install",
    title: "Enable Bitbucket Pipelines",
    steps: [
      {
        title: "(01) Turn on Pipelines in Bitbucket",
        description: "Enable Pipelines for your repository before adding the YAML file.",
        commands: {
          linux: `# Bitbucket Cloud:
# Repository → Repository settings → Pipelines → Settings → Enable Pipelines

# Bitbucket Server/Data Center:
# Project settings → Pipelines → Enable for repository`,
          mac: "# Repository settings → Pipelines → Enable Pipelines",
          windows: "# Repository settings → Pipelines → Enable Pipelines",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Create bitbucket-pipelines.yml",
    steps: [
      {
        title: "(01) Add bitbucket-pipelines.yml to repo root",
        description: "Place bitbucket-pipelines.yml in the repository root — same folder as README.md. Bitbucket reads this file automatically on push.",
        commands: {
          linux: `# From your project root (where README lives):
cat > bitbucket-pipelines.yml << 'EOF'
image: node:20
pipelines:
  default:
    - step:
        name: Build and test
        script:
          - npm ci
          - npm test
EOF

git add bitbucket-pipelines.yml
git commit -m "Add Bitbucket Pipelines CI"
git push`,
          mac: `# Create bitbucket-pipelines.yml in repo root, then:
git add bitbucket-pipelines.yml && git commit -m "Add CI" && git push`,
          windows: `# Create bitbucket-pipelines.yml in repo root, then:
git add bitbucket-pipelines.yml
git commit -m "Add CI"
git push`,
        },
      },
      {
        title: "(02) Optional — branch-specific pipelines",
        description: "Use branches: or pull-requests: keys in the same bitbucket-pipelines.yml file.",
        commands: {
          linux: `# Example snippet in bitbucket-pipelines.yml:
# pipelines:
#   branches:
#     main:
#       - step:
#           script: [npm run deploy]
#   pull-requests:
#     '**':
#       - step:
#           script: [npm test]`,
          mac: "# Edit bitbucket-pipelines.yml in repo root",
          windows: "# Edit bitbucket-pipelines.yml in repo root",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Pipeline",
    steps: [
      {
        title: "(01) Check pipeline runs in Bitbucket",
        commands: {
          linux: "# Bitbucket → Repository → Pipelines\n# Confirm latest commit shows a green build",
          mac: "# Bitbucket → Pipelines tab",
          windows: "# Bitbucket → Pipelines tab",
        },
      },
    ],
  },
};

// ── Monitoring & cloud services ──────────────────────────────

export const datadog = guide(
  "datadog", "Datadog Agent", "monitoring", "Infrastructure and APM monitoring SaaS agent", "🐕",
  {
    linux: "DD_API_KEY=YOUR_KEY DD_SITE=datadoghq.com bash -c \"$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)\"",
    mac: "brew install --cask datadog-agent\n# Configure API key in datadog.yaml",
    windows: "msiexec /i datadog-agent-7-latest.amd64.msi",
  },
  {
    verify: { linux: "sudo datadog-agent status", mac: "datadog-agent status", windows: "datadog-agent status" },
  }
);

export const cloudflare = guide(
  "cloudflare", "Cloudflare CLI (wrangler)", "cloud", "Manage Cloudflare Workers, DNS, and CDN from terminal", "🟠",
  {
    linux: "npm install -g wrangler\nwrangler login",
    mac: "npm install -g wrangler && wrangler login",
    windows: "npm install -g wrangler",
  },
  {
    configure: { linux: "wrangler init my-worker\nwrangler deploy", mac: "wrangler deploy", windows: "wrangler deploy" },
    verify: { linux: "wrangler whoami\nwrangler deployments list", mac: "wrangler whoami", windows: "wrangler whoami" },
  }
);

// ── Shell, languages, utilities ──────────────────────────────

export const tmux = guide(
  "tmux", "tmux", "networking", "Terminal multiplexer — keep sessions running after SSH disconnect", "🖥️",
  {
    linux: "sudo apt-get install -y tmux",
    mac: "brew install tmux",
    windows: "# Use WSL or Windows Terminal with tmux in WSL",
  },
  {
    configure: { linux: "tmux new -s dev\n# Ctrl+b d to detach\ntmux attach -t dev", mac: "tmux new -s dev", windows: "tmux new -s dev" },
    verify: { linux: "tmux -V\ntmux ls", mac: "tmux ls", windows: "tmux -V" },
  }
);

export const nodejs = guide(
  "nodejs", "Node.js", "build", "JavaScript runtime for web apps, APIs, and CLI tools", "🟢",
  {
    linux: "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt-get install -y nodejs",
    mac: "brew install node",
    windows: "winget install OpenJS.NodeJS.LTS",
  },
  {
    configure: { linux: "node --version\nnpm init -y\nnpm install express", mac: "npm init -y", windows: "node --version" },
    verify: { linux: "node -e \"console.log('OK')\"\nnpm --version", mac: "node --version", windows: "node --version" },
  }
);

export const ruby = guide(
  "ruby", "Ruby", "build", "Dynamic language — Rails apps and DevOps tooling (Chef, Fastlane)", "💎",
  {
    linux: "sudo apt-get install -y ruby-full\nsudo gem install bundler",
    mac: "brew install ruby",
    windows: "winget install RubyInstallerTeam.Ruby.3.2",
  },
  {
    verify: { linux: "ruby --version\ngem --version", mac: "ruby --version", windows: "ruby --version" },
  }
);

export const gradle = guide(
  "gradle", "Gradle", "build", "Build tool for Java, Kotlin, and Android projects", "🐘",
  {
    linux: "sudo apt-get install -y gradle\n# Or SDKMAN: sdk install gradle",
    mac: "brew install gradle",
    windows: "choco install gradle",
  },
  {
    configure: { linux: "gradle init --type java-application\ngradle build", mac: "gradle build", windows: "gradle build" },
    verify: { linux: "gradle --version", mac: "gradle --version", windows: "gradle --version" },
  }
);

export const jq = guide(
  "jq", "jq", "build", "Command-line JSON processor — parse APIs and config files", "🔧",
  {
    linux: "sudo apt-get install -y jq",
    mac: "brew install jq",
    windows: "choco install jq",
  },
  {
    configure: { linux: "echo '{\"name\":\"dev\"}' | jq '.name'\ncurl -s api.github.com/repos/user/repo | jq '.stargazers_count'", mac: "jq --version", windows: "jq --version" },
    verify: { linux: "jq --version", mac: "jq --version", windows: "jq --version" },
  }
);

export const preCommit = guide(
  "pre-commit", "pre-commit", "security", "Git hooks that run linters and security checks before commit", "🪝",
  {
    linux: "pip install pre-commit\n# Or: sudo apt-get install pre-commit",
    mac: "brew install pre-commit",
    windows: "pip install pre-commit",
  },
  {
    configure: {
      linux: `cat > .pre-commit-config.yaml << 'EOF'
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: check-yaml
EOF
pre-commit install`,
      mac: "pre-commit install",
      windows: "pre-commit install",
    },
    verify: { linux: "pre-commit run --all-files", mac: "pre-commit run --all-files", windows: "pre-commit run --all-files" },
  }
);

export const zookeeper = guide(
  "zookeeper", "Apache ZooKeeper", "database", "Coordination service for Kafka and distributed systems", "🦁",
  {
    linux: "docker run -d --name zookeeper -p 2181:2181 zookeeper:3.9",
    mac: "brew install zookeeper\nbrew services start zookeeper",
    windows: "docker run -d -p 2181:2181 zookeeper:3.9",
  },
  {
    verify: { linux: "docker exec zookeeper zkCli.sh ls /", mac: "echo stat | nc localhost 2181", windows: "docker ps | grep zookeeper" },
  }
);

export const bashToolsGuides = [
  gcloud, githubCli, doctl,
  terragrunt, kustomize, vagrant, direnv,
  circleci, droneCi, buildkite, teamcity, travisCi, azureDevOps, bitbucketPipelines,
  datadog, cloudflare,
  tmux, nodejs, ruby, gradle, jq, preCommit, zookeeper,
];
