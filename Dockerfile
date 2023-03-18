FROM node:latest as builder

WORKDIR /usr/src/front
COPY . ./
# COPY package.json ./
# COPY package-lock.json ./
RUN npm install
RUN npm run build
# RUN apk add --no-cache bash

# COPY wait.sh /wait.sh

# RUN chmod +x /wait.sh

# RUN chmod +x /wait.sh

# CMD ["/wait.sh", "front-app:3000", "--", "nginx", "-g", "daemon off;" ]

# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./conf.d/default.conf /etc/nginx/conf.d

FROM nginx:latest

COPY ./conf.d /etc/nginx/conf.d
COPY --from=builder /usr/src/front/build /usr/share/nginx/html