# Base image with Node.js and npm
FROM node:18

# Create app directory
WORKDIR /app

# Copy dependencies config
COPY package.json package-lock.json* ./

# Install dependencies including MUI icons
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Default command (optional, for dev purposes)
CMD ["npm", "start"]