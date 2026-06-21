import type { DeploymentRecipe } from "../types";

export const k8sClusterIP: DeploymentRecipe = {
  slug: "k8s-clusterip",
  name: "ClusterIP Service",
  description: "Internal-only Service — pods talk to each other inside the cluster without exposing ports publicly",
  icon: "🔗",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl"],
  files: [
    {
      filename: "deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deploy
  labels:
    app: api-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api-deploy
  template:
    metadata:
      labels:
        app: api-deploy
    spec:
      containers:
        - name: api
          image: nginx:alpine
          ports:
            - containerPort: 80`,
    },
    {
      filename: "service-clusterip.yml",
      description: "ClusterIP — reachable only inside the cluster (default Service type)",
      content: `apiVersion: v1
kind: Service
metadata:
  name: api-clusterip
  labels:
    app: api-deploy
spec:
  type: ClusterIP
  selector:
    app: api-deploy
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP`,
    },
  ],
  apply: {
    id: "apply",
    title: "Apply ClusterIP Service",
    steps: [
      {
        title: "(01) Deploy and verify internal DNS",
        commands: {
          linux: `kubectl apply -f deployment.yml
kubectl apply -f service-clusterip.yml
kubectl get svc api-clusterip
# Test from another pod:
kubectl run curl --rm -it --image=curlimages/curl -- curl -s http://api-clusterip`,
          mac: `kubectl apply -f deployment.yml
kubectl apply -f service-clusterip.yml
kubectl get svc`,
          windows: `kubectl apply -f deployment.yml
kubectl apply -f service-clusterip.yml
kubectl get svc`,
        },
      },
    ],
  },
};

export const k8sPvc: DeploymentRecipe = {
  slug: "k8s-pvc",
  name: "PersistentVolumeClaim (PVC)",
  description: "Persistent storage for pods — data survives pod restarts (StatefulSet + PVC pattern)",
  icon: "💾",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl"],
  files: [
    {
      filename: "pvc.yml",
      content: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: standard`,
    },
    {
      filename: "statefulset.yml",
      description: "StatefulSet mounting the PVC at /data",
      content: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: app-with-storage
spec:
  serviceName: app-svc
  replicas: 1
  selector:
    matchLabels:
      app: app-with-storage
  template:
    metadata:
      labels:
        app: app-with-storage
    spec:
      containers:
        - name: app
          image: nginx:alpine
          ports:
            - containerPort: 80
          volumeMounts:
            - name: data
              mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: data-pvc`,
    },
  ],
  apply: {
    id: "apply",
    title: "Apply PVC + StatefulSet",
    steps: [
      {
        title: "(01) Create PVC then StatefulSet",
        commands: {
          linux: `kubectl apply -f pvc.yml
kubectl get pvc
kubectl apply -f statefulset.yml
kubectl get pods,pvc
kubectl exec app-with-storage-0 -- ls /data`,
          mac: `kubectl apply -f pvc.yml
kubectl apply -f statefulset.yml
kubectl get pvc,pods`,
          windows: `kubectl apply -f pvc.yml
kubectl apply -f statefulset.yml
kubectl get pvc,pods`,
        },
      },
    ],
  },
};

export const k8sMicroservicesSpring: DeploymentRecipe = {
  slug: "k8s-microservices-spring",
  name: "Spring Microservices on K8s",
  description: "Two Spring Boot services with Deployments, ClusterIP Services, and resource limits",
  icon: "☕",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "maven"],
  files: [
    {
      filename: "service-a-deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: service-a
spec:
  replicas: 1
  selector:
    matchLabels:
      app: service-a
  template:
    metadata:
      labels:
        app: service-a
    spec:
      containers:
        - name: service-a
          image: spring-api-a:local
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"`,
    },
    {
      filename: "service-a-svc.yml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: service-a
spec:
  type: ClusterIP
  selector:
    app: service-a
  ports:
    - port: 8080
      targetPort: 8080`,
    },
    {
      filename: "service-b-deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: service-b
spec:
  replicas: 1
  selector:
    matchLabels:
      app: service-b
  template:
    metadata:
      labels:
        app: service-b
    spec:
      containers:
        - name: service-b
          image: spring-api-b:local
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
          env:
            - name: SERVICE_A_URL
              value: "http://service-a:8080"
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"`,
    },
    {
      filename: "service-b-svc.yml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: service-b
spec:
  type: NodePort
  selector:
    app: service-b
  ports:
    - port: 8080
      targetPort: 8080
      nodePort: 32080`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy Spring Microservices",
    steps: [
      {
        title: "(01) Build and load images",
        commands: {
          linux: `# Build Spring JARs, then Docker images
docker build -t spring-api-a:local ./service-a
docker build -t spring-api-b:local ./service-b
minikube image load spring-api-a:local
minikube image load spring-api-b:local`,
          mac: `docker build -t spring-api-a:local ./service-a
minikube image load spring-api-a:local`,
          windows: `docker build -t spring-api-a:local ./service-a
minikube image load spring-api-a:local`,
        },
      },
      {
        title: "(02) Apply all manifests",
        commands: {
          linux: `kubectl apply -f service-a-deployment.yml
kubectl apply -f service-a-svc.yml
kubectl apply -f service-b-deployment.yml
kubectl apply -f service-b-svc.yml
kubectl get pods,svc`,
          mac: `kubectl apply -f .
kubectl get pods,svc`,
          windows: `kubectl apply -f .
kubectl get pods,svc`,
        },
      },
    ],
  },
};

export const k8sMicroservicesNode: DeploymentRecipe = {
  slug: "k8s-microservices-node",
  name: "Node.js Microservices on K8s",
  description: "Node API gateway + worker Deployments with ConfigMap env and internal service DNS",
  icon: "🟢",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "docker"],
  files: [
    {
      filename: "configmap.yml",
      content: `apiVersion: v1
kind: ConfigMap
metadata:
  name: node-api-config
data:
  NODE_ENV: "production"
  WORKER_URL: "http://worker-svc:4000"`,
    },
    {
      filename: "gateway-deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: gateway
spec:
  replicas: 2
  selector:
    matchLabels:
      app: gateway
  template:
    metadata:
      labels:
        app: gateway
    spec:
      containers:
        - name: gateway
          image: node-gateway:local
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: node-api-config
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "250m"`,
    },
    {
      filename: "gateway-svc.yml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: gateway-svc
spec:
  type: NodePort
  selector:
    app: gateway
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 32300`,
    },
    {
      filename: "worker-deployment.yml",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: worker
spec:
  replicas: 1
  selector:
    matchLabels:
      app: worker
  template:
    metadata:
      labels:
        app: worker
    spec:
      containers:
        - name: worker
          image: node-worker:local
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 4000
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"`,
    },
    {
      filename: "worker-svc.yml",
      content: `apiVersion: v1
kind: Service
metadata:
  name: worker-svc
spec:
  type: ClusterIP
  selector:
    app: worker
  ports:
    - port: 4000
      targetPort: 4000`,
    },
  ],
  apply: {
    id: "apply",
    title: "Deploy Node Microservices",
    steps: [
      {
        title: "(01) Build and load images",
        commands: {
          linux: `docker build -t node-gateway:local ./gateway
docker build -t node-worker:local ./worker
minikube image load node-gateway:local
minikube image load node-worker:local`,
          mac: `docker build -t node-gateway:local ./gateway
minikube image load node-gateway:local`,
          windows: `docker build -t node-gateway:local ./gateway
minikube image load node-gateway:local`,
        },
      },
      {
        title: "(02) Apply manifests",
        commands: {
          linux: `kubectl apply -f configmap.yml
kubectl apply -f gateway-deployment.yml
kubectl apply -f gateway-svc.yml
kubectl apply -f worker-deployment.yml
kubectl apply -f worker-svc.yml
kubectl get pods,svc`,
          mac: `kubectl apply -f .
kubectl get pods,svc`,
          windows: `kubectl apply -f .
kubectl get pods,svc`,
        },
      },
    ],
  },
};

export const githubActionsCi: DeploymentRecipe = {
  slug: "github-actions-ci",
  name: "GitHub Actions CI Pipeline",
  description: "Build, test, and Docker push workflow — the YAML IT teams bookmark for Node and Java projects",
  icon: "⚡",
  type: "dockerfile",
  relatedTools: ["github-actions", "docker", "jenkins"],
  files: [
    {
      filename: ".github/workflows/ci.yml",
      description: "Node.js — install, test, build Docker image, push to registry",
      content: `name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build Docker image
        run: docker build -t \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }} .

      - name: Log in to GitHub Container Registry
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Push image
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: docker push \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}`,
    },
    {
      filename: ".github/workflows/java-ci.yml",
      description: "Spring Boot / Maven — compile, test, package JAR",
      content: `name: Java CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: "21"
          distribution: "temurin"
          cache: maven

      - name: Build and test
        run: mvn -B verify

      - name: Upload JAR artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-jar
          path: target/*.jar`,
    },
  ],
  apply: {
    id: "apply",
    title: "Use the Workflow",
    steps: [
      {
        title: "(01) Add workflow to your repo",
        commands: {
          linux: `mkdir -p .github/workflows
cp ci.yml .github/workflows/ci.yml
git add .github/workflows/
git commit -m "Add CI pipeline"
git push origin main
# View runs: GitHub → Actions tab`,
          mac: `mkdir -p .github/workflows
cp ci.yml .github/workflows/ci.yml
git add .github/workflows/ && git commit -m "Add CI" && git push`,
          windows: `mkdir .github\\workflows
copy ci.yml .github\\workflows\\ci.yml
git add .github/workflows/
git commit -m "Add CI pipeline"
git push`,
        },
      },
      {
        title: "(02) Add secrets (for registry push)",
        commands: {
          linux: `# GitHub repo → Settings → Secrets and variables → Actions
# GITHUB_TOKEN is automatic; add DOCKERHUB_TOKEN if pushing to Docker Hub`,
          mac: "# GitHub → Settings → Secrets → Actions",
          windows: "# GitHub → Settings → Secrets → Actions",
        },
      },
    ],
  },
};

export const k8sPodDisruptionBudget: DeploymentRecipe = {
  slug: "k8s-pod-disruption-budget",
  name: "Pod Disruption Budget (PDB)",
  description: "Keep minimum pods available during node drains and cluster upgrades",
  icon: "🛡️",
  type: "kubernetes",
  relatedTools: ["kubernetes", "kubectl", "helm"],
  files: [
    {
      filename: "pdb.yml",
      description: "PDB for Deployment — at least 1 pod available during voluntary disruptions",
      content: `apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp-pdb
  namespace: apps
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: myapp
---
# Alternative: maxUnavailable for large fleets
# spec:
#   maxUnavailable: 1
#   selector:
#     matchLabels:
#       app: myapp`,
    },
    {
      filename: "deployment-with-labels.yml",
      description: "Deployment labels must match PDB selector",
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: apps
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: app
          image: myapp:latest
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30`,
    },
  ],
  apply: {
    id: "apply",
    title: "Apply PDB",
    steps: [
      {
        title: "(01) Apply manifests",
        commands: {
          linux: `kubectl apply -f deployment-with-labels.yml\nkubectl apply -f pdb.yml\nkubectl get pdb -n apps\nkubectl describe pdb myapp-pdb -n apps`,
          mac: `kubectl apply -f .\nkubectl get pdb -n apps`,
          windows: `kubectl apply -f .\nkubectl get pdb -n apps`,
        },
      },
      {
        title: "(02) Test drain respects PDB",
        commands: {
          linux: `# voluntary disruption — should respect minAvailable\nkubectl drain <node> --ignore-daemonsets --delete-emptydir-data\n# undo: kubectl uncordon <node>`,
          mac: "kubectl drain <node> --ignore-daemonsets",
          windows: "kubectl drain <node> --ignore-daemonsets",
        },
      },
    ],
  },
};
