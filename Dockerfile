FROM node:20-alpine

WORKDIR /app

ENV HUSKY=0

COPY package*.json ./
RUN npm ci --ignore-scripts

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_STRIPE_PUBLIC_KEY
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY

COPY . .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.cjs"]
