FROM node:16-alpine

ADD . ./

RUN npm install --quiet

RUN npm audit fixx --force

WORKDIR /usr/app

COPY package.json .

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
