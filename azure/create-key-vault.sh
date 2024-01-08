#!/bin/bash
. ./env_vars
echo "Creating KeyVault ($MY_KEY_VAULT)"
az keyvault create -n $MY_KEY_VAULT -g $MY_RESOURCE_GROUP -l $MY_LOCATION
echo "KeyVault ($MY_KEY_VAULT) is created"
