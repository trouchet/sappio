# sappio - a minimal node app with logging
[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

A logging app with logging

## Table of contents

1. [How to run](#how-to-run)
2. [How to stop/remove](#how-to-stop/remove-service)
3. [Backlog](#backlog)

## How to run

You may utilize some cloud service to host the app, like AWS EC2, Azure or GCloud, but also we might run locally. 

We use [Docker](https://docs.docker.com/) for build and run the application with ```npm run``` command below:
    
```>>> npm run docker:deploy IMAGE-NAME```

## How to stop/remove service

You must follow the instructions below to stop and remove the service on docker deamon:

1) Run the command ```docker ps -a```;
2) Identify container id for deployed ```IMAGE-NAME```. We call it here CONTAINER-ID
3) Run command ```docker stop CONTAINER-ID && docker rm CONTAINER-ID```; 

We will not see the deployed app by command run ```docker ps -a```. 

## Backlog

I plan to:

1. Add some other routes for educational purposes;
2. Provide automatic route explanations, also called a `swagger`.


