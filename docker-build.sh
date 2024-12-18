#!/bin/ksh
. src/environments/.env

echo KEYCLOAK_URL=$KEYCLOAK_URL
echo KEYCLOAK_REALM=$KEYCLOAK_REALM
echo KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID
echo AXING_API_URL=$AXING_API_URL

docker build \
    --build-arg KEYCLOAK_URL=$KEYCLOAK_URL \
    --build-arg KEYCLOAK_REALM=$KEYCLOAK_REALM \
    --build-arg KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID \
    --build-arg AXING_API_URL=$AXING_API_URL \
    --tag ps-keycloak-angular:latest .
