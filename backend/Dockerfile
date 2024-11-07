#Sample Dockerfile for NodeJS Apps

FROM node:21

ENV NODE_ENV=production

WORKDIR /user/src/app

COPY package*.json ./

# COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "src/index.js" ]