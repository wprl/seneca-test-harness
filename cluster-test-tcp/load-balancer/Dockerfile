FROM nginx:latest
EXPOSE 80
COPY ./load-balancer.conf /etc/nginx/conf.d/default.conf

# Install curl
RUN apt-get update -qq
RUN apt-get install -qy curl

# Set EnvPlate version
ENV ENVPLATE_VERSION 0.0.8

# Install EnvPlate
RUN curl -sLo /usr/local/bin/ep https://github.com/kreuzwerker/envplate/releases/download/v$ENVPLATE_VERSION/ep-linux
RUN chmod +x /usr/local/bin/ep

# Use ep to expand environment variables in the Nginx configuration.
CMD /usr/local/bin/ep -v /etc/nginx/conf.d/*.conf -- /usr/sbin/nginx -g 'daemon off;'
