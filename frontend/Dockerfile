FROM node:22.13.0-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci && npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine-slim
WORKDIR /app

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/generated_openssl_cert/default.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/generated_openssl_cert/nginx_fkey.crt /etc/nginx/certs/nginx_fkey.crt
#COPY --from=build /app/generated_openssl_cert/nginx_fkey.key /etc/nginx/certs/nginx_fkey.key

