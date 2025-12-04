
# Use the official Node.js LTS image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (change if not 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
