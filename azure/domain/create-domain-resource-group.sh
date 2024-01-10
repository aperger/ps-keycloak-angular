#!/bin/bash
. ./env_vars_domain
az group create -n $DOMAIN_RESOURCE_GROUP -l $DOMAIN_LOCATION
echo "Waiting for creation of resource group ($DOMAIN_RESOURCE_GROUP)"
az group wait --created --resource-group $DOMAIN_RESOURCE_GROUP
echo "Resource group ($DOMAIN_RESOURCE_GROUP) is created"
