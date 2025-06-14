# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Start the app
CMD ["node", "app.js"]
