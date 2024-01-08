#!/bin/bash
certbot certonly --manual --config-dir . --work-dir . --logs-dir .  -d *.azure.pergersoft.hu
