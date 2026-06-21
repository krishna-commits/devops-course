import type { DeploymentRecipe } from "../types";

export const flaskPostgresCompose: DeploymentRecipe = {
  slug: "flask-postgres-compose",
  name: "Flask + PostgreSQL",
  description: "Two-service compose stack — Flask API with PostgreSQL database (mid-point project pattern)",
  icon: "🐍",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose"],
  files: [
    {
      filename: "docker-compose.yaml",
      description: "PostgreSQL database + Flask app with env file and volume persistence",
      content: `version: "3.9"

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: dukaan_db
      POSTGRES_USER: dukaan
      POSTGRES_PASSWORD: dukaan123
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "5000:5000"
    env_file:
      - .env
    depends_on:
      - db

volumes:
  pgdata:`,
    },
    {
      filename: "Dockerfile",
      description: "Flask application container image",
      content: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]`,
    },
  ],
  apply: {
    id: "apply",
    title: "Run with Docker Compose",
    steps: [
      {
        title: "(01) Build and start services",
        commands: {
          linux: `cd your-project/
docker compose up -d --build
docker compose ps
docker compose logs -f app`,
          mac: `cd your-project/
docker compose up -d --build
docker compose ps`,
          windows: `cd your-project/
docker compose up -d --build
docker compose ps`,
        },
      },
      {
        title: "(02) Stop and clean up",
        commands: {
          linux: "docker compose down\ndocker compose down -v  # remove volumes",
          mac: "docker compose down",
          windows: "docker compose down",
        },
      },
    ],
  },
};

export const dockerNetworkCompose: DeploymentRecipe = {
  slug: "docker-network-compose",
  name: "Multi-Network Services",
  description: "Three services across two Docker networks — internal DNS and network isolation demo",
  icon: "🌐",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose"],
  files: [
    {
      filename: "docker-compose.yml",
      description: "api-service (exposed), ping-service (internal only), isolated-service (separate network)",
      content: `services:
  api-service:
    build: ./api-service
    container_name: api-service
    ports:
      - "3000:3000"
    networks:
      - app-network

  ping-service:
    build: ./ping-service
    container_name: ping-service
    networks:
      - app-network

  isolated-service:
    build: ./ping-service
    container_name: isolated-service
    ports:
      - "5000:4000"
    networks:
      - isolated-network

networks:
  app-network:
    driver: bridge
    name: app-network
  isolated-network:
    driver: bridge
    name: isolated-network`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy Network Demo",
    steps: [
      {
        title: "(01) Start all services",
        commands: {
          linux: `docker compose up -d --build
curl http://localhost:3000/ping   # api → ping-service via internal DNS
curl http://localhost:5000        # isolated service only`,
          mac: `docker compose up -d --build
curl http://localhost:3000/ping`,
          windows: `docker compose up -d --build
curl http://localhost:3000/ping`,
        },
      },
    ],
  },
};

export const microservicesCompose: DeploymentRecipe = {
  slug: "microservices-compose",
  name: "URL Shortener Microservices",
  description: "Postgres + RabbitMQ + gateway + workers with healthchecks and depends_on conditions",
  icon: "🔗",
  type: "docker-compose",
  relatedTools: ["docker", "docker-compose"],
  files: [
    {
      filename: "docker-compose.yml",
      description: "Full microservices stack with healthchecks, volumes, and internal service DNS",
      content: `version: "3.9"

services:
  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=urlshortener
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 20

  rabbitmq:
    image: rabbitmq:3.12-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "ping"]
      interval: 10s
      timeout: 10s
      retries: 10

  gateway:
    build: ./gateway
    ports:
      - "3002:3000"
    environment:
      PG_HOST: postgres
      PG_DB: urlshortener
      PG_USER: postgres
      PG_PASSWORD: postgres
      RABBIT_URL: amqp://guest:guest@rabbitmq:5672
      BASE_URL: http://localhost:3002
    depends_on:
      postgres:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy

  cache-worker:
    build: ./cache-worker
    environment:
      RABBIT_URL: amqp://guest:guest@rabbitmq:5672
    depends_on:
      rabbitmq:
        condition: service_healthy

  analytics-worker:
    build: ./analytics-worker
    environment:
      PG_HOST: postgres
      PG_DB: urlshortener
      PG_USER: postgres
      PG_PASSWORD: postgres
      RABBIT_URL: amqp://guest:guest@rabbitmq:5672
    depends_on:
      postgres:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy

volumes:
  pg_data:`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy Microservices Stack",
    steps: [
      {
        title: "(01) Start the full stack",
        commands: {
          linux: `docker compose up -d --build
docker compose ps
# RabbitMQ UI: http://localhost:15672 (guest/guest)
# API gateway: http://localhost:3002`,
          mac: `docker compose up -d --build
open http://localhost:15672`,
          windows: `docker compose up -d --build
Start-Process http://localhost:15672`,
        },
      },
    ],
  },
};

export const k8sDeploymentService: DeploymentRecipe = {
  slug: "k8s-deployment-service",
  name: "API Deployment + NodePort Service",
  description: "Deploy a local Docker image to Kubernetes with resource limits and NodePort access",
  icon: "☸️",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "docker"],
  files: [
    {
      filename: "deployment.yml",
      description: "Deployment with resource requests/limits and local image",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: api-deploy
  name: api-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: api-deploy
  template:
    metadata:
      labels:
        app: api-deploy
    spec:
      containers:
        - image: api:local
          name: api
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 3000
          resources:
            limits:
              memory: "512Mi"
              cpu: "500m"
            requests:
              memory: "256Mi"
              cpu: "250m"`,
    },
    {
      filename: "services.yml",
      description: "NodePort Service exposing the API on port 32000",
      content: `apiVersion: v1
kind: Service
metadata:
  labels:
    app: api-deploy
  name: api-deploy-service
spec:
  type: NodePort
  selector:
    app: api-deploy
  ports:
    - port: 3000
      protocol: TCP
      targetPort: 3000
      nodePort: 32000`,
    },
  ],
  apply: {
    id: "apply",
    title: "Apply to Kubernetes",
    steps: [
      {
        title: "(01) Build image and load into cluster",
        commands: {
          linux: `# Build local image
docker build -t api:local .

# For Minikube / Kind — load image into cluster
minikube image load api:local
# OR: kind load docker-image api:local`,
          mac: `docker build -t api:local .
minikube image load api:local`,
          windows: `docker build -t api:local .
minikube image load api:local`,
        },
      },
      {
        title: "(02) Apply manifests",
        commands: {
          linux: `kubectl apply -f deployment.yml
kubectl apply -f services.yml
kubectl get pods,svc
curl http://localhost:32000  # or minikube service api-deploy-service`,
          mac: `kubectl apply -f deployment.yml
kubectl apply -f services.yml
kubectl get pods,svc`,
          windows: `kubectl apply -f deployment.yml
kubectl apply -f services.yml
kubectl get pods,svc`,
        },
      },
    ],
  },
};

export const k8sConfigmapSecrets: DeploymentRecipe = {
  slug: "k8s-configmap-secrets",
  name: "ConfigMap & Secrets Deployment",
  description: "Inject environment variables from ConfigMap and Secret into a Deployment",
  icon: "🔐",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl"],
  files: [
    {
      filename: "ConfigMap.yml",
      content: `apiVersion: v1
kind: ConfigMap
metadata:
  name: node-demo-config
data:
  NORMAL_ENV_VALUE: "hello-from-configmap"`,
    },
    {
      filename: "Secrets.yml",
      content: `apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
stringData:
  SECRET_ENV_VALUE: "super-secret-value"`,
    },
    {
      filename: "Deployment.yml",
      description: "Deployment referencing ConfigMap and Secret via env valueFrom",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deploy-demo-secrets-config
  labels:
    app: api-deploy-demo-secrets-config
spec:
  replicas: 1
  selector:
    matchLabels:
      app: api-deploy-demo-secrets-config
  template:
    metadata:
      labels:
        app: api-deploy-demo-secrets-config
    spec:
      containers:
        - name: api-demo-cms
          image: api-demo-cms:local
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 3000
          env:
            - name: SECRET_ENV_VALUE
              valueFrom:
                secretKeyRef:
                  name: mysecret
                  key: SECRET_ENV_VALUE
            - name: NORMAL_ENV_VALUE
              valueFrom:
                configMapKeyRef:
                  name: node-demo-config
                  key: NORMAL_ENV_VALUE
          resources:
            limits:
              memory: "512Mi"
              cpu: "500m"
            requests:
              memory: "256Mi"
              cpu: "250m"`,
    },
    {
      filename: "Services.yml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: api-demo-service
spec:
  type: NodePort
  selector:
    app: api-deploy-demo-secrets-config
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 32001`,
    },
  ],
  apply: {
    id: "apply",
    title: "Apply ConfigMap & Secrets",
    steps: [
      {
        title: "(01) Create ConfigMap and Secret first",
        commands: {
          linux: `kubectl apply -f ConfigMap.yml
kubectl apply -f Secrets.yml
kubectl apply -f Deployment.yml
kubectl apply -f Services.yml
kubectl get configmap,secret,pods`,
          mac: `kubectl apply -f ConfigMap.yml
kubectl apply -f Secrets.yml
kubectl apply -f Deployment.yml
kubectl apply -f Services.yml`,
          windows: `kubectl apply -f ConfigMap.yml
kubectl apply -f Secrets.yml
kubectl apply -f Deployment.yml
kubectl apply -f Services.yml`,
        },
      },
      {
        title: "(02) Verify env vars inside pod",
        commands: {
          linux: `kubectl exec -it deploy/api-deploy-demo-secrets-config -- env | grep ENV_VALUE`,
          mac: `kubectl exec -it deploy/api-deploy-demo-secrets-config -- env | grep ENV_VALUE`,
          windows: `kubectl exec -it deploy/api-deploy-demo-secrets-config -- env | findstr ENV_VALUE`,
        },
      },
    ],
  },
};

export const k8sHpa: DeploymentRecipe = {
  slug: "k8s-hpa",
  name: "Horizontal Pod Autoscaler",
  description: "Auto-scale Deployments based on CPU utilization (1–3 replicas at 50% CPU)",
  icon: "📈",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl"],
  files: [
    {
      filename: "hpa.yml",
      description: "HPA for two microservices — scales on CPU averageUtilization 50%",
      content: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-springapi-svc-a
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: service-a
  minReplicas: 1
  maxReplicas: 3
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-springapi-svc-b
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: service-b
  minReplicas: 1
  maxReplicas: 3
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50`,
    },
  ],
  apply: {
    id: "apply",
    title: "Enable HPA",
    steps: [
      {
        title: "(01) Install metrics-server (required for CPU metrics)",
        commands: {
          linux: `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl get deployment metrics-server -n kube-system`,
          mac: `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml`,
          windows: `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml`,
        },
      },
      {
        title: "(02) Apply HPA and monitor scaling",
        commands: {
          linux: `kubectl apply -f hpa.yml
kubectl get hpa
kubectl describe hpa hpa-springapi-svc-a
watch kubectl get pods`,
          mac: `kubectl apply -f hpa.yml
kubectl get hpa`,
          windows: `kubectl apply -f hpa.yml
kubectl get hpa`,
        },
      },
    ],
  },
};

export const k8sIngress: DeploymentRecipe = {
  slug: "k8s-ingress",
  name: "Ingress (NGINX)",
  description: "Route external HTTP traffic to cluster Services via Ingress controller",
  icon: "🚪",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "helm"],
  files: [
    {
      filename: "Ingress.yml",
      content: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minimal-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - http:
        paths:
          - path: /testpath
            pathType: Prefix
            backend:
              service:
                name: test
                port:
                  number: 80`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy Ingress",
    steps: [
      {
        title: "(01) Install NGINX Ingress Controller",
        commands: {
          linux: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s`,
          mac: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml`,
          windows: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml`,
        },
      },
      {
        title: "(02) Apply Ingress resource",
        commands: {
          linux: `kubectl apply -f Ingress.yml
kubectl get ingress
kubectl describe ingress minimal-ingress`,
          mac: `kubectl apply -f Ingress.yml
kubectl get ingress`,
          windows: `kubectl apply -f Ingress.yml
kubectl get ingress`,
        },
      },
    ],
  },
};

export const dockerfileTemplates: DeploymentRecipe = {
  slug: "dockerfile-templates",
  name: "Dockerfile Templates",
  description: "Production-ready Dockerfile patterns for Python, Node.js, and multi-stage builds",
  icon: "📄",
  type: "dockerfile",
  relatedTools: ["docker"],
  files: [
    {
      filename: "Dockerfile.python",
      description: "Flask / FastAPI Python API",
      content: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 3000
# Dev: CMD ["python", "main.py"]
# Prod: CMD ["gunicorn", "-b", "0.0.0.0:3000", "main:app"]`,
    },
    {
      filename: "Dockerfile.node",
      description: "Node.js API with dependency caching",
      content: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
USER node
CMD ["node", "src/index.js"]`,
    },
    {
      filename: "Dockerfile.spring",
      description: "Spring Boot JAR (multi-stage)",
      content: `FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    },
  ],
  apply: {
    id: "apply",
    title: "Build Images",
    steps: [
      {
        title: "(01) Build from Dockerfile",
        commands: {
          linux: `docker build -t myapp:1.0 -f Dockerfile.python .
docker build -t myapi:local .
docker images | grep myapp`,
          mac: `docker build -t myapp:1.0 -f Dockerfile.python .
docker images | grep myapp`,
          windows: `docker build -t myapp:1.0 -f Dockerfile.python .
docker images`,
        },
      },
    ],
  },
};
