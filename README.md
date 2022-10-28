# ![sappio_title](https://user-images.githubusercontent.com/13961685/198166716-c03d22bd-220e-42d4-a036-95fa9e21407f.png)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

A simple logging app.

## Table of contents

1. [How to build](#how-to-build)
2. [How to setup](#how-to-setup)
3. [How to run and deploy](#how-to-run-and-deploy)
4. [Available endpoint routes](#available-endpoint-routes)
5. [How to define routes](#how-to-define-routes)
6. [How to stop and remove](#how-to-stop-and-remove)
7. [Logging](#logging)
8. [Backlog](#backlog)

## How to build

We must firstly install the required libraries to run and host, local or remotely, the app. Therefore, we run the command below.

```
>>> npm run build
```
## How to setup

There are below environment variables for the node app to work properly. We list them on table below: 

| Name        | Reference description   | Default    | Optional  | 
|-------------|-------------------------|------------|-----------|
| APP_PORT    | 0-65535                 | 8080       | Yes       |
| JWT_KEY     | string                  | 1234       | Yes       |
| DB_HOST     | Cloud host              | localhost  | Yes       |
| DB_USER     | Database user           | postgres   | Yes       |
| DB_PASSWORD | Database user password  | postgres   | Yes       |
| DB_NAME     | Database table name     | sappio     | Yes       |
| DB_PORT     | Database port           | 5432       | Yes       |
| NODE_ENV    | test/production environment    | 5432       | No        |
| KNEX_ENV    | docker/test/production  | test       | Yes        |

## How to run and deploy

You may utilize some cloud service to host the app, like AWS EC2, Azure or GCloud, but also we might run locally. 

We use [Docker](https://docs.docker.com/) for build and run the application with ```npm run``` command below:

```
>>> npm run docker:clean --tag=IMAGE-NAME0
>>> npm run docker:deploy --tag=IMAGE-NAME --from=8080 --to=8080
```

## Available endpoint routes

We may go on browser and type on URL field the text ```$APP_HOST:$APP_PORT``` followed by available routes. The available routes are below to consult:

1. ```/```: The home or Sappio landing page;  
2. ```/all```: It lists all available routes;
3. ```/token```: It provides a JWT token;
4. ```/healthcheck```: It provides a health object;
5. ```/swagger```: It renders a page with available gathered routes;
6. ```/status```: It displays a rudimentary machine usage and app availability UI;

__TAKE NOTE__: Both variables ```APP_HOST``` and ```APP_PORT``` are those available on project root folder ```/config/.env```

## How to define routes

We utilize library [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) to interpret the comments near to routes. However, the documentation on library
[swagger-autogen](https://www.npmjs.com/package/swagger-autogen#schema-and-definitions) is useful for route extension. We define the swagger route on ```$host/swagger```

## How to stop and remove

You must follow the instructions below to stop and remove the service on docker daemon:

```>>> npm run docker:clean --tag=IMAGE-NAME```

After command run, we will not see the deployed app by command run ```docker ps -a``` anymore. 

## Logging

At first, we direct logs to console. The full logging experience happens by sign-up to [LogTail](https://betterstack.com/logtail) and adequate environment variable ```.env``` fill up with row ```LOGTAIL_TOKEN=XXXXX```. The string ```XXXXX``` refers to respective provided token string.

## Backlog

1. Add some other routes for educational purposes;
2. Authenticate route;
3. Extend to update a PostgreSQL database;
4. Provide same labels to both ```KNEX_ENV``` and ```NODE_ENV```. 

