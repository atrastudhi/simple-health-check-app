FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Copy application source
COPY server.js ./

# Expose the port the app runs on
EXPOSE 3001

# Run the application
CMD ["node", "server.js"]

