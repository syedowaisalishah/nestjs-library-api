# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "run", "start:prod"]
