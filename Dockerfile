FROM node:19-alpine

COPY . ./

RUN npm ci --legacy-peer-deps --quiet
RUN npm install pm2 -g

RUN mkdir /usr/app
WORKDIR /usr/app
COPY . /usr/app

EXPOSE 3000

CMD [ "pm2-runtime", "index.js" ]
