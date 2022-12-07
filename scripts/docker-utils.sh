#!/bin/bash

sanitize() {
  docker system prune --volumes -f

  for image_id in $(docker images --filter "dangling=true" -q --no-trunc); do
    docker rmi $image_id 
  done
}

listContainerPIDsByToken() {
    docker ps -a | grep $1 | awk '{ print $1 }'
}
 