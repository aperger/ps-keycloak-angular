#### TODO 

After CERT creation we need to copy tha full chain of certiticate and the private key into one file, this new file ned to imported into and Azure KeyVault.

```
cat fullchain.pem privkey.pem > azure.pem
```
