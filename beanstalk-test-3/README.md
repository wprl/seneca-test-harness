This runs lab tests inside containerized servers.

Tested on OS X Yosemite with Docker Toolbox.

Useful commands:

```bash
npm run build
npm test
```

How to scale:

Run scale before running tests.

```bash
docker-compose scale test=4 worker=4
npm test
```
