#!/bin/bash
. ./env_vars
echo "Ckecking the existence of ARC($MYACR)"
az acr check-name -n $MYACR
echo "Kubernetes cluster ($MYCLUSTER) is creating"
az aks create -n $MYCLUSTER -g $MY_RESOURCE_GROUP --tier standard --generate-ssh-keys --attach-acr $MYACR --node-count 1
echo "Kubernetes cluster ($MYCLUSTER) is created"