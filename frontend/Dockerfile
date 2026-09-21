# Base Image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Vite port
EXPOSE 5173

# Start frontend dev server
CMD ["npm", "run", "dev", "--", "--host"]