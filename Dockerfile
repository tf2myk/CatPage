# Use the official Node.js 20.x image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code from the "app" directory to the container
COPY public/ .

# Expose the port your application will run on
EXPOSE 8080

# Define the command to start your application
CMD [ "node", "index.js" ] 

# Optional: Set any environment variables required by your application
# ENV ENV_VARIABLE_NAME=value