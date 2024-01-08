#!/bin/bash
. ./env_vars
echo "Start proxy on Port $LOCAL_PROXY_PORT"
echo "You can acces to service: http://localhost:8080/api/v1/namespaces/default/services/ps-keycloak-frontend-service:$LOCAL_PROXY_PORT/proxy/"
kubectl proxy --port=$LOCAL_PROXY_PORT