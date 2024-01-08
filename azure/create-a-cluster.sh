#!/bin/bash
./create-resource-group.sh
./create-key-vault.sh
./create-image-registry.sh
./create-k8s-cluster.sh
./create-secret-store.sh
./enable-routing.sh 