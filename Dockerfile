FROM node:17-alpine3.14 as build

WORKDIR /usr/local/app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY  ./ /usr/local/app/

RUN npm install

RUN npm run build


FROM nginx:1.21.5-alpine

COPY --from=build /usr/local/app/dist/* /usr/share/nginx/html
