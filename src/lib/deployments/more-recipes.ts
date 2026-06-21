import type { DeploymentRecipe } from "../types";

const applyCompose = (name: string): DeploymentRecipe["apply"] => ({
  id: "apply",
  title: `Run ${name}`,
  steps: [
    {
      title: "(01) Start stack",
      commands: {
        linux: "docker compose up -d --build\ndocker compose ps\ndocker compose logs -f",
        mac: "docker compose up -d --build\ndocker compose ps",
        windows: "docker compose up -d --build\ndocker compose ps",
      },
    },
    {
      title: "(02) Stop",
      commands: {
        linux: "docker compose down",
        mac: "docker compose down",
        windows: "docker compose down",
      },
    },
  ],
});

const applyK8s = (label: string): DeploymentRecipe["apply"] => ({
  id: "apply",
  title: `Apply ${label}`,
  steps: [
    {
      title: "(01) Deploy to cluster",
      commands: {
        linux: "kubectl apply -f .\nkubectl get all\nkubectl get pods -w",
        mac: "kubectl apply -f .\nkubectl get pods",
        windows: "kubectl apply -f .\nkubectl get pods",
      },
    },
    {
      title: "(02) Remove",
      commands: {
        linux: "kubectl delete -f .",
        mac: "kubectl delete -f .",
        windows: "kubectl delete -f .",
      },
    },
  ],
});

// ── Docker Compose ───────────────────────────────────────────

export const nodeRedisMongoCompose: DeploymentRecipe = {
  slug: "node-redis-mongo-compose",
  name: "Node.js + Redis + MongoDB",
  description: "Full-stack compose — API with Redis cache and MongoDB persistence",
  icon: "🟢",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose", "nodejs", "redis", "mongodb"],
  files: [
    {
      filename: "docker-compose.yml",
      description: "Node API, Redis cache, MongoDB with named volumes",
      content: `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      REDIS_URL: redis://redis:6379
      MONGO_URL: mongodb://mongo:27017/app
    depends_on:
      - redis
      - mongo

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  redis_data:
  mongo_data:`,
    },
    {
      filename: "Dockerfile",
      content: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
    },
  ],
  apply: applyCompose("Node + Redis + Mongo"),
};

export const nginxPhpCompose: DeploymentRecipe = {
  slug: "nginx-php-compose",
  name: "Nginx + PHP-FPM",
  description: "Classic web stack — Nginx reverse proxy to PHP-FPM for Laravel/WordPress",
  icon: "🐘",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose", "nginx", "php"],
  files: [
    {
      filename: "docker-compose.yml",
      content: `services:
  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./src:/var/www/html
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - php

  php:
    image: php:8.3-fpm
    volumes:
      - ./src:/var/www/html

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: app
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:`,
    },
    {
      filename: "nginx.conf",
      description: "Pass PHP requests to php:9000",
      content: `server {
    listen 80;
    root /var/www/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}`,
    },
  ],
  apply: applyCompose("Nginx + PHP"),
};

export const prometheusGrafanaCompose: DeploymentRecipe = {
  slug: "prometheus-grafana-compose",
  name: "Prometheus + Grafana",
  description: "Monitoring stack — scrape metrics and visualize in Grafana dashboards",
  icon: "📊",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose", "prometheus", "grafana"],
  files: [
    {
      filename: "docker-compose.yml",
      content: `services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prom_data:/prometheus

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus

volumes:
  prom_data:
  grafana_data:`,
    },
    {
      filename: "prometheus.yml",
      content: `global:
  scrape_interval: 15s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ["localhost:9090"]`,
    },
  ],
  apply: applyCompose("Prometheus + Grafana"),
};

export const postgresPgadminCompose: DeploymentRecipe = {
  slug: "postgres-pgadmin-compose",
  name: "PostgreSQL + pgAdmin",
  description: "Database with web UI — pgAdmin for managing PostgreSQL",
  icon: "🐘",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose", "postgresql"],
  files: [
    {
      filename: "docker-compose.yml",
      content: `services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
      POSTGRES_DB: myapp
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@local.dev
      PGADMIN_DEFAULT_PASSWORD: admin123
    depends_on:
      - db

volumes:
  pg_data:`,
    },
  ],
  apply: applyCompose("PostgreSQL + pgAdmin"),
};

export const rabbitmqCompose: DeploymentRecipe = {
  slug: "rabbitmq-compose",
  name: "RabbitMQ Message Broker",
  description: "RabbitMQ with management UI — AMQP on 5672, dashboard on 15672",
  icon: "🐰",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose", "rabbitmq"],
  files: [
    {
      filename: "docker-compose.yml",
      content: `services:
  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin123
    volumes:
      - rabbit_data:/var/lib/rabbitmq

volumes:
  rabbit_data:`,
    },
  ],
  apply: applyCompose("RabbitMQ"),
};

export const fastapiPostgresCompose: DeploymentRecipe = {
  slug: "fastapi-postgres-compose",
  name: "FastAPI + PostgreSQL",
  description: "Python FastAPI API with async PostgreSQL backend",
  icon: "⚡",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose", "python", "postgresql"],
  files: [
    {
      filename: "docker-compose.yml",
      content: `services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://app:app@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:`,
    },
    {
      filename: "Dockerfile",
      content: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
    },
  ],
  apply: applyCompose("FastAPI + PostgreSQL"),
};

// ── Kubernetes ───────────────────────────────────────────────

export const k8sRedis: DeploymentRecipe = {
  slug: "k8s-redis",
  name: "Redis on Kubernetes",
  description: "Redis Deployment + ClusterIP Service for in-cluster caching",
  icon: "🔴",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "redis", "helm"],
  files: [
    {
      filename: "redis-deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis:7-alpine
          ports:
            - containerPort: 6379
          resources:
            limits:
              memory: 256Mi
              cpu: 250m`,
    },
    {
      filename: "redis-service.yml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  type: ClusterIP
  selector:
    app: redis
  ports:
    - port: 6379
      targetPort: 6379`,
    },
  ],
  apply: applyK8s("Redis"),
};

export const k8sPostgresql: DeploymentRecipe = {
  slug: "k8s-postgresql",
  name: "PostgreSQL on Kubernetes",
  description: "PostgreSQL with PVC — persistent database in the cluster",
  icon: "🐘",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "postgresql"],
  files: [
    {
      filename: "postgres-pvc.yml",
      content: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi`,
    },
    {
      filename: "postgres-deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16-alpine
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_USER
              value: app
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-secret
                  key: password
            - name: POSTGRES_DB
              value: appdb
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: postgres-pvc`,
    },
    {
      filename: "postgres-secret.yml",
      content: `apiVersion: v1
kind: Secret
metadata:
  name: postgres-secret
type: Opaque
stringData:
  password: change-me-in-production`,
    },
  ],
  apply: applyK8s("PostgreSQL"),
};

export const k8sLoadBalancer: DeploymentRecipe = {
  slug: "k8s-loadbalancer",
  name: "LoadBalancer Service",
  description: "Expose app with LoadBalancer — cloud LB or MetalLB on bare metal",
  icon: "⚖️",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "nginx", "haproxy"],
  files: [
    {
      filename: "deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: nginx
          image: nginx:alpine
          ports:
            - containerPort: 80`,
    },
    {
      filename: "service-loadbalancer.yml",
      description: "LoadBalancer assigns external IP (cloud) or MetalLB IP",
      content: `apiVersion: v1
kind: Service
metadata:
  name: web-lb
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP`,
    },
  ],
  apply: applyK8s("LoadBalancer"),
};

export const k8sCronJob: DeploymentRecipe = {
  slug: "k8s-cronjob",
  name: "Kubernetes CronJob",
  description: "Scheduled backup job — runs on a cron schedule inside the cluster",
  icon: "⏰",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "velero"],
  files: [
    {
      filename: "cronjob-backup.yml",
      content: `apiVersion: batch/v1
kind: CronJob
metadata:
  name: db-backup
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: backup
              image: postgres:16-alpine
              command:
                - /bin/sh
                - -c
                - pg_dump -h postgres -U app appdb > /backup/dump.sql
              volumeMounts:
                - name: backup
                  mountPath: /backup
          volumes:
            - name: backup
              emptyDir: {}`,
    },
  ],
  apply: applyK8s("CronJob"),
};

export const k8sNetworkPolicy: DeploymentRecipe = {
  slug: "k8s-network-policy",
  name: "NetworkPolicy (Deny All)",
  description: "Lock down pod traffic — deny all ingress, allow only from frontend",
  icon: "🔒",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "calico", "cilium", "istio"],
  files: [
    {
      filename: "network-policy-deny-all.yml",
      content: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Ingress`,
    },
    {
      filename: "network-policy-allow-frontend.yml",
      description: "Allow traffic only from pods labeled role=frontend",
      content: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-frontend
spec:
  podSelector:
    matchLabels:
      tier: backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 8080`,
    },
  ],
  apply: applyK8s("NetworkPolicy"),
};

export const k8sStatefulSet: DeploymentRecipe = {
  slug: "k8s-statefulset",
  name: "StatefulSet (MongoDB)",
  description: "StatefulSet with headless Service — stable pod identity for databases",
  icon: "🗄️",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "mongodb"],
  files: [
    {
      filename: "mongodb-statefulset.yml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: mongo
spec:
  clusterIP: None
  selector:
    app: mongo
  ports:
    - port: 27017
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongo
spec:
  serviceName: mongo
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
        - name: mongo
          image: mongo:7
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: data
              mountPath: /data/db
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 5Gi`,
    },
  ],
  apply: applyK8s("StatefulSet"),
};

export const k8sArgocdApp: DeploymentRecipe = {
  slug: "k8s-argocd-app",
  name: "Argo CD Application",
  description: "GitOps Application manifest — sync Kubernetes from a Git repo",
  icon: "🚀",
  type: "kubernetes",
  relatedTools: ["argocd", "kubernetes", "kubectl", "flux"],
  files: [
    {
      filename: "argocd-application.yml",
      content: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/your-repo.git
    targetRevision: main
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy Argo CD Application",
    steps: [
      {
        title: "(01) Apply and sync",
        commands: {
          linux: `kubectl apply -f argocd-application.yml
argocd app get myapp
argocd app sync myapp`,
          mac: "kubectl apply -f argocd-application.yml\nargocd app sync myapp",
          windows: "kubectl apply -f argocd-application.yml",
        },
      },
    ],
  },
};

export const k8sExternalSecret: DeploymentRecipe = {
  slug: "k8s-external-secret",
  name: "External Secrets Operator",
  description: "Sync AWS Secrets Manager secret into a Kubernetes Secret",
  icon: "🔐",
  type: "kubernetes",
  relatedTools: ["external-secrets-operator", "kubernetes", "aws-secrets-manager", "vault"],
  files: [
    {
      filename: "secret-store.yml",
      content: `apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets
  namespace: default
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1`,
    },
    {
      filename: "external-secret.yml",
      content: `apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-db-credentials
  namespace: default
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets
    kind: SecretStore
  target:
    name: db-credentials
    creationPolicy: Owner
  data:
    - secretKey: password
      remoteRef:
        key: prod/myapp/db
        property: password`,
    },
  ],
  apply: applyK8s("ExternalSecret"),
};

// ── CI / IaC ─────────────────────────────────────────────────

export const gitlabCiYaml: DeploymentRecipe = {
  slug: "gitlab-ci-yml",
  name: "GitLab CI Pipeline",
  description: "Build, test, and deploy with .gitlab-ci.yml — Docker-in-Docker included",
  icon: "🦊",
  type: "dockerfile",
  relatedTools: ["gitlab-ci", "docker", "kubernetes"],
  files: [
    {
      filename: ".gitlab-ci.yml",
      content: `stages:
  - build
  - test
  - deploy

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

build:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
  only:
    - main

test:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm test

deploy:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl set image deployment/myapp app=$DOCKER_IMAGE
  environment:
    name: production
  only:
    - main`,
    },
  ],
  apply: {
    id: "apply",
    title: "Use GitLab CI",
    steps: [
      {
        title: "(01) Add pipeline to repo",
        commands: {
          linux: "git add .gitlab-ci.yml\ngit commit -m 'Add GitLab CI pipeline'\ngit push",
          mac: "git add .gitlab-ci.yml && git commit -m 'Add GitLab CI' && git push",
          windows: "git add .gitlab-ci.yml\ngit commit -m 'Add GitLab CI'\ngit push",
        },
      },
    ],
  },
};

export const terraformAwsVpc: DeploymentRecipe = {
  slug: "terraform-aws-vpc",
  name: "Terraform AWS VPC",
  description: "VPC with public/private subnets, IGW, and NAT gateway",
  icon: "☁️",
  type: "dockerfile",
  relatedTools: ["terraform", "aws-cli", "aws-cloudformation"],
  files: [
    {
      filename: "main.tf",
      content: `terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = { Name = "main-vpc" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "\${var.aws_region}a"
  tags = { Name = "public-subnet" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}`,
    },
    {
      filename: "variables.tf",
      content: `variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}`,
    },
  ],
  apply: {
    id: "apply",
    title: "Apply Terraform VPC",
    steps: [
      {
        title: "(01) Init and apply",
        commands: {
          linux: "terraform init\nterraform plan\nterraform apply",
          mac: "terraform init && terraform apply",
          windows: "terraform init\nterraform apply",
        },
      },
    ],
  },
};

export const cloudformationVpc: DeploymentRecipe = {
  slug: "cloudformation-vpc",
  name: "CloudFormation VPC",
  description: "AWS VPC stack template — create network infrastructure from YAML",
  icon: "📚",
  type: "dockerfile",
  relatedTools: ["aws-cloudformation", "aws-cli", "terraform"],
  files: [
    {
      filename: "vpc-stack.yaml",
      content: `AWSTemplateFormatVersion: "2010-09-09"
Description: Simple VPC with one public subnet

Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: devops-vpc

  PublicSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: 10.0.1.0/24
      MapPublicIpOnLaunch: true
      AvailabilityZone: !Select [0, !GetAZs ""]

Outputs:
  VpcId:
    Value: !Ref MyVPC
    Export:
      Name: !Sub "\${AWS::StackName}-VpcId"`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy CloudFormation Stack",
    steps: [
      {
        title: "(01) Create stack",
        commands: {
          linux: `aws cloudformation create-stack \\
  --stack-name my-vpc \\
  --template-body file://vpc-stack.yaml
aws cloudformation describe-stacks --stack-name my-vpc`,
          mac: "aws cloudformation create-stack --stack-name my-vpc --template-body file://vpc-stack.yaml",
          windows: "aws cloudformation create-stack --stack-name my-vpc --template-body file://vpc-stack.yaml",
        },
      },
    ],
  },
};

export const moreRecipes = [
  nodeRedisMongoCompose,
  nginxPhpCompose,
  prometheusGrafanaCompose,
  postgresPgadminCompose,
  rabbitmqCompose,
  fastapiPostgresCompose,
  k8sRedis,
  k8sPostgresql,
  k8sLoadBalancer,
  k8sCronJob,
  k8sNetworkPolicy,
  k8sStatefulSet,
  k8sArgocdApp,
  k8sExternalSecret,
  gitlabCiYaml,
  terraformAwsVpc,
  cloudformationVpc,
];
