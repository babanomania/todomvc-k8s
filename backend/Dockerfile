# First stage: build
FROM node:lts AS build
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

COPY . /app

ENV NODE_ENV=development
ENV LOG_LEVEL=info

RUN npm install typescript -g
RUN npm install
RUN npm run postinstall
RUN npm run build

# Second stage: production
FROM node:lts
WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV LISTEN_HOST=0.0.0.0
ENV LISTEN_PORT=3001

RUN npm install --only=production

EXPOSE 3001

ENTRYPOINT ["npm", "run", "start:prod"]
