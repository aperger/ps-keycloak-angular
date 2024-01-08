#!/bin/bash
. ./env_vars
echo "Adds HELM repository to access Secrets Store CSI Driver"
helm repo add csi-secrets-store-provider-azure https://azure.github.io/secrets-store-csi-driver-provider-azure/charts
echo "Installs both the Secrets Store CSI Driver and the Azure Key Vault provider"
helm install csi csi-secrets-store-provider-azure/csi-secrets-store-provider-azure --namespace kube-system
read -p "Wait a bit and Press enter to continue"
kubectl get pods -l app=secrets-store-csi-driver -n kube-system