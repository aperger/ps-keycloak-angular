#!/bin/bash

handle_error() {
    echo "An error occurred on line $1"
    exit 1
}
trap 'handle_error $LINENO' ERR

. ./env_vars_domain
certbot certonly --manual --config-dir ./cert/config --work-dir ./cert/working --logs-dir ./cert/logs  -d *.$DOMAIN_NAME
cat ./cert/config/live/$DOMAIN_NAME/fullchain.pem ./cert/config/live/$DOMAIN_NAME/privkey.pem > ./cert/fullcert.pem
az keyvault certificate import --vault-name $DOMAIN_KEY_VAULT -n $WILDCARD_CERT -f ./cert/fullcert.pem
az keyvault certificate show --vault-name $DOMAIN_KEY_VAULT --name $WILDCARD_CERT
