# TodoMVC React with Docker and Kubernetes

This project is a branch of the TodoMVC project, aimed at showcasing the capabilities of Docker and Kubernetes. The goal is to demonstrate how to containerize a React application and deploy it using Kubernetes.

## Features

- **React**: A JavaScript library for building user interfaces.
- **Docker**: Containerization of the application for consistent and isolated environments.
- **Kubernetes**: Orchestration of containerized applications for automated deployment, scaling, and management.

## Getting Started

### Prerequisites

- Docker installed on your machine
- Kubernetes cluster set up (e.g., Minikube, Docker Desktop, or a cloud provider)

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/babanomania/todomvc-react-k8s.git
    cd todomvc-react-k8s
    ```

2. **Build the Docker image:**
    ```sh
    docker build -t todomvc/react:latest .
    ```

3. **Deploy to Kubernetes:**
    ```sh
    kubectl apply -k .
    ```

## Usage

Open your browser and navigate to `http://localhost:30891` to see the TodoMVC application in action. Where 30891 is the port on which the **todomvc-react** service is exposed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [TodoMVC](https://todomvc.com/) for the original project
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
