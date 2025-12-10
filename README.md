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
2. Make sure your `.env` contains the correct `VITE_*` values (they are compiled into the image). When you need to pass build arguments (e.g., `VITE_API_URL`), switch your shell to the Minikube Docker daemon and build there so Kubernetes can pull the result:
   ```bash
   $ minikube start
   $ eval "$(minikube docker-env)"               # point Docker CLI to Minikube
   $ docker build -t frontend:local \            # build with VITE_* args
       --build-arg VITE_API_URL=$VITE_API_URL \
       --build-arg VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY \
       .
   $ eval "$(minikube docker-env -u)"            # optional: restore host Docker
   ```
3. Update the manifests with your runtime settings (if needed):
   - `k8s/split/configmap.yaml` (or the ConfigMap section in `k8s/combined/app.yaml`) defines defaults for `PORT` and `VITE_API_URL`.
   - `k8s/split/secret.yaml` (or the Secret section in `k8s/combined/app.yaml`) can hold a sensitive override for `VITE_API_URL`. Because it is applied after the ConfigMap in the `envFrom` list, it wins when both specify `VITE_API_URL`.

   Then apply either the split manifests or the combined manifest:
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
   If you prefer a `kubectl port-forward`/tunnel, keep the terminal open while running:
   ```bash
   $ kubectl port-forward service/frontend-service 8080:3000   # exposes http://127.0.0.1:8080
   $ kubectl port-forward service/nestjs-app  8081:3000        # backend tunnel for VITE_API_URL
   ```
   Alternatively, `minikube service <name> --url` opens an on-demand tunnel (also requires the terminal to stay open).
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
