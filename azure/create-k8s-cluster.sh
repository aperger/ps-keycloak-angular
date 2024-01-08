#!/bin/bash
. ./env_vars
echo "Ckecking the existence of ARC($MYACR)"
az acr check-name -n $MYACR
echo "Kubernetes cluster ($MYCLUSTER) is creating"
az aks create -n $MYCLUSTER -g $MY_RESOURCE_GROUP --tier free --generate-ssh-keys --attach-acr $MYACR
echo "Kubernetes cluster ($MYCLUSTER) is created"