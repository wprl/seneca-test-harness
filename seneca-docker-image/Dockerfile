FROM node:0.10

MAINTAINER William Riley-Land

ENV SENECA_HOST_DIR /usr/src/seneca-host
ENV SENECA_SERVICE_DIR $SENECA_HOST_DIR/service

# Create the host & service directories.
RUN mkdir -p $SENECA_HOST_DIR
RUN mkdir -p $SENECA_SERVICE_DIR

# Copy host seneca instance files to the container.
WORKDIR $SENECA_HOST_DIR
COPY . $SENECA_HOST_DIR
RUN npm run install-seneca
RUN npm install --production

# Copy service plugin (user) files to the container.
ONBUILD WORKDIR $SENECA_SERVICE_DIR
ONBUILD COPY . $SENECA_SERVICE_DIR
ONBUILD RUN npm install --production

# Run the host seneca instance.
ONBUILD WORKDIR $SENECA_HOST_DIR
ONBUILD CMD [ "npm", "start" ]
