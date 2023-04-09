FROM node:lts-alpine3.16 as build

WORKDIR /app

RUN npm i -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i
COPY . ./
RUN pnpm build

FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
