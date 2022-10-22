# sappio - a minimal NodeJS app with logging
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


## How to stop/remove

You must follow the instructions below to stop and remove the service on docker daemon:

```>>> npm run docker:clean --tag=IMAGE-NAME```

After command run, we will not see the deployed app by command run ```docker ps -a``` anymore. 

## Logging

At first, we direct logs to console. The full logging experience happens by sign-up to [LogTail](https://betterstack.com/logtail) and adequate environment variable ```.env``` fill up with row ```LOGTAIL_TOKEN=XXXXX```. The string ```XXXXX``` refers to respective provided token string.

## Backlog

I plan to:

1. Add some other routes for educational purposes;
2. Provide automatic route explanations, also called a `swagger`.


