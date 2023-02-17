#!/bin/bash

# bash ./scripts/docker-deploy.sh sappio
IMAGE_NAME="$1"
FROM_PORT="$2"
TO_PORT="$3"

if [[ $# -eq 0 ]]; then
  echo 'Provide Docker image name, local listen port and output port!'

elif [[ $(docker ps -a | grep -w "$IMAGE_NAME" | wc -l) -eq 1  ]]; then
  CONTAINER_ID="$(docker ps -a | grep -w "$IMAGE_NAME" | tail -n1 | awk '{print $1}')";
  
  echo "Container image $IMAGE_NAME with ID $CONTAINER_ID already exists! Watch it below."
  bash "$(pwd)/scripts/docker-watch.sh" $CONTAINER_ID

else
  echo "No such container image $IMAGE_NAME yet"

  docker build -t "$IMAGE_NAME" .
  docker run -p "$FROM_PORT:$TO_PORT" -d "$IMAGE_NAME"
fi;
