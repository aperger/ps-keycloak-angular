#### Managed nginx Ingress with the application routing add-on

One way to route Hypertext Transfer Protocol (HTTP) and secure (HTTPS) traffic to applications running on an Azure Kubernetes Service (AKS) cluster is to use the Kubernetes Ingress object. When you create an Ingress object that uses the application routing add-on nginx Ingress classes, the add-on creates, configures, and manages one or more Ingress controllers in your AKS cluster.

* https://learn.microsoft.com/en-us/azure/aks/app-routing

#### HTTP application routing add-on for Azure Kubernetes Service (AKS) (retired)

The HTTP application routing solution makes it easy to access applications that are deployed to your cluster by creating publicly accessible DNS names for application endpoints. This will create a DNS zone in your subscription. HTTP application routing is designed for easily getting started with ingress controllers and as such is not recommended for production clusters.

* https://learn.microsoft.com/en-us/azure/aks/http-application-routing


#### HAProxy Kubernetes Ingress Controller

* https://www.haproxy.com/documentation/kubernetes-ingress/community/installation/azure/

This guide shows you how to install HAProxy Kubernetes Ingress Controller in Azure Kubernetes Service. You can install either with Helm or kubectl.

