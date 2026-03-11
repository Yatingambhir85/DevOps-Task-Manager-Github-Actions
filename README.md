# 🚀 DevOps Task Manager Application

A **3-Tier DevOps Task Manager Application** demonstrating a complete **DevSecOps CI/CD pipeline using GitHub Actions**.

This project showcases how modern DevOps pipelines automate **code quality checks, security scanning, containerization, and cloud deployment**.

---

# 🏗️ Architecture

This application follows a **3-tier architecture**:

Frontend → **HTML**  
Backend → **Node.js (Express)**  
Database → **MySQL**

All services run inside **Docker containers** and communicate through a **shared Docker network**.

```
Frontend (HTML)
       │
       ▼
Backend (Node.js API)
       │
       ▼
Database (MySQL)
```

---

# ⚙️ Tech Stack

- **Node.js**
- **HTML / CSS**
- **MySQL**
- **Docker & Docker Compose**
- **GitHub Actions (CI/CD)**
- **Trivy (Security Scanning)**
- **AWS EC2 (Deployment)**

---

# 📋 Prerequisites

Make sure the following tools are installed:

- **Node.js (v20+)**
- **Git**
- **Docker**
- **Docker Compose**

---

# 🔐 Environment Variables

Before running the application, configure the environment variables.

- For **Docker setup**, refer to **`backend/.env.docker`**
- For **local setup**, refer to **`backend/.env`**

Sample files are already provided inside the **backend folder**.  
Please review and update them before running the application.

---

# 🐳 Running the Application with Docker

### Step 1 — Build the containers

```bash
docker-compose --env-file ./backend/.env.docker build
```

### Step 2 — Start the containers

```bash
docker-compose --env-file ./backend/.env.docker up -d
```

### Step 3 — Access the application

Open your browser:

```
http://0.0.0.0:3000
```

---

# 💻 Running the Application Locally

### Clone the repository

```bash
git clone https://github.com/Yatingambhir85/DevOps-Task-Manager-Github-Actions
```

### Navigate to backend

```bash
cd DevOps-Task-Manager-Github-Actions/backend
```

### Ensure local environment file exists

```
backend/.env
```

### Start the application

```bash
node server.js
```

### Open in browser

```
http://localhost:3000
```

---

# 🔄 GitHub Actions Workflows

This project includes **multiple GitHub Actions workflows**, each responsible for a different stage of the **DevSecOps pipeline**.

### 🧹 Code & Dependency Checks
- **Dockerfile Lint**
- **Code Dependency Check**
- **npm audit security scan**

### 🐳 Containerization
- **Docker Build & Push to Docker Hub**

### 🛡️ Security
- **Container Image Scan using Trivy**

### 🚀 Deployment
- **Automated deployment to AWS EC2 via SSH**

### 📦 Complete DevSecOps Pipeline
- Full CI/CD pipeline integrating all stages.

---

# 📂 Workflow Files

- **[Dockerfile Lint](https://github.com/Yatingambhir85/DevOps-Task-Manager-Github-Actions/blob/main/.github/workflows/Dockerfile-Lint.yml)**

- **[Code Dependency Check](https://github.com/Yatingambhir85/DevOps-Task-Manager-Github-Actions/blob/main/.github/workflows/code-dependency-check.yml)**

- **[Docker Build & Push](https://github.com/Yatingambhir85/DevOps-Task-Manager-Github-Actions/blob/main/.github/workflows/docker-build-%26-push.yml)**

- **[Trivy Image Scan](https://github.com/Yatingambhir85/DevOps-Task-Manager-Github-Actions/blob/main/.github/workflows/trivy-image-scan.yml)**

- **[Deployment to Server](https://github.com/Yatingambhir85/DevOps-Task-Manager-Github-Actions/blob/main/.github/workflows/deploy-to-server.yml)**

- **[Complete DevSecOps Pipeline](https://github.com/Yatingambhir85/DevOps-Task-Manager-Github-Actions/blob/main/.github/workflows/devsecops-complete-pipeline.yml)**

---

# 🎯 Key DevOps Features

✔ CI/CD using **GitHub Actions**  
✔ **Matrix strategy** for testing multiple Node versions  
✔ **Docker containerization**  
✔ **Security scanning with Trivy**  
✔ Automated **Docker image push to Docker Hub**  
✔ **Automated EC2 deployment**  
✔ **3-tier containerized architecture**

---

# 📸 Project Goal

The goal of this project is to demonstrate the **complete DevOps lifecycle**, including:

- Continuous Integration  
- Security Integration (DevSecOps)  
- Containerization  
- Continuous Deployment

🚧 **Upcoming Feature:** Login and Registration functionality will be added in future releases (currently Work In Progress).

---

# 🙌 Acknowledgment

Special thanks to **TrainWithShubham** and **[@Shubham Londhe](https://github.com/LondheShubham153)** for making **DevOps and GitHub Actions concepts easy to understand**.

---

# 📬 Feedback

Contributions, suggestions, and pull requests are always welcome!

If you like the project, consider ⭐ starring the repository.
