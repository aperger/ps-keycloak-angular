#!/bin/bash
. ./env_vars_domain
echo "Creating KeyVault ($DOMAIN_KEY_VAULT)"
az keyvault create --name $DOMAIN_KEY_VAULT --resource-group $DOMAIN_RESOURCE_GROUP --location $DOMAIN_LOCATION
echo "KeyVault ($MY_KEY_VAULT) is created"
