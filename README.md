# TodoMVC with Docker and Kubernetes

This project is a branch of the TodoMVC project, aimed at showcasing the capabilities of Docker and Kubernetes. The goal is to demonstrate how to containerize a full-stack application and deploy it using Kubernetes.

## Features

- **React**: A JavaScript library for building the frontend user interfaces.
- **Fastify**: A web framework for building the backend server.
- **Prisma**: An ORM for interacting with the database.
- **Postgres**: The database used for storing application data.
- **Docker**: Containerization of the application for consistent and isolated environments.
- **Kubernetes**: Orchestration of containerized applications for automated deployment, scaling, and management.
- **Helm**: A package manager for Kubernetes that helps in managing Kubernetes applications.

## Getting Started

### Prerequisites

- Docker installed on your machine
- Kubernetes cluster set up (e.g., Minikube, Docker Desktop, or a cloud provider)
- Helm installed on your machine

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/babanomania/todomvc-react-k8s.git
    cd todomvc-react-k8s
    ```

2. **Build the Docker images:**
    ```sh
    npm run build --workspaces
    npm run image:build --workspaces
    ```

3. **Deploy to Kubernetes:**
    ```sh
    kubectl apply -k . -n todomvc
    ```

4. **Deploy using Helm:**
    ```sh
    helm install todomvc ./chart
    ```

### Running Locally Without Kubernetes

To start the application manually without using Kubernetes, follow these steps:

1. **Start the postgres database:**
    ```sh
    cd backend
    npm install
    npm run postgres:start
    ```

2. **Start the backend server:**
    ```sh
    cd backend
    npm install
    npm run postinstall
    npm run migrate
    npm run dev
    ```

3. **Start the frontend application:**
    ```sh
    cd frontend
    npm install
    npm run dev
    ```

## Usage

Open your browser and navigate to `http://localhost:30080` to see the TodoMVC application in action. Where 30080 is the port on which the **todomvc-react** service is exposed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [TodoMVC](https://todomvc.com/) for the original project
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Helm](https://helm.sh/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)
