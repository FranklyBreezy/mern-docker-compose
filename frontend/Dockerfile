FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port React runs on
EXPOSE 3000

# Command to start the React development server
CMD ["npm", "start"]