## PS Keycloak Angular application


#### OpenID in Signle page WEB application

This application try to demonstarte the usage of keycloak-angular package. Which helps to create single page WEB application with OpenID based security. 

* [keycloak-js](https://www.npmjs.com/package/keycloak-js)
A client-side JavaScript OpenID Connect library that can be used to secure web applications

* [keycloak-angular](https://www.npmjs.com/package/keycloak-angular)
Keycloak Service which wraps the keycloak-js methods to be used in Angular

The application gather Access Token from the authorization server during the login, and using this token to request a 'Welcome message' from two resource servers, which secured with the mentioned authozization server. These services run with "Free F1 Service Plan", so sometimes they are not available, or takes long time to start (at the first hit).

* https://ps-servlet-api.azurewebsites.net
* https://ps-reactive-api.azurewebsites.net 

Detils about these services [here](https://github.com/aperger/service-template).


#### Deploy to Azure

The second goal of this repository is to store the scripts ('azure' folder) and manifest files ('kubernetes' folder) which helps to deploy this application into Azure Kubernetes Cluster.

* The infrastucture is generated with Azure CLI ('azure' folder)
* The DNS is manages under Azure (DNS Zone, 'azure/domain' folder) 
* Certificates are generated with 'certbot' for Les't Encrypt ('azure/domain/cert' folder)

The Azure Kubernetes cluster not always runnning... contact me to demonstarte!