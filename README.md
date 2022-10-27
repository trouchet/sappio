# ![sappio_title](https://user-images.githubusercontent.com/13961685/198166716-c03d22bd-220e-42d4-a036-95fa9e21407f.png)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

A simple logging app.

## Table of contents

1. [How to run](#how-to-run)
2. [How to stop/remove](#how-to-stop/remove-service)
3. [Logging](#logging)
4. [Backlog](#backlog)

## How to run

You may utilize some cloud service to host the app, like AWS EC2, Azure or GCloud, but also we might run locally. 

We use [Docker](https://docs.docker.com/) for build and run the application with ```npm run``` command below:

```
>>> npm run docker:clean --tag=IMAGE-NAME
>>> npm run docker:deploy --tag=IMAGE-NAME --from=8080 --to=8080
```
## How to define routes

We utilize library [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) to interpret the comments near to routes. However, the documentation on library
[swagger-autogen](https://www.npmjs.com/package/swagger-autogen#schema-and-definitions) is useful for route extension. We define the swagger route on ```$host/api-docs```

## How to stop/remove

You must follow the instructions below to stop and remove the service on docker daemon:

```>>> npm run docker:clean --tag=IMAGE-NAME```

After command run, we will not see the deployed app by command run ```docker ps -a``` anymore. 

## Logging

At first, we direct logs to console. The full logging experience happens by sign-up to [LogTail](https://betterstack.com/logtail) and adequate environment variable ```.env``` fill up with row ```LOGTAIL_TOKEN=XXXXX```. The string ```XXXXX``` refers to respective provided token string.

## Backlog

I plan to:

1. Add some other routes for educational purposes;


