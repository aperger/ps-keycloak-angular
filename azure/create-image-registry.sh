#!/bin/bash
. ./env_vars
echo "Container geristry ($MYACR) is creating"
az acr create -n $MYACR -g $MY_RESOURCE_GROUP --sku basic
echo "Container geristry ($MYACR) is created"