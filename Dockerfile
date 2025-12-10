FROM node:20-alpine

WORKDIR /app

ENV HUSKY=0

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.cjs"]
