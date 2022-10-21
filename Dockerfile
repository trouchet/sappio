FROM node:16-alpine

ADD . ./

RUN npm install --quiet

WORKDIR /usr/app

COPY package.json .

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
