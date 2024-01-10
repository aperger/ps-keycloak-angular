#!/bin/bash
. ./env_vars_domain
echo "certbot certonly --manual --config-dir ./cert/config --work-dir ./cert/working --logs-dir ./cert/logs  -d *.$DOMAIN_NAME"
echo "cat ./cert/config/live/$DOMAIN_NAME/fullchain.pem ./cert/config/live/$DOMAIN_NAME/privkey.pem > ./cert/fullcert.pem"
echo "az keyvault certificate import --vault-name $DOMAIN_KEY_VAULT -n $WILDCARD_CERT -f ./cert/fullcert.pem"
az keyvault certificate show --vault-name $DOMAIN_KEY_VAULT --name $WILDCARD_CERT
