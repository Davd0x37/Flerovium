FROM node:16-alpine3.11 as app_build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run format
RUN npm run lint
RUN npm run build

FROM flashspys/nginx-static

RUN apk update && apk upgrade

COPY --from=app_build /app/build /static