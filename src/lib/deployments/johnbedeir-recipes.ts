import type { DeploymentRecipe } from "../types";

/** Patterns from johnbedeir/Devops-Tools-Documentation */

export const jenkinsEksPython: DeploymentRecipe = {
  slug: "jenkins-eks-python",
  name: "Jenkins → EKS Python Deploy",
  description: "Jenkins pipeline that updates kubeconfig and deploys a Python app to Amazon EKS",
  icon: "🐍",
  type: "dockerfile",
  relatedTools: ["jenkins", "kubernetes", "aws-cli", "python", "kubectl"],
  files: [
    {
      filename: "Jenkinsfile",
      description: "Deploy Python survey app to EKS — update kubeconfig, kubectl apply, reveal ELB URL",
      content: `pipeline {
    agent any

    parameters {
        string(name: 'DEPLOYMENT', defaultValue: 'production')
    }

    stages {
      stage('Update Kubeconfig') {
          steps {
              withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: "aws-credentials",
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
              ]]) {
                sh """
                aws eks update-kubeconfig --name python-cluster --region us-east-1
                kubectl get nodes
                """
              }
          }
      }

      stage('Deploy App') {
          steps {
              withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: "aws-credentials",
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
              ]]) {
                sh """
                kubectl create namespace python-app --dry-run=client -o yaml | kubectl apply -f -
                kubectl -n python-app apply -f k8s/deployment.yaml
                kubectl -n python-app apply -f k8s/services.yaml
                kubectl -n python-app rollout status deployment/survey-app-deploy
                """
              }
          }
      }

      stage('Reveal APP URL') {
          steps {
              withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: "aws-credentials",
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
              ]]) {
                sh "kubectl -n python-app get svc"
              }
          }
      }
    }
}`,
    },
    {
      filename: "k8s/deployment.yaml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: survey-app-deploy
  namespace: python-app
  labels:
    app: survey-app
spec:
  selector:
    matchLabels:
      app: survey-app
  replicas: 2
  template:
    metadata:
      labels:
        app: survey-app
    spec:
      containers:
        - name: survey-app
          image: your-registry/survey-app:latest
          ports:
            - containerPort: 8000
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "250m"`,
    },
    {
      filename: "k8s/services.yaml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: survey-app-service
  namespace: python-app
spec:
  type: LoadBalancer
  selector:
    app: survey-app
  ports:
    - port: 80
      targetPort: 8000
      protocol: TCP`,
    },
  ],
  apply: {
    id: "apply",
    title: "Use the Pipeline",
    steps: [
      {
        title: "(01) Add Jenkins credentials and run",
        commands: {
          linux: `# Jenkins → Manage Credentials → AWS credentials (ID: aws-credentials)
# Create EKS cluster named python-cluster
# Add Jenkinsfile to repo; create Pipeline job
# Push image to ECR/Docker Hub, update deployment.yaml image`,
          mac: "# Same Jenkins setup",
          windows: "# Same Jenkins setup",
        },
      },
    ],
  },
};

export const goMongoCompose: DeploymentRecipe = {
  slug: "go-mongo-compose",
  name: "Go App + MongoDB Compose",
  description: "Go API with MongoDB — DevOps-Pipeline-Go Minikube/docker-compose pattern",
  icon: "🐹",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose", "go", "mongodb"],
  files: [
    {
      filename: "docker-compose.yml",
      content: `version: "3"

services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      SERVER_PORT: 8080
      MONGO_URI: mongodb://db:27017
    security_opt:
      - no-new-privileges:true

  db:
    image: mongo:latest
    restart: always
    ports:
      - "27017:27017"
    security_opt:
      - no-new-privileges:true`,
    },
    {
      filename: "Dockerfile",
      content: `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server .

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/server .
EXPOSE 8080
CMD ["./server"]`,
    },
  ],
  apply: {
    id: "apply",
    title: "Run the Stack",
    steps: [
      {
        title: "(01) Build and start",
        commands: {
          linux: "docker compose up -d --build\ndocker compose ps\ncurl http://localhost:8080/health",
          mac: "docker compose up -d --build\ncurl http://localhost:8080",
          windows: "docker compose up -d --build",
        },
      },
    ],
  },
};

export const k8sGoMongo: DeploymentRecipe = {
  slug: "k8s-go-mongo",
  name: "Go + MongoDB on Kubernetes",
  description: "Go survey app with MongoDB sidecar — 2 replicas on Minikube/EKS",
  icon: "☸️",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "go", "minikube"],
  files: [
    {
      filename: "deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: go-app-deploy
  namespace: go-survey
  labels:
    app: go-app
spec:
  selector:
    matchLabels:
      app: go-app
  replicas: 2
  template:
    metadata:
      labels:
        app: go-app
    spec:
      containers:
        - name: go-app
          image: your-registry/gosurvey:latest
          ports:
            - containerPort: 8080
          env:
            - name: MONGODB_URI
              value: "mongodb://mongo-app-service:27017"
            - name: SERVER_PORT
              value: "8080"
          securityContext:
            allowPrivilegeEscalation: false
        - name: mongo-app
          image: mongo:latest
          ports:
            - containerPort: 27017
          securityContext:
            allowPrivilegeEscalation: false`,
    },
    {
      filename: "service.yml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: go-app-service
  namespace: go-survey
spec:
  type: NodePort
  selector:
    app: go-app
  ports:
    - port: 8080
      targetPort: 8080
      nodePort: 30080
---
apiVersion: v1
kind: Service
metadata:
  name: mongo-app-service
  namespace: go-survey
spec:
  selector:
    app: go-app
  ports:
    - port: 27017
      targetPort: 27017`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy to Kubernetes",
    steps: [
      {
        title: "(01) Create namespace and apply",
        commands: {
          linux: `kubectl create namespace go-survey
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl -n go-survey get pods,svc
curl http://localhost:30080  # minikube: minikube service go-app-service -n go-survey`,
          mac: "kubectl apply -f .\nkubectl -n go-survey get pods",
          windows: "kubectl apply -f .\nkubectl -n go-survey get pods",
        },
      },
    ],
  },
};

export const k8sLaravelMonitoring: DeploymentRecipe = {
  slug: "k8s-laravel-monitoring",
  name: "Laravel + MySQL on K8s",
  description: "PHP Laravel frontend with MySQL — DevOps-Pipeline-Monitoring stack pattern",
  icon: "🐘",
  type: "kubernetes",
  relatedTools: ["kubernetes", "php", "mysql", "jenkins", "grafana"],
  files: [
    {
      filename: "frontend.yaml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
  namespace: laravel-app
  labels:
    app: apache
spec:
  replicas: 3
  selector:
    matchLabels:
      app: apache
  template:
    metadata:
      labels:
        app: apache
    spec:
      containers:
        - name: apache
          image: your-registry/laravel-app:latest
          ports:
            - containerPort: 80
          securityContext:
            allowPrivilegeEscalation: false
---
apiVersion: v1
kind: Service
metadata:
  name: front-service
  namespace: laravel-app
spec:
  type: LoadBalancer
  selector:
    app: apache
  ports:
    - port: 80
      targetPort: 80`,
    },
    {
      filename: "db.yaml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: dbserver
  namespace: laravel-app
  labels:
    app: db
spec:
  replicas: 1
  selector:
    matchLabels:
      app: db
  template:
    metadata:
      labels:
        app: db
    spec:
      containers:
        - name: db
          image: mysql:5.7
          env:
            - name: MYSQL_ALLOW_EMPTY_PASSWORD
              value: "1"
            - name: MYSQL_DATABASE
              value: laravel-db
          ports:
            - containerPort: 3306
          securityContext:
            allowPrivilegeEscalation: false
---
apiVersion: v1
kind: Service
metadata:
  name: db-service
  namespace: laravel-app
spec:
  selector:
    app: db
  ports:
    - port: 3306
      targetPort: 3306`,
    },
    {
      filename: "phpmyadmin.yaml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: phpmyadmin
  namespace: laravel-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: phpmyadmin
  template:
    metadata:
      labels:
        app: phpmyadmin
    spec:
      containers:
        - name: phpmyadmin
          image: phpmyadmin:latest
          env:
            - name: PMA_HOST
              value: db-service
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: phpmyadmin-service
  namespace: laravel-app
spec:
  type: LoadBalancer
  selector:
    app: phpmyadmin
  ports:
    - port: 80
      targetPort: 80`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy Laravel Stack",
    steps: [
      {
        title: "(01) Apply all manifests",
        commands: {
          linux: `kubectl create namespace laravel-app
kubectl apply -f db.yaml
kubectl apply -f frontend.yaml
kubectl apply -f phpmyadmin.yaml
kubectl -n laravel-app get pods,svc`,
          mac: "kubectl apply -f .\nkubectl -n laravel-app get pods",
          windows: "kubectl apply -f .",
        },
      },
    ],
  },
};

export const terraformAwsEc2: DeploymentRecipe = {
  slug: "terraform-aws-ec2",
  name: "Terraform AWS EC2 (Ubuntu)",
  description: "Provision a Ubuntu EC2 instance with security group — Simple-Project pattern",
  icon: "🖥️",
  type: "dockerfile",
  relatedTools: ["terraform", "aws-cli"],
  files: [
    {
      filename: "main.tf",
      content: `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_security_group" "ubuntu_sg" {
  name        = "ubuntu-sg"
  description = "Allow SSH and HTTP"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ubuntu" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = var.key_name
  vpc_security_group_ids = [aws_security_group.ubuntu_sg.id]

  tags = {
    Name = "Ubuntu-EC2"
  }
}`,
    },
    {
      filename: "variables.tf",
      content: `variable "aws_region" {
  default = "us-east-1"
}

variable "ami" {
  description = "Ubuntu AMI ID for your region"
  default     = "ami-0c7217cdde317cfec"  # Ubuntu 22.04 us-east-1 — update for your region
}

variable "instance_type" {
  default = "t2.medium"
}

variable "key_name" {
  description = "Existing EC2 key pair name"
}`,
    },
    {
      filename: "outputs.tf",
      content: `output "instance_public_ip" {
  value = aws_instance.ubuntu.public_ip
}

output "instance_id" {
  value = aws_instance.ubuntu.id
}`,
    },
  ],
  apply: {
    id: "apply",
    title: "Provision EC2",
    steps: [
      {
        title: "(01) Initialize and apply",
        commands: {
          linux: `terraform init
terraform plan
terraform apply -auto-approve
terraform output instance_public_ip
ssh -i ~/.ssh/mykey.pem ubuntu@$(terraform output -raw instance_public_ip)`,
          mac: "terraform init && terraform apply",
          windows: "terraform init\nterraform apply",
        },
      },
      {
        title: "(02) Destroy when done",
        commands: {
          linux: "terraform destroy -auto-approve",
          mac: "terraform destroy",
          windows: "terraform destroy",
        },
      },
    ],
  },
};

export const jenkinsPhpLaravel: DeploymentRecipe = {
  slug: "jenkins-php-laravel",
  name: "Jenkins PHP/Laravel Pipeline",
  description: "Docker login, Ansible build, and docker-compose deploy for Laravel — Pipeline-PHP pattern",
  icon: "🐘",
  type: "dockerfile",
  relatedTools: ["jenkins", "php", "docker", "ansible"],
  files: [
    {
      filename: "Jenkinsfile",
      content: `pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Build & Push Image') {
            steps {
                sh """
                cd laravel-app
                docker build -t \$DOCKERHUB_CREDENTIALS_USR/laravel-app:latest .
                docker push \$DOCKERHUB_CREDENTIALS_USR/laravel-app:latest
                """
            }
        }
        stage('Deploy with Compose') {
            steps {
                sh """
                cd laravel-app
                docker compose pull
                docker compose up -d
                docker compose ps
                """
            }
        }
    }
}`,
    },
    {
      filename: "laravel-app/docker-compose.yml",
      content: `services:
  app:
    image: youruser/laravel-app:latest
    ports:
      - "8080:80"
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_DATABASE: laravel
      DB_USERNAME: root
      DB_PASSWORD: secret

  db:
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: laravel
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:`,
    },
  ],
  apply: {
    id: "apply",
    title: "Run Jenkins Pipeline",
    steps: [
      {
        title: "(01) Configure Jenkins",
        commands: {
          linux: `# Add Docker Hub credentials (ID: dockerhub) in Jenkins
# Install Docker + docker-compose on Jenkins agent
# Create Pipeline job pointing to Jenkinsfile`,
          mac: "# Same Jenkins setup",
          windows: "# Same Jenkins setup",
        },
      },
    ],
  },
};
