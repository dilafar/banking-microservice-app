FROM node:22.13.0-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci && npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine3.20-perl
WORKDIR /app

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/generated_openssl_cert/default.conf /etc/nginx/conf.d/default.conf

USER root
RUN chown -R nginx:nginx /usr/share/nginx/html /etc/nginx/conf.d/default.conf

USER nginx


