#!/bin/bash
set -a
source .env
set +a

docker build -t ${REACT_APP_COMPOSE_IMAGE_NAME} -f Dockerfile .
