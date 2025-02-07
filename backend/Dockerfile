#Sample Dockerfile for NodeJS Apps

FROM node:21

ENV NODE_ENV=production

WORKDIR /usr/src/app

# COPY package*.json ./

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "src/index.js" ]





# WORKDIR /src/app
# COPY . /app
# RUN npm install
# ENV PORT 8080
# EXPOSE 8080
# CMD ["npm", "start"]