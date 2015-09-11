This is a non-functional code sketch.  It isn't debugged but represents a possible way to run lab tests from the host against the Docker containers.  Currently, the seneca client on the host is not properly communicating with the containerized beanstalkd server.

Tested on OS X Yosemite with Docker Toolbox.

Useful commands:

```bash
npm run build
npm start
npm run clean
```

How to scale:

```bash
npm start
docker-compose scale web=4 worker=4
```
