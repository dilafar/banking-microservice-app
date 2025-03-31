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

#### 🔹 **Certificate Manager**
- Let's Encrypt

### 🏢 AWS Services Used

- **Networking & Load Balancing**: NLB(Network LoadBalancer), Route 53, AWS Certificate Manager, VPC
- **Compute & Container Management**: Amazon EKS, Amazon EC2
- **Storage & Secrets Management**: AWS Secrets Manager, AWS S3 Bucket
- **Container Registry & CDN**: Amazon ECR, Amazon CloudFront

### 🏢 AWS Load Balancer Controller Installation
#### To install the AWS Load Balancer Controller:

- An IAM policy was created to grant the necessary permissions.
- An IAM service account was created and linked to the policy.
- The AWS Load Balancer Controller was installed using Helm, utilizing the created service account.

### 🏢 Domain & DNS Management

- The domain was registered on Google Cloud and hosted on AWS Route 53.
- Kubernetes ExternalDNS was used to manage DNS records dynamically, ensuring a cloud-agnostic approach.
- To handle Route 53 access, an IAM policy and IAM service account were created, assigning the necessary IAM role to the Kubernetes service account.
- The ExternalDNS deployment was configured with the service account, allowing DNS record management through Kubernetes ingress or service resources.
- Since the application uses an Application Load Balancer (ALB), ExternalDNS manages DNS records via Kubernetes ingress resources.
- TLS certificates were provisioned using AWS Certificate Manager, ensuring secure HTTPS connections through Kubernetes ingress resources.

### 🏢 External Secrets Management with AWS

- AWS Secrets Manager is used to store and manage sensitive data such as API keys, database credentials, etc.
- Deploy the `ExternalSecrets` operator in Kubernetes to manage the synchronization of secrets from AWS Secrets Manager into Kubernetes Secrets.
- Create an IAM policy and role in AWS that provides the necessary permissions to access AWS Secrets Manager.
- Attach the policy to the IAM role.
- Associate the IAM role with a Kubernetes service account using AWS IAM Roles for Service Accounts (IRSA) to allow the external secrets operator to authenticate and fetch secrets from AWS.
- Configure the `ExternalSecrets` deployment to use the service account, enabling the automatic synchronization of secrets into Kubernetes secrets.
- The operator fetches secrets from AWS Secrets Manager and syncs them into Kubernetes namespaces, ensuring secure and seamless access to sensitive data.
- This setup enables cloud-agnostic secret management while securely integrating AWS Secrets Manager with Kubernetes.

### 🏢 Istio Installation on AWS EKS

- Add the official Istio Helm repository to your Helm configuration.  
- Update Helm repositories to fetch the latest charts.    
- Install the `istio-base` chart to create the necessary Istio Custom Resource Definitions (CRDs).  
- Install the Istio control plane (`istiod`) in the `istio-system` namespace.  
- This component handles service discovery, traffic routing, and security policies.  
- Install an Istio ingress gateway to manage incoming external traffic.  
- Configure it to use an AWS Network Load Balancer (NLB) for handling requests.  
- Create a security group that allows inbound HTTP (80) and HTTPS (443) traffic.  
- Attach this security group to the Istio ingress gateway for external access.  
- Store `istio-cert.pem` and `istio-key.pem` in AWS Secrets Manager.  
- Fetch the certificate through External Secrets and configure Istio to allow HTTPS traffic from the gateway.  
- Configure Istio to enforce mTLS for secure service-to-service communication.  
- Ensure all services are using encrypted and authenticated connections within the mesh.  
- Deploy applications and configure Istio traffic rules (VirtualServices, DestinationRules).


![awsbanking](https://github.com/user-attachments/assets/0b4b7f43-bf8e-4e97-9bf8-9618370934a1)


## 🚀 Setup & Installation
### 🏢 Starting services locally without Docker
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

### 🏢 Starting services locally with docker-compose

### 1️⃣ Start All Services

#### 🔹 Run the following command to start the application:

```sh
docker-compose up -d
```
The -d flag runs the services in detached mode.

![dc-1](https://github.com/user-attachments/assets/6323c716-398b-4f19-8a19-791b15c98c74)


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




## 🧾 Application Diagram

![Frame 7](https://github.com/user-attachments/assets/ac11fde0-f234-463a-8649-9f45740f3950)

## 🧾 Architecture Diagram

![ee2](https://github.com/user-attachments/assets/837c8dd7-a098-48f0-b89a-80f5a2245ec8)

## 🧾 Cluster Diagram

![Frame 11](https://github.com/user-attachments/assets/9b571e6b-ab6e-41bd-bed0-aa8561f13193)

## 🧾 Backup and Restore

![backup2](https://github.com/user-attachments/assets/c2ac3a8b-63bd-4698-a606-a35af3f9f95c)

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
For **production deployment**, it is recommended to use **AWS RDS (Relational Database Service)** to ensure scalability and reliability.

### 1️⃣ Set Up an AWS RDS Database
- Create an **Amazon RDS instance** with **MySQL** as the database engine.
- Configure **username, password, and host** details.

### 2️⃣ Update `application.yml` with RDS Configuration
Modify the `application.yml` file to include the **AWS RDS** database configuration:

```yaml
spring:
  datasource:
    url: jdbc:mysql://<RDS_HOST>:3306/<database-name>
    username: <RDS_USERNAME>
    password: <RDS_PASSWORD>
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

Now, the Bank Management System application is connected to a persistent **AWS RDS MySQL database** and ready for production deployment. 🚀

## 🧾 Argocd App

![microservice](https://github.com/user-attachments/assets/98a148cb-f95f-450b-87f6-0b222eaa4c98)


## 🧾 Prometheus and Grafana

![prometheus-monitor](https://github.com/user-attachments/assets/7cf66bf7-4851-4eb1-91cb-0c6fef164a94)


## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📜 License

This project is licensed under the **MIT License**.

