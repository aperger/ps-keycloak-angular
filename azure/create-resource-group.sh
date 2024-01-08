#!/bin/bash
. ./env_vars
az group create -l $MY_LOCATION -n $MY_RESOURCE_GROUP
echo "Waiting for creation of resource group ($MY_RESOURCE_GROUP)"
az group wait --created --resource-group $MY_RESOURCE_GROUP
echo "Resource group ($MY_RESOURCE_GROUP) is created"