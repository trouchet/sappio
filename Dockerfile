FROM node:19-alpine

ADD . ./

RUN npm install --quiet
RUN npm install pm2 -g

WORKDIR /usr/app

COPY package.json .

COPY . .

EXPOSE $APP_PORT

CMD [ "pm2-runtime", "index.js" ]
