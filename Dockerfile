# Use official Node.js 22 LTS slim image
FROM node:22-slim

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./


RUN apt-get update && apt-get install -y procps 

RUN apt-get update && apt-get install -y openssl


# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the app port
EXPOSE 3000

# COPY wait-for-it.sh ./wait-for-it.sh
# RUN chmod +x ./wait-for-it.sh

# Start the app in production mode
CMD ["npm", "run", "start:dev"]

