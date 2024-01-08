#!/bin/bash
. ./env_vars
az acr repository list --name $MYACR --output table