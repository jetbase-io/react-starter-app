FROM node:16-alpine

# Set the working directory to /app
WORKDIR '/app'

# Copy package.json to the working directory
COPY package.json .

# Copying the rest of the code to the working directory
COPY . .

# Install any needed packages specified in package.json
RUN npm i

RUN npm run build
EXPOSE 3000
# Run index.js when the container launches
CMD ["node", "server.js"]