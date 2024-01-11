# PS Keycloak Angular application

This application try to demonstarte the usage of keycloak-angular package. Which helps to create sinle page WEB application with OpenID based security.

* [keycloak-js](https://www.npmjs.com/package/keycloak-js)
A client-side JavaScript OpenID Connect library that can be used to secure web applications

* [keycloak-angular](https://www.npmjs.com/package/keycloak-angular)
Keycloak Service which wraps the keycloak-js methods to be used in Angular

The application gather Access Token from the authorization server during the login, and ussing this tokens request Welcome messages from two resource servers, which secured with the mentioned authozization server. These services run with "Free F1 Service Plan", so sometimes they are not available, or takes long to to start (at the first hit).

* https://ps-servlet-api.azurewebsites.net/ [Source]()
* https://ps-reactive-api.azurewebsites.net/ 

Detils about these services [here](https://github.com/aperger/service-template).


---

Postscript: This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

