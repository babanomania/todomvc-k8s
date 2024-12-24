FROM node:lts AS build
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

COPY . /app

RUN npm ci
RUN npm run build

# 2. For Nginx setup
FROM nginx:alpine

# Copy config nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

EXPOSE 3003

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
