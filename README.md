# Full CI/CD pipelines for employee management application, a Java-based dynamic web application with a database.

## Overview

This project is a full-stack microservice based System developed using **Spring Boot** for the backend and **React** for the frontend. It follows **DevSecOps** principles and is deployed on **AWS** using Kubernetes.

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

### AWS Services Used

- **Networking & Load Balancing**: NLB(Network LoadBalancer), Route 53, AWS Certificate Manager, VPC
- **Compute & Container Management**: Amazon EKS, Amazon EC2
- **Storage & Secrets Management**: AWS Secrets Manager, AWS S3 Bucket
- **Container Registry & CDN**: Amazon ECR, Amazon CloudFront

### AWS Load Balancer Controller Installation
#### To install the AWS Load Balancer Controller:

- An IAM policy was created to grant the necessary permissions.
- An IAM service account was created and linked to the policy.
- The AWS Load Balancer Controller was installed using Helm, utilizing the created service account.

### Domain & DNS Management

- The domain was registered on Google Cloud and hosted on AWS Route 53.
- Kubernetes ExternalDNS was used to manage DNS records dynamically, ensuring a cloud-agnostic approach.
- To handle Route 53 access, an IAM policy and IAM service account were created, assigning the necessary IAM role to the Kubernetes service account.
- The ExternalDNS deployment was configured with the service account, allowing DNS record management through Kubernetes ingress or service resources.
- Since the application uses an Application Load Balancer (ALB), ExternalDNS manages DNS records via Kubernetes ingress resources.
- TLS certificates were provisioned using AWS Certificate Manager, ensuring secure HTTPS connections through Kubernetes ingress resources.

![aws-vault-cert](https://github.com/user-attachments/assets/873afc02-8386-4b46-a5fa-b4a5117a5df7)

## 🚀 Setup & Installation
### Starting services locally without Docker

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/dilafar/anguler-springboot-aws-migration.git
cd anguler-springboot-aws-migration
```

### 2️⃣ Backend Setup (Spring Boot)

#### 🔹 Build & Run Locally

```sh
cd employeemanager
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Frontend Setup (Angular)

#### 🔹 Install Dependencies & Start

```sh
cd employeemanagerfrontend
npm install
ng serve --open
```

### Starting services locally with docker-compose

### 1️⃣ Start All Services

#### 🔹 Run the following command to start the application:

```sh
docker-compose up -d
```
The -d flag runs the services in detached mode.

![docker-compose-up](https://github.com/user-attachments/assets/13172c0b-ef56-48f6-a3d4-568025f24736)

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

![ee2](https://github.com/user-attachments/assets/837c8dd7-a098-48f0-b89a-80f5a2245ec8)

Cluster Diagram

![Frame 11](https://github.com/user-attachments/assets/9b571e6b-ab6e-41bd-bed0-aa8561f13193)


## Database Configuration

### 🏢 Default Database (HSQLDB)
By default, the Employee Management application uses an **in-memory database (HSQLDB)**. This database is automatically populated with data at startup. 

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
    url: jdbc:mysql://<RDS_HOST>:3306/employeemanager
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

Now, the Employee Management application is connected to a persistent **AWS RDS MySQL database** and ready for production deployment. 🚀

## 🧾 Argocd App

![microservice](https://github.com/user-attachments/assets/98a148cb-f95f-450b-87f6-0b222eaa4c98)


## 🧾 Prometheus and Grafana



## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📜 License

This project is licensed under the **MIT License**.

