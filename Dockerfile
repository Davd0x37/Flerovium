FROM node:16-alpine3.11 as app_build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# RUN npm run format
# RUN npm run lint
RUN npm run build:web

FROM nginx as prod

# RUN apk update && apk upgrade

RUN mkdir /app

COPY --from=app_build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf