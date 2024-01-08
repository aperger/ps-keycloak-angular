#!/bin/bash
. ./env_vars
az acr build --registry $MYACR --image ps-keycloak-angular:${REPOSITORY_IMAGE_TAG} --file ../Dockerfile ../