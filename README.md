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

## Test

```bash
# tests
$ npm run test
```

[1]: https://github.com/jetbase-io/nestjs-starter-app/blob/development/README.md "nestjs-starter-app"
[2]: https://github.com/jetbase-io/nestjs-starter-app/ "nestjs-starter-app"
