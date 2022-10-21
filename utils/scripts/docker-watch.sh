#!/bin/bash

if [[ $# -eq 0 ]];
	then echo "[docker-watch] Docker container ID not supplied" 
elif docker ps -a | grep -qw "$1"; then
	if [[ ${#1} -eq 12 ]]; then
		sudo docker logs --follow $1
	else
		echo "[docker-watch] No such container $1" 
	fi;

else
	echo "[docker-watch] No such container $1" 
fi;