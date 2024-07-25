#!/bin/bash
. ./env_vars
. ./domain/env_vars_domain

# https://learn.microsoft.com/en-us/azure/aks/app-routing-dns-ssl

# Enable AppRouting
az aks approuting enable -g $MY_RESOURCE_GROUP -n $MYCLUSTER


# Enable Azure Key Vault integration
az aks approuting update --resource-group $MY_RESOURCE_GROUP --name $MYCLUSTER --enable-kv
# Attache Key value to app routing... 
# !!!! not working 
#KEYVAULTID=$(az keyvault show --name $DOMAIN_KEY_VAULT --query "id" --output tsv)
# $az aks approuting update --resource-group $MY_RESOURCE_GROUP --name $MYCLUSTER --attach-kv ${KEYVAULTID}

# Attach Azure DNS zone to the application routing add-on, The app routing add-on can be configured to automatically create records 
# Not need
# az aks enable-addons --resource-group $MY_RESOURCE_GROUP --name $MYCLUSTER --addons http_application_routing
#ZONEID=$(az network dns zone show --resource-group $DOMAIN_RESOURCE_GROUP --name $DOMAIN_NAME --query "id" --output tsv)
#az aks approuting zone add --resource-group $MY_RESOURCE_GROUP --name $MYCLUSTER --ids=${ZONEID} --attach-zones


