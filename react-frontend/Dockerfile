FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all files and directories from the local project to the working directory in the container
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the build from the previous stage to the Nginx directory
COPY --from=0 /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
# Expose port 80 to access the application
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]