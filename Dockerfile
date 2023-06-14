FROM node:20-alpine

WORKDIR /usr/app

# Copy package.json and package-lock.json separately
COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install -g @babel/preset-env
RUN npm cache clean --force

# Install application dependencies
RUN npm cache clean --force && npm install --legacy-peer-deps

# Install pm2 globally
RUN npm install pm2 -g

# Copy the rest of the application files
COPY . .

# Set the APP_HOST environment variable
ARG APP_HOST
ENV APP_HOST=${APP_HOST}

# Copy the local environment file to the container
COPY .env .env

# Source the environment variables from the .env file
RUN set -o allexport && \
    source .env && \
    set +o allexport

# Expose the Node app port
ENV APP_PORT=${APP_PORT}
EXPOSE ${APP_PORT}

# Start the application using pm2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
