FROM node:18-alpine
MAINTAINER DaoTrinh
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]