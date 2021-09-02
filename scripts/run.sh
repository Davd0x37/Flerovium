#! /bin/bash

if [[ $# -eq 1 ]] ; then  
  docker run -p 80:80 -t flerovium
  exit 1
fi

podman run -p 3000:80 flerovium