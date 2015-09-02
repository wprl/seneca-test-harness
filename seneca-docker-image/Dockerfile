FROM node:0.10

MAINTAINER William Riley-Land

ENV SENECA_HOST_DIR /usr/src/seneca-host
ENV SENECA_SERVICE_DIR $SENECA_HOST_DIR/service

# Create the host & service directories.
RUN mkdir -p $SENECA_HOST_DIR
RUN mkdir -p $SENECA_SERVICE_DIR

# Copy over host seneca instance files
WORKDIR $SENECA_HOST_DIR
COPY . $SENECA_HOST_DIR
RUN npm install --production

# Copy over service seneca plugin files
ONBUILD WORKDIR $SENECA_SERVICE_DIR
ONBUILD COPY . $SENECA_SERVICE_DIR
ONBUILD RUN npm install --production

# Run the host
ONBUILD WORKDIR $SENECA_HOST_DIR
ONBUILD CMD [ "npm", "start" ]
