## Description

How to run **react-starter-app **

## Installation

#### Setup environment
```bash
$ cp .env.sample .env
```

#### Install Dependencies
```bash
$ npm ci
```

#### Stripe Integration Guide
- Read the detailed Stripe integration description on [nestjs-starter-app/readme][1]
- Copy the **Public Key** (e.g., `pk_test_51...`) for use in your application.

#### Configure Your Application
**Set Up Environment Variables:**
   - In your project root, locate or create a `.env` file.
   - Add the following lines to your `.env` file, replacing `stripe_public_key` with the Stripe **Public Key** you copied:

     ```env
     VITE_STRIPE_PUBLIC_KEY="stripe_public_key" ## e.g. pk_test_51...
     ```
   - Specify [nestjs-starter-app][2] server URL (local or global):
```env
VITE_API_URL="api_url"  # e.g. localhost:3000/api
```

## Running the app

```bash
# development
$ npm run start
```

### Run with Docker
You can also run the app inside a container using the provided `Dockerfile` and `docker-compose.yml`.

1. Ensure Docker and Docker Compose are installed.
2. Copy `.env.sample` to `.env` and populate the same variables described above (the compose file loads them automatically).
3. Start the stack:
   ```bash
   $ docker compose up --build
   ```
   The `frontend` service builds from the local Dockerfile, mounts dependencies, and exposes the application on the port specified in your `.env` (`PORT`, defaults to `3000` in the container). The compose network (`sessions-network`) allows the frontend to communicate with other JetBase services if they are running locally.
4. Stop and remove the containers when finished:
   ```bash
   $ docker compose down
   ```

### Deploy to Kubernetes (Minikube)
1. Start (or reuse) a Minikube cluster:
   ```bash
   $ minikube start
   ```
2. Make sure your `.env` contains the correct `VITE_*` values (they are compiled into the image) and build the Docker image inside the Minikube registry:
   ```bash
   $ minikube image build -t frontend:local .
   # or: eval $(minikube docker-env) && docker build -t frontend:local .
   ```
3. Apply either the split manifests or the combined manifest:
   ```bash
   # split resources (ConfigMap, Deployment, Service in separate files)
   $ kubectl apply -f k8s/split

   # combined stack (single multi-document file)
   $ kubectl apply -f k8s/combined/app.yaml
   ```
   The `frontend-config` ConfigMap currently controls the container `PORT` (defaults to `3000`). The `frontend-service` is exposed as a NodePort (30081) so it can coexist with the existing `nestjs-app` NodePort (30080).
4. Access the app through the NodePort:
   ```bash
   $ minikube service frontend-service --url
   # or
   $ curl http://$(minikube ip):30081
   ```
5. Tear down the resources when finished:
   ```bash
   $ kubectl delete -f k8s/split             # when split manifests were applied
   $ kubectl delete -f k8s/combined/app.yaml
   ```

## Test

```bash
# tests
$ npm run test
```

[1]: https://github.com/jetbase-io/nestjs-starter-app/blob/development/README.md "nestjs-starter-app"
[2]: https://github.com/jetbase-io/nestjs-starter-app/ "nestjs-starter-app"
