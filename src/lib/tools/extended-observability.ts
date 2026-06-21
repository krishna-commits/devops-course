import { guide } from "./guide-utils";
import type { ToolGuide } from "../types";

export const elkStack = guide(
  "elk-stack",
  "ELK Stack",
  "monitoring",
  "Elasticsearch + Logstash + Kibana — log aggregation and visualization",
  "📊",
  {
    linux: `curl -fsSL https://elastic.co/start-local | sh -s -- --version 8.15.0
# Or Docker Compose:
docker compose -f https://raw.githubusercontent.com/elastic/elasticsearch/main/docs/reference/setup/install/docker/docker-compose.yml up -d`,
    mac: "brew tap elastic/tap\nbrew install elastic/tap/elasticsearch-full\nbrew services start elasticsearch-full",
    windows: "docker compose up -d elasticsearch kibana logstash",
  },
  {
    configure: {
      linux: `# Logstash pipeline example
cat > logstash.conf << 'EOF'
input { beats { port => 5044 } }
output { elasticsearch { hosts => ["http://localhost:9200"] } }
EOF
# Kibana: http://localhost:5601`,
      mac: "open http://localhost:5601",
      windows: "Start-Process http://localhost:5601",
    },
    verify: { linux: "curl http://localhost:9200\ncurl http://localhost:5601/api/status", mac: "curl http://localhost:9200", windows: "curl http://localhost:9200" },
  }
);

export const fluentd = guide(
  "fluentd",
  "Fluentd",
  "monitoring",
  "Unified log collector — route logs to Elasticsearch, S3, Kafka, and more",
  "📤",
  {
    linux: "curl -fsSL https://toolbelt.treasuredata.com/sh/install-ubuntu-focal-td-agent4.sh | sudo sh",
    mac: "brew install fluentd",
    windows: "gem install fluentd --no-doc\nfluentd --setup ./fluent",
  },
  {
    configure: {
      linux: `sudo tee /etc/td-agent/td-agent.conf << 'EOF'
<source>
  @type tail
  path /var/log/syslog
  pos_file /var/log/td-agent/syslog.pos
  tag system.syslog
  format none
</source>
<match system.**>
  @type stdout
</match>
EOF
sudo systemctl restart td-agent`,
      mac: "fluentd -c fluent/fluent.conf",
      windows: "fluentd -c fluent/fluent.conf",
    },
    verify: { linux: "sudo systemctl status td-agent\nsudo tail -f /var/log/td-agent/td-agent.log", mac: "fluentd --version", windows: "fluentd --version" },
  }
);

export const graylog = guide(
  "graylog",
  "Graylog",
  "monitoring",
  "Centralized log management with search, streams, and alerts",
  "🌫️",
  {
    linux: `wget https://packages.graylog2.org/repo/packages/graylog-6.0-repository_latest.deb
sudo dpkg -i graylog-6.0-repository_latest.deb
sudo apt-get update && sudo apt-get install graylog-server`,
    mac: "docker run -d --name graylog -p 9000:9000 -p 12201:12201/udp graylog/graylog:6.0",
    windows: "docker run -d -p 9000:9000 graylog/graylog:6.0",
  },
  {
    configure: {
      linux: `# Set password secret and root password hash in /etc/graylog/server/server.conf
# password_secret = ...
# root_password_sha2 = ...
sudo graylogctl restart
# UI: http://localhost:9000 admin / your-password`,
      mac: "open http://localhost:9000",
      windows: "Start-Process http://localhost:9000",
    },
    verify: { linux: "curl -s http://localhost:9000/api/system\nsudo graylogctl status", mac: "curl http://localhost:9000", windows: "curl http://localhost:9000" },
  }
);

export const kibana = guide(
  "kibana",
  "Kibana",
  "monitoring",
  "Elasticsearch UI for dashboards, log search, and APM",
  "📈",
  {
    linux: "sudo apt-get install kibana\nsudo systemctl enable kibana --now",
    mac: "brew install kibana\nbrew services start kibana",
    windows: "docker run -d -p 5601:5601 docker.elastic.co/kibana/kibana:8.15.0",
  },
  {
    configure: {
      linux: `# /etc/kibana/kibana.yml
# server.host: "0.0.0.0"
# elasticsearch.hosts: ["http://localhost:9200"]
sudo systemctl restart kibana`,
      mac: "open http://localhost:5601",
      windows: "Start-Process http://localhost:5601",
    },
    verify: { linux: "curl http://localhost:5601/api/status\nsudo systemctl status kibana", mac: "curl http://localhost:5601/api/status", windows: "curl http://localhost:5601/api/status" },
  }
);

export const splunk = guide(
  "splunk",
  "Splunk",
  "monitoring",
  "Enterprise log analytics — forwarder install and basic search",
  "🔍",
  {
    linux: `wget -O splunk.tgz 'https://download.splunk.com/products/universalforwarder/releases/9.3.0/linux/splunkforwarder-9.3.0-Linux-x86_64.tgz'
tar xzf splunk.tgz -C /opt
sudo /opt/splunkforwarder/bin/splunk start --accept-license`,
    mac: "brew install --cask splunk",
    windows: "Download Splunk Universal Forwarder MSI from splunk.com",
  },
  {
    configure: {
      linux: `sudo /opt/splunkforwarder/bin/splunk add forward-server splunk-server:9997
sudo /opt/splunkforwarder/bin/splunk add monitor /var/log/syslog
sudo /opt/splunkforwarder/bin/splunk restart`,
      mac: "/Applications/Splunk/bin/splunk status",
      windows: "& 'C:\\Program Files\\SplunkUniversalForwarder\\bin\\splunk.exe' status",
    },
    verify: { linux: "sudo /opt/splunkforwarder/bin/splunk list forward-server", mac: "splunk list forward-server", windows: "splunk list forward-server" },
  }
);

export const newRelic = guide(
  "new-relic",
  "New Relic",
  "monitoring",
  "APM and infrastructure monitoring — agent install",
  "📡",
  {
    linux: `curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash
sudo NEW_RELIC_API_KEY=NRAK-xxx NEW_RELIC_ACCOUNT_ID=1234567 /usr/local/bin/newrelic install -y`,
    mac: "brew install newrelic-cli\nnewrelic profile add --profile default --apiKey NRAK-xxx --accountId 1234567",
    windows: "newrelic-cli install",
  },
  {
    configure: {
      linux: `# Java: -javaagent:/path/newrelic.jar
# Node: require('newrelic') as first line
export NEW_RELIC_LICENSE_KEY=your-key
export NEW_RELIC_APP_NAME="My App"`,
      mac: "newrelic entity search --name 'My App'",
      windows: "newrelic entity search",
    },
    verify: { linux: "newrelic entity search --name 'My App'", mac: "newrelic apm application list", windows: "newrelic apm application list" },
  }
);

export const logzio = guide(
  "logzio",
  "Logz.io",
  "monitoring",
  "Managed ELK — ship logs with Filebeat or Fluentd",
  "☁️",
  {
    linux: "curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.15.0-linux-x86_64.tar.gz\ntar xzf filebeat-*.tar.gz",
    mac: "brew install filebeat",
    windows: "choco install filebeat",
  },
  {
    configure: {
      linux: `# filebeat.yml — use token from Logz.io onboarding
# output.logstash.hosts: ["listener.logz.io:5015"]
# output.logstash.ssl.certificate_authorities: ["/etc/filebeat/logzio.crt"]
./filebeat -e -c filebeat.yml`,
      mac: "filebeat test output",
      windows: "filebeat test output",
    },
    verify: { linux: "filebeat test output\nfilebeat -e", mac: "filebeat test output", windows: "filebeat test output" },
  }
);

export const syslogNg = guide(
  "syslog-ng",
  "Syslog-ng",
  "monitoring",
  "Flexible log collection and routing for enterprise environments",
  "📋",
  {
    linux: "sudo apt-get install syslog-ng\nsudo systemctl enable syslog-ng --now",
    mac: "brew install syslog-ng",
    windows: "choco install syslog-ng",
  },
  {
    configure: {
      linux: `sudo tee -a /etc/syslog-ng/syslog-ng.conf << 'EOF'
source s_local { system(); internal(); };
destination d_file { file("/var/log/syslog-ng/all.log"); };
log { source(s_local); destination(d_file); };
EOF
sudo systemctl restart syslog-ng`,
      mac: "syslog-ng --version",
      windows: "syslog-ng --version",
    },
    verify: { linux: "sudo syslog-ng-ctl stats\nsudo tail -f /var/log/syslog-ng/all.log", mac: "syslog-ng-ctl stats", windows: "syslog-ng-ctl stats" },
  }
);

export const extendedObservabilityTools = [
  elkStack,
  fluentd,
  graylog,
  kibana,
  splunk,
  newRelic,
  logzio,
  syslogNg,
];
