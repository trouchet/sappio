FROM node:19-alpine

ADD . ./

RUN npm install --quiet

WORKDIR /usr/app

COPY package.json .

COPY . .

EXPOSE $APP_PORT

CMD [ "node", "index.js" ]
