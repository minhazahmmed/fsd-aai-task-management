# Base Image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "run", "dev"]