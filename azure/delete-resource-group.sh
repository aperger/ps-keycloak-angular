#!/bin/bash
. ./env_vars
az group delete -n $MY_RESOURCE_GROUP --no-wait --yes
echo "Waiting for deletion of resource group ($MY_RESOURCE_GROUP)"
az group wait --deleted --resource-group $MY_RESOURCE_GROUP
echo "Resource group ($MY_RESOURCE_GROUP) is deleted"