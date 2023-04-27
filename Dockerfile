FROM node:16 AS builder
WORKDIR /app
#COPY package.json .
COPY . .
RUN npm i
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]