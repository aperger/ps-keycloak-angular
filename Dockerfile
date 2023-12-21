FROM node:latest as build

COPY . /workspace/

RUN cd /workspace/                                                                       && \
    npm install                                                                          && \
    npm run build

FROM nginx:stable-bullseye AS runtime


COPY --from=build /workspace/dist/ps-keycloak-angular /usr/share/nginx/html/

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

# COPY deploy/default-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER nginx
HEALTHCHECK     CMD     [ "service", "nginx", "status" ]

