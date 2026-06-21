import { guide } from "./guide-utils";
import type { ToolGuide } from "../types";

export const postman = guide(
  "postman",
  "Postman",
  "build",
  "API testing, collections, and automation for REST and GraphQL",
  "📮",
  {
    linux: "sudo snap install postman\n# Or: flatpak install flathub com.getpostman.Postman",
    mac: "brew install --cask postman",
    windows: "winget install Postman.Postman",
  },
  {
    configure: {
      linux: `# Create environment variables in Postman UI
# Run collection with Newman (CLI):
npm install -g newman
newman run collection.json -e environment.json`,
      mac: "newman run collection.json",
      windows: "newman run collection.json",
    },
    verify: { linux: "newman --version\ncurl --version", mac: "newman --version", windows: "newman --version" },
  }
);

export const selenium = guide(
  "selenium",
  "Selenium",
  "build",
  "Browser automation for web testing across Chrome, Firefox, and Edge",
  "🌐",
  {
    linux: `pip install selenium webdriver-manager
# ChromeDriver via package manager:
sudo apt-get install chromium-chromedriver`,
    mac: "pip install selenium\nbrew install chromedriver",
    windows: "pip install selenium\nwinget install Google.Chrome",
  },
  {
    configure: {
      linux: `python3 << 'PY'
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://example.com")
print(driver.title)
driver.quit()
PY`,
      mac: "python3 -c \"from selenium import webdriver; d=webdriver.Chrome(); d.get('https://example.com'); print(d.title); d.quit()\"",
      windows: "python -c \"from selenium import webdriver; d=webdriver.Chrome(); d.get('https://example.com'); print(d.title); d.quit()\"",
    },
    verify: { linux: "python3 -c \"import selenium; print(selenium.__version__)\"", mac: "python3 -c \"import selenium; print(selenium.__version__)\"", windows: "python -c \"import selenium; print(selenium.__version__)\"" },
  }
);

export const slack = guide(
  "slack",
  "Slack",
  "cicd",
  "Team messaging — webhooks and CI notifications",
  "💬",
  {
    linux: "sudo snap install slack\n# Or use web: https://slack.com",
    mac: "brew install --cask slack",
    windows: "winget install SlackTechnologies.Slack",
  },
  {
    configure: {
      linux: `# Incoming webhook (Slack app → Incoming Webhooks)
curl -X POST -H 'Content-type: application/json' \\
  --data '{"text":"Deploy finished ✅"}' \\
  https://hooks.slack.com/services/T000/B000/XXXX

# Jenkins: Slack Notification plugin → workspace + channel`,
      mac: "# Same webhook curl from terminal",
      windows: "# Same webhook via PowerShell Invoke-RestMethod",
    },
    verify: { linux: "curl -I https://slack.com/api/api.test", mac: "curl -I https://slack.com", windows: "Test-NetConnection slack.com -Port 443" },
  }
);

export const jira = guide(
  "jira",
  "Jira",
  "cicd",
  "Agile issue tracking — sprints, boards, and DevOps workflows",
  "📋",
  {
    linux: "# Jira Cloud: https://www.atlassian.com/software/jira\n# Self-hosted (Data Center) requires license + installer from Atlassian",
    mac: "open https://www.atlassian.com/software/jira",
    windows: "Start-Process https://www.atlassian.com/software/jira",
  },
  {
    configure: {
      linux: `# REST API example (create issue)
curl -u email:api_token \\
  -X POST -H "Content-Type: application/json" \\
  -d '{"fields":{"project":{"key":"DEV"},"summary":"Deploy failed","issuetype":{"name":"Bug"}}}' \\
  https://your-domain.atlassian.net/rest/api/3/issue`,
      mac: "# Use Atlassian API token: id.atlassian.com/manage-profile/security/api-tokens",
      windows: "# Same REST API with Invoke-RestMethod",
    },
    verify: { linux: "curl -u email:api_token https://your-domain.atlassian.net/rest/api/3/myself", mac: "curl -u email:api_token https://your-domain.atlassian.net/rest/api/3/myself", windows: "curl -u email:api_token https://your-domain.atlassian.net/rest/api/3/myself" },
  }
);

export const trello = guide(
  "trello",
  "Trello",
  "cicd",
  "Kanban boards for visual task and project tracking",
  "📌",
  {
    linux: "open https://trello.com",
    mac: "open https://trello.com",
    windows: "Start-Process https://trello.com",
  },
  {
    configure: {
      linux: `# Trello REST API — get boards
curl "https://api.trello.com/1/members/me/boards?key=API_KEY&token=TOKEN"`,
      mac: "curl https://api.trello.com/1/members/me/boards?key=KEY&token=TOKEN",
      windows: "curl https://api.trello.com/1/members/me/boards?key=KEY&token=TOKEN",
    },
    verify: { linux: "curl -I https://api.trello.com", mac: "curl -I https://api.trello.com", windows: "Test-NetConnection api.trello.com -Port 443" },
  }
);

export const confluence = guide(
  "confluence",
  "Confluence",
  "cicd",
  "Team wiki and documentation — runbooks and architecture docs",
  "📖",
  {
    linux: "# Confluence Cloud: https://www.atlassian.com/software/confluence",
    mac: "open https://www.atlassian.com/software/confluence",
    windows: "Start-Process https://www.atlassian.com/software/confluence",
  },
  {
    configure: {
      linux: `# Create page via REST API
curl -u email:api_token \\
  -X POST -H "Content-Type: application/json" \\
  -d '{"type":"page","title":"Runbook","space":{"key":"DEV"},"body":{"storage":{"value":"<p>Deploy steps</p>","representation":"storage"}}}' \\
  https://your-domain.atlassian.net/wiki/rest/api/content`,
      mac: "# Link Jira issues to Confluence pages in project settings",
      windows: "# Same REST API",
    },
    verify: { linux: "curl -u email:api_token https://your-domain.atlassian.net/wiki/rest/api/space", mac: "curl -u email:api_token https://your-domain.atlassian.net/wiki/rest/api/space", windows: "curl -u email:api_token https://your-domain.atlassian.net/wiki/rest/api/space" },
  }
);

export const vscode = guide(
  "vscode",
  "Visual Studio Code",
  "build",
  "Popular code editor with DevOps extensions and integrated terminal",
  "💻",
  {
    linux: "sudo snap install code --classic\n# Or: sudo apt install code",
    mac: "brew install --cask visual-studio-code",
    windows: "winget install Microsoft.VisualStudioCode",
  },
  {
    configure: {
      linux: `# Install extensions from CLI
code --install-extension ms-azuretools.vscode-docker
code --install-extension hashicorp.terraform
code --install-extension redhat.vscode-yaml
code --install-extension GitHub.copilot`,
      mac: "code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools",
      windows: "code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools",
    },
    verify: { linux: "code --version\ncode --list-extensions", mac: "code --version", windows: "code --version" },
  }
);

export const sublimeText = guide(
  "sublime-text",
  "Sublime Text",
  "build",
  "Fast text editor for scripts, configs, and quick edits",
  "✏️",
  {
    linux: "wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/sublimehq.gpg\nsudo apt install sublime-text",
    mac: "brew install --cask sublime-text",
    windows: "winget install SublimeHQ.SublimeText.4",
  },
  {
    configure: {
      linux: "# Package Control: Ctrl+Shift+P → Install Package Control\n# Install: Dockerfile, YAML, Terraform syntax",
      mac: "subl --version",
      windows: "subl --version",
    },
    verify: { linux: "subl --version", mac: "subl --version", windows: "subl --version" },
  }
);

export const notepadPlusPlus = guide(
  "notepad-plus-plus",
  "Notepad++",
  "build",
  "Windows source editor for configs, logs, and scripts",
  "📝",
  {
    linux: "# Windows-only; on Linux use VS Code or Sublime",
    mac: "# Windows-only",
    windows: "winget install Notepad++.Notepad++",
  },
  {
    configure: {
      linux: "",
      mac: "",
      windows: `# Plugins → Plugin Admin → install JSON Viewer, Compare
# View → Show Symbol → Show All Characters (for hidden chars in configs)`,
    },
    verify: { linux: "", mac: "", windows: "Get-Command notepad++ -ErrorAction SilentlyContinue; & 'C:\\Program Files\\Notepad++\\notepad++.exe' -version" },
  }
);

export const extendedDevCollabTools = [
  postman,
  selenium,
  slack,
  jira,
  trello,
  confluence,
  vscode,
  sublimeText,
  notepadPlusPlus,
];
