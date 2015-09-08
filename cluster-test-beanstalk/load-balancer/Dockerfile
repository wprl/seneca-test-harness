FROM jwilder/nginx-proxy:0.1.0
EXPOSE 80

# The default template creates a server that always sends 503...
# Removing that server is the only change to the template from
# nginx-proxy:0.1.0
COPY ./nginx.tmpl /app/nginx.tmpl
