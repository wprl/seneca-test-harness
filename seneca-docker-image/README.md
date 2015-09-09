This builds a base docker image.  It creates a seneca instance and pulls in files from images that inherit from it.  It expects the child project's files to be a seneca plugin that will be loaded with `seneca.use`.

Build a specific version of the seneca image and tag it with the version number:

```bash
$SENECA_VERSION=0.6.4 npm run build
```

Build an image with the latest seneca version and tag it latest:

```bash
$SENECA_VERSION=latest npm run build
```

------------

For a basic example see [../example-service](../example-service).

------------

`npm start` and `npm install-seneca` are tasks that run inside the container/image.  They are run automatically from the Dockerfile.  `npm start` runs the seneca instance, and `npm install-seneca` installs the version of seneca specified with $SENECA_VERSION into the container at build time.
