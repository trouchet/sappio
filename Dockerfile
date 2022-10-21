FROM node:16-alpine

ADD . ./

RUN npm install --quiet

RUN npm audit fix --force

WORKDIR /usr/app

COPY package.json .

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
