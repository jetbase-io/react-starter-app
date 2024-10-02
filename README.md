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

## Test

```bash
# tests
$ npm run test
```

[1]: https://github.com/jetbase-io/nestjs-starter-app/blob/development/README.md "nestjs-starter-app"
[2]: https://github.com/jetbase-io/nestjs-starter-app/ "nestjs-starter-app"