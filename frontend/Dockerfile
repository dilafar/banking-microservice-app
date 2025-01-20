# Build stage
FROM node:20.18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm ci && npm install

# Copy the rest of the application files
COPY . .

# Build the React app using Vite
RUN npm run build

# Production stage
FROM nginx:stable-alpine-slim
WORKDIR /app

# Copy the built React app to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the SSL configuration and certificates
COPY --from=build /app/generated_openssl_cert/default.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/generated_openssl_cert/nginx_fkey.crt /etc/nginx/certs/nginx_fkey.crt
#COPY --from=build /app/generated_openssl_cert/nginx_fkey.key /etc/nginx/certs/nginx_fkey.key

