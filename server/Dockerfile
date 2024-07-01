FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy the wait-for-it script and make it executable
# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# Expose the desired port
EXPOSE 5000

# Command to run your application, waiting for the PostgreSQL service to be ready
CMD [ "npm", "run", "start:dev"]
