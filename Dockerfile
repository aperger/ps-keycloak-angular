FROM node:latest as build

ARG KEYCLOAK_URL
ENV KEYCLOAK_URL=$KEYCLOAK_URL

ARG KEYCLOAK_REALM   
ENV KEYCLOAK_REALM=$KEYCLOAK_REALM

ARG KEYCLOAK_CLIENT_ID  
ENV KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID

ARG AXING_API_URL  
ENV AXING_API_URL=$AXING_API_URL

ENV PRODUCTION=true

COPY . /workspace/

RUN cd /workspace/                                                                       && \
    npm install                                                                          && \
    npm run build

FROM nginx:stable-bullseye AS runtime


COPY --from=build /workspace/dist/ps-keycloak-angular /usr/share/nginx/html/

# RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
#     sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
#     sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx && \
     sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
COPY deploy/default-nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod 777 /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER nginx
HEALTHCHECK     CMD     [ "service", "nginx", "status" ]
