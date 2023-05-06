FROM node:19-alpine

COPY . ./

RUN chmod +x /scripts/

RUN npm ci --legacy-peer-deps --quiet
RUN npm install pm2 -g

WORKDIR /usr/app
COPY . /usr/app

# Set the APP_HOST environment variable
ARG APP_HOST
ENV APP_HOST=${APP_HOST}

# Copy the local environment file to the container
COPY .env .env

# Read the app port from the environment file
RUN export $(grep -v '^#' .env | xargs -0)

# Expose the Node app port
EXPOSE $APP_PORT

CMD [ "npm", "start" ]
