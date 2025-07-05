FROM oven/bun:latest AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json into the container
COPY package.json ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the application using Vite
RUN bun run build

# Use the official Nginx image to serve the app
FROM nginx:alpine

# Copy built files to Nginx's html directory
COPY --from=dist /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
