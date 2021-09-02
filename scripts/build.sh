#! /bin/bash

if [[ $# -eq 1 ]] ; then  
  docker build -t flerovium -f Dockerfile .
  exit 1
fi

podman build -t flerovium .