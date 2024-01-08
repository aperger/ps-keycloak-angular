#!/bin/bash
. ./env_vars
az aks approuting enable -g $MY_RESOURCE_GROUP -n $MYCLUSTER
