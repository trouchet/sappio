FROM node:19-alpine

ADD . ./

RUN npm install --quiet
RUN npm install pm2 -g

RUN mkdir /usr/app
WORKDIR /usr/app
COPY . /usr/app

EXPOSE $APP_PORT

CMD [ "pm2-runtime", "index.js" ]
