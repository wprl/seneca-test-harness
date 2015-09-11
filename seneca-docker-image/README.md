## Description

This builds a base docker image.  It creates a seneca instance and a directory that consumer Dockerfiles can load a seneca plugin into.  It expects the child project to be a module containing a seneca plugin that will be loaded with `seneca.use`.

For a basic example see [../example-service](../example-service).

-----------------

## How to build

Build a specific version of the seneca image and tag it with the version number:

```bash
$SENECA_VERSION=0.6.4 npm run build
```

Build an image with the latest seneca version and tag it latest:

```bash
$SENECA_VERSION=latest npm run build
```

------------

## Other scripts

`npm start` and `npm install-seneca` are tasks that run inside the container/image.  They are run automatically from the Dockerfile.  `npm start` runs the seneca instance, and `npm install-seneca` installs the version of seneca specified with $SENECA_VERSION into the container at build time.  They do not need to be run manually.
