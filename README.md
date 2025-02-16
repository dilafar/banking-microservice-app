# Complete CI/CD pipelines for a Bank Management System, a dynamic web application built with a microservices architecture using Spring Cloud.

## Overview

This project is a full-stack, microservices-based system developed using **Spring Boot** for the backend and **React** for the frontend. It follows **DevSecOps** principles and is deployed on **AWS** using Kubernetes. The Spring Boot Microservice Banking Application manages accounts, cards, and loans through a web-based platform built on a microservices architecture. It adheres to Spring Cloud best practices, including Netflix Eureka for service discovery, Spring Cloud Config for centralized configuration, and Spring Cloud Gateway for API management.

## 🛠 Technologies Used

### Backend

- **Spring Boot** (REST API)
- **MySQL** (AWS RDS)
- **Maven** (Build tool)

### Frontend

- **React** (UI Framework)

### DevOps Tools

#### 🔹 **CI/CD & Configuration Management**
- Jenkins
- Ansible
- GitHub
- GitHub Actions
- Chart Releaser

#### 🔹 **Containerization & Orchestration**
- Kubernetes
- Helm
- Kustomize
- Docker
- Docker Compose

#### 🔹 **Security & Compliance**
- Checkstyle & NodeJsScan (Code Quality Analysis)
- SonarQube (SAST Scanning)
- Trivy (Vulnerability Scanning & CIS Benchmark for Docker)
- Hadolint (Dockerfile Linting)
- Maven Dependency Check
- OWASP ZAP (DAST Scanning)
- Open Policy Agent (OPA) (Policy Enforcement)
- Let's Encrypt ACME & Cert Manager (Automated TLS Certificate Management)
- Jacoco (Code Coverage Analysis)

#### 🔹 **Artifact & Dependency Management**
- AWS S3 Bucket
- Maven
- ArtifactHub

#### 🔹 **Monitoring & Alerting**
- Prometheus
- Grafana
- Alert Manager

#### 🔹 **Infrastructure as Code (IaC)**
- Terraform

#### 🔹 **Continuous Deployment & GitOps**
- ArgoCD

#### 🔹 **Service Mesh**
- Istio Service Mesh

### Azure Services Used

- **Networking & Load Balancing**: Public IP Address , Azure LoadBalancer, Azure DNS, Azure Virtual Network
- **Compute & Container Management**: AKS, Azure VM
- **Storage & Secrets Management**: Azure Key Vault, Azure MySQL Database
- **Container Registry & CDN**: Azure Container Registry, Azure CloudFront

### Nginx Ingress Controller Installation
#### To install the Nginx Ingress Controller:

### 1. Retrieve Node Resource Group
To get the node resource group for your AKS cluster, run:
```sh
az aks show --resource-group aks-rg1 --name aksdemo1 --query nodeResourceGroup -o tsv
```
### 2. Create a Public IP Address for Ingress Controller
Create a static public IP address for the ingress controller:
```sh
az network public-ip create --resource-group MC_aks-rg_aks-demo_eastus --name AKSPublicIPForIngress --sku Standard --allocation-method static --query publicIp.ipAddress -o tsv
```
### 3. Install NGINX Ingress Controller
1. Create a namespace for the ingress controller:
   ```sh
   kubectl create namespace ingress-controller
   ```
2. Add the official stable repository and update Helm charts:
   ```sh
   helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
   helm repo update
   ```
3. Install the ingress controller using Helm:
   ```sh
   helm install ingress-nginx ingress-nginx/ingress-nginx \
     --namespace ingress-controller \
     --set controller.replicaCount=2 \
     --set controller.nodeSelector."kubernetes\.io/os"=linux \
     --set defaultBackend.nodeSelector."kubernetes\.io/os"=linux \
     --set controller.service.externalTrafficPolicy=Local \
     --set controller.service.loadBalancerIP="172.191.40.85"
   ```

### Domain & DNS Management

- **Azure Tenant ID**: Retrieve using `az account show --query "tenantId"`
- **Azure Subscription ID**: Retrieve using `az account show --query "id"`
- The `azure.json` file contains authentication details for External DNS to interact with Azure DNS. It includes:
   - **Tenant ID**
   - **Subscription ID**
   - **Resource Group containing DNS zones**
   - **User Assigned Managed Identity ID**
   ```json
   {
     "tenantId": "<your-tenant-id>",
     "subscriptionId": "<your-subscription-id>",
     "resourceGroup": "dns-zones", 
     "useManagedIdentityExtension": true,
     "userAssignedIdentityID": "<your-msi-id>"  
   }
   ```
- The `external-dns.yml` file contains Kubernetes resources required for deploying ExternalDNS:
   - **ServiceAccount**: Defines access permissions.
   - **ClusterRole & ClusterRoleBinding**: Grants necessary RBAC permissions.
   - **Deployment**: Deploys External DNS with the correct provider settings for Azure.
- Create Managed Service Identity (MSI) for External DNS
- Assign Azure Role to MSI
   - **Role**: `Contributor`
- Take **Client ID** from the MSI **Overview** tab and update `azure.json` under `userAssignedIdentityID`.
- Associate MSI with AKS Cluster Virtual Machine Scale Sets (VMSS)
- Create Kubernetes Secret for the `azure.json` file and Deploy ExternalDNS

### Setting Up Azure Key Vault with External Secrets on AKS

- Before setting up External Secrets, collect the necessary details:
   - **Azure Tenant ID**: Retrieve using `az account show --query "tenantId"`
   - **Azure Subscription ID**: Retrieve using `az account show --query "id"`
- Add the External Secrets Helm chart repository and install it in your AKS cluster to manage secrets.
   ```sh
   helm repo add external-secrets https://charts.external-secrets.io
   helm install external-secrets external-secrets/external-secrets --namespace external-secrets --create-namespace --set installCRDs=true
   ```
- Create an Azure Key Vault to securely store your secrets.
   ```sh
   az keyvault create --resource-group aks-rg --name keyvault-aks-db
   ```
- Add a secret, for example, a database password, to your Key Vault.
   ```sh
   az keyvault secret set --vault-name keyvault-aks-db --name "dbpassword" --value "<password>"
   ```
- Create a managed identity that will be used by AKS to access the Azure Key Vault.
   ```sh
   az identity create --name access-keyvault --resource-group aks-rg
   ```
- Assign the necessary permissions for the managed identity to access secrets in Azure Key Vault.
   ```sh
   export USER_ASSIGNED_IDENTITY_CLIENT_ID="$(az identity show --name access-keyvault --resource-group aks-rg --query 'clientId' -otsv)"
   export USER_ASSIGNED_IDENTITY_OBJECT_ID="$(az identity show --name access-keyvault --resource-group aks-rg --query 'principalId' -otsv)"
   az keyvault set-policy --name keyvault-aks-db --secret-permissions get --object-id "${USER_ASSIGNED_IDENTITY_OBJECT_ID}"
   ```
- Additionally, assign the `Key Vault Secrets Officer` role to the managed identity.
   ```sh
   az role assignment create --assignee "${USER_ASSIGNED_IDENTITY_OBJECT_ID}" --role "Key Vault Secrets Officer" --scope /subscriptions/<subscription-id>/resourceGroups/aks-rg/providers/Microsoft.KeyVault/vaults/keyvault-aks-db
   ```
- Create a Kubernetes service account for External Secrets with Azure Workload Identity annotations.
   ```yaml
   apiVersion: v1
   kind: ServiceAccount
   metadata:
     annotations:
       azure.workload.identity/client-id: ${USER_ASSIGNED_IDENTITY_CLIENT_ID}
       azure.workload.identity/tenant-id: ${TENANT_ID}
     name: external-secrets-sa
     namespace: external-secrets
   ```
- Replace `${USER_ASSIGNED_IDENTITY_CLIENT_ID}` and `${TENANT_ID}` with the correct values.
- Federate the Azure Managed Identity with your AKS cluster by creating a federated identity credential.
   ```sh
   export SERVICE_ACCOUNT_ISSUER="$(az aks show --resource-group aks-rg --name aks-demo --query 'oidcIssuerProfile.issuerUrl' -otsv)"
   az identity federated-credential create --name "kubernetes-federated-credential" --identity-name access-keyvault --resource-group aks-rg --issuer "${SERVICE_ACCOUNT_ISSUER}" --subject       "system:serviceaccount:external-secrets:external-secrets-sa"
   ```
- Create a `ClusterSecretStore` resource to configure External Secrets to fetch secrets from Azure Key Vault.
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: azure-secret-store
spec:
  provider:
    azurekv:
      authType: WorkloadIdentity
      vaultUrl: "https://keyvault-aks-db.vault.azure.net"
      serviceAccountRef:
        name: external-secrets-sa
        namespace: external-secrets
```
- Now, create an `ExternalSecret` resource to pull the secret from Azure Key Vault into Kubernetes.
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: mysql-db-password-secret
  namespace: employee
spec:
  refreshInterval: "1h"
  secretStoreRef:
    name: azure-secret-store
    kind: ClusterSecretStore
  target:
    name: mysql-db-password
    creationPolicy: Owner
  data:
  - secretKey: password
    remoteRef:
      key: secret/dbpassword
```

### Istio Installation on Azure AKS

- Add the official Istio Helm repository to your Helm configuration.  
- Update Helm repositories to fetch the latest charts.    
- Install the `istio-base` chart to create the necessary Istio Custom Resource Definitions (CRDs).  
- Install the Istio control plane (`istiod`) in the `istio-system` namespace.  
- This component handles service discovery, traffic routing, and security policies.  
- Install an Istio ingress gateway to manage incoming external traffic.  
- Configure it to use an Azure Load Balancer for handling requests.  
- Create a network security group that allows inbound HTTP (80) and HTTPS (443) traffic.  
- Attach this network security group to the subnet within the cluster's virtual network to enable external access.  
- Store `istio-cert.pem` and `istio-key.pem` in Azure Key Vault.  
- Fetch the certificate through External Secrets and configure Istio to allow HTTPS traffic from the gateway.  
- Configure Istio to enforce mTLS for secure service-to-service communication.  
- Ensure all services are using encrypted and authenticated connections within the mesh.  
- Deploy applications and configure Istio traffic rules (VirtualServices, DestinationRules).


![awsbanking](https://github.com/user-attachments/assets/0b4b7f43-bf8e-4e97-9bf8-9618370934a1)


## 🚀 Setup & Installation
### Starting services locally without Docker
Every microservice is a Spring Boot application and can be started locally using an IDE or the ../mvnw spring-boot:run command. Please note that the supporting services, Config Server and Eureka Server, must be started before any other applications. Additionally, the Gateway Server must be started before the Accounts, Loans, and Cards services.
If everything goes well, you can access the following services at given location:
* Eureka Server - http://localhost:8070
* Config Server - http://localhost:8071
* Gateway Server - http://localhost:8072
* Accounts Server - http://localhost:8080
* Cards Server - http://localhost:9000
* Loans Server - http://localhost:8090
* ReactJS(Vite) frontend - http://localhost:5173
### 1️⃣ Clone the Repository

```sh
git clone https://github.com/dilafar/anguler-springboot-aws-migration.git
cd anguler-springboot-aws-migration
```

### 2️⃣ Backend Microservices Setup (Spring Boot)

#### 🔹 Build & Run Locally

```sh
cd <microservice>
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Frontend Setup (ReactJS)

#### 🔹 Install Dependencies & Start

```sh
cd frontend
npm install
npm run dev
```

### Starting services locally with docker-compose

### 1️⃣ Start All Services

#### 🔹 Run the following command to start the application:

```sh
docker-compose up -d
```
The -d flag runs the services in detached mode.

![docker-compose-ms](https://github.com/user-attachments/assets/67449473-4041-4109-bc7c-914582d6c42d)


### 2️⃣ Verify Running Containers

#### 🔹 Check the status of running containers:

```sh
docker ps
```

### 3️⃣ Access the Application

```sh
Frontend (Client UI): https://localhost
```

### 4️⃣ Stop Services

#### 🔹 To stop all running containers:

```sh
docker-compose down
```

### 🔍 Additional Notes

- The MySQL container has a health check configured to ensure it is ready before the backend services start.
- Nginx serves as a reverse proxy to route traffic between services.
- The backend services depend on the MySQL service to be healthy before they can start.
- The frontend communicates via Nginx, which handles routing and SSL termination.




Application Diagram

![Frame 7](https://github.com/user-attachments/assets/ac11fde0-f234-463a-8649-9f45740f3950)

Architecture diagram

![Vulnarability Scanning](https://github.com/user-attachments/assets/784e0bac-4881-496d-851f-6e20fecdf7c0)

Cluster Diagram

![Frame 9](https://github.com/user-attachments/assets/26c7870e-d43f-4d2b-a860-ac234163e820)


## Database Configuration

### 🛠️ MySQL Configuration
If a persistent database is required, the application can be configured to use **MySQL**. The necessary **Connector/J (MySQL JDBC Driver)** dependency is already included in the `pom.xml` file.

### 🚀 Start a MySQL Database with Docker
You can start a MySQL database using **Docker** with the following command:

```sh
docker run -e MYSQL_ROOT_PASSWORD=petclinic \  
    -e MYSQL_DATABASE=petclinic \  
    -p 3306:3306 \  
    mysql:5.7.8
```

Alternatively, you can install **MySQL Community Server 5.7 GA** manually from the official [MySQL downloads page](https://dev.mysql.com/downloads/).

### 🔧 Configuring MySQL for Production
For **production deployment**, it is recommended to use **Azure MySql (Relational Database Service)** to ensure scalability and reliability.

### 1️⃣ Set Up an Azure MySql Database
- Create an **Azure MySql instance** with **MySQL** as the database engine.
- Configure **username, password, and host** details.

### 2️⃣ Update `application.yml` with Azure MySql Configuration
Modify the `application.yml` file to include the **Azure MySql** database configuration:

```yaml
spring:
  datasource:
    url: jdbc:mysql://<Azure_MySql_HOST>:3306/employeemanager
    username: <Azure_MySql_USERNAME>
    password: <Azure_MySql_PASSWORD>
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    database-platform: org.hibernate.dialect.MySQL8Dialect
    hibernate:
      ddl-auto: update
```

### 3️⃣ Start the Application
Run the application with the configured **AWS RDS** database:

```sh
mvn spring-boot:run
```

Now, the Employee Management application is connected to a persistent **AWS RDS MySQL database** and ready for production deployment. 🚀

## 🧾 Argocd App

![microservice](https://github.com/user-attachments/assets/98a148cb-f95f-450b-87f6-0b222eaa4c98)


## 🧾 Prometheus and Grafana

![prometheus-monitor](https://github.com/user-attachments/assets/7cf66bf7-4851-4eb1-91cb-0c6fef164a94)


## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📜 License

This project is licensed under the **MIT License**.
