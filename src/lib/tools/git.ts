import type { ToolGuide } from "../types";

export const git: ToolGuide = {
  slug: "git",
  name: "Git",
  category: "vcs",
  description: "Distributed version control system",
  icon: "📦",
  install: {
    id: "install",
    title: "Install Git",
    steps: [
      {
        title: "(01) Install Git",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update && sudo apt-get install -y git

# RHEL / Fedora
sudo dnf install -y git`,
          mac: `# Xcode Command Line Tools (includes Git)
xcode-select --install

# Or Homebrew
brew install git`,
          windows: `# winget
winget install Git.Git

# Or Chocolatey
choco install git -y`,
        },
      },
      {
        title: "(02) Configure Git",
        commands: {
          linux: `git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global --list`,
          mac: `git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main`,
          windows: `git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main`,
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
          linux: "git --version",
          mac: "git --version",
          windows: "git --version",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Git",
    steps: [
      {
        title: "(01) Repository Basics",
        commands: {
          linux: `git init
git clone https://github.com/user/repo.git
git status
git add .
git commit -m "Initial commit"
git push origin main`,
          mac: `git init
git clone https://github.com/user/repo.git
git status
git add .
git commit -m "Initial commit"
git push origin main`,
          windows: `git init
git clone https://github.com/user/repo.git
git status
git add .
git commit -m "Initial commit"
git push origin main`,
        },
      },
      {
        title: "(02) Branching",
        commands: {
          linux: `git branch
git checkout -b feature/new-feature
git merge feature/new-feature
git branch -d feature/new-feature
git push origin --delete feature/new-feature`,
          mac: `git branch
git checkout -b feature/new-feature
git merge feature/new-feature
git branch -d feature/new-feature`,
          windows: `git branch
git checkout -b feature/new-feature
git merge feature/new-feature
git branch -d feature/new-feature`,
        },
      },
      {
        title: "(03) Remote & Sync",
        commands: {
          linux: `git remote -v
git fetch origin
git pull origin main
git push origin main
git log --oneline -10`,
          mac: `git remote -v
git fetch origin
git pull origin main
git push origin main`,
          windows: `git remote -v
git fetch origin
git pull origin main
git push origin main`,
        },
      },
    ],
  },
};
