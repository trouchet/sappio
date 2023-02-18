FROM node:19-alpine

COPY . ./

RUN chmod +x /scripts/

RUN npm ci --legacy-peer-deps --quiet
RUN npm install pm2 -g

RUN mkdir /usr/app
WORKDIR /usr/app
COPY . /usr/app

EXPOSE 3000

CMD [ "npm", "start" ]
