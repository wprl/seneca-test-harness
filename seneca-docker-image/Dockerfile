FROM node:0.10

MAINTAINER William Riley-Land

ENV SENECA_HOST_PATH /usr/src/seneca-host
ENV SENECA_SERVICE_PATH $SENECA_HOST_PATH/service

# Create the host & service directories.
RUN mkdir -p $SENECA_HOST_PATH
RUN mkdir -p $SENECA_SERVICE_PATH

# Copy host seneca instance files to the container.
WORKDIR $SENECA_HOST_PATH
COPY . $SENECA_HOST_PATH
RUN npm run install-seneca
RUN npm install --production

# Copy service plugin (user) files to the container.
# TODO Docker best practice is to use the array form
# of CMD.  However, we need to expand an environment
# variable so that will not work directly.  Figure
# out a clever and safe way you use $SENECA_HOST_PATH
# in the CMD.
CMD npm --prefix $SENECA_HOST_PATH start
