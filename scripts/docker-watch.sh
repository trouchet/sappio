#!/bin/bash

CONTAINER_ID="$1"

if [[ $# -eq 0 ]];
  then echo 'Container image name not supplied'
elif docker ps -a | grep -qw "$IMAGE_ID"; then

  if [[ $(docker ps -a | grep -w "$CONTAINER_ID" | wc -l) -eq 1  ]]; then
    IMAGE_NAME="$(docker ps -a | grep -w \"$1\" | tail -n1 | awk '{print $2}')";
    
    echo "Container image $IMAGE_NAME with ID $CONTAINER_ID exists!"
    docker logs -f "$CONTAINER_ID"
  
  else
    echo "We found more than one container with name $IMAGE_NAME."
    echo $(docker ps -a | grep -w "$IMAGE_NAME")
    echo 'We recommend you to watch it manually with command: '
    echo './utils/scripts/docker-watch.sh $IMAGE_NAME'
  fi;

else
  echo "No such container ID $CONTAINER_ID"
fi;
