#!/bin/bash
echo "Don't repeatedly stop and start your clusters. This can result in errors. Once your cluster is stopped, you should wait at least 15-30 minutes before starting it again."
read -p "Press enter to continue"
. ./env_vars
echo "Custer ($MYCLUSTER) is starting"
az aks start --name $MYCLUSTER --resource-group $MY_RESOURCE_GROUP
echo "Verify cluster ($MYCLUSTER) has started"
az aks show --name $MYCLUSTER --resource-group $MY_RESOURCE_GROUP
