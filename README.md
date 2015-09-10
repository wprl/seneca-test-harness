General instructions:
---------------------

Tested on OS X Yosemite.

1) Install [Docker Toolbox](https://www.docker.com/toolbox).  This works better than using docker & boot2docker OS X homebrew packages in my experience.
2) You can use the quickstart terminal in `/Applications/Docker/` or else, add the following alias to your `~/.bash_profile` and then run the `docker-cli` command from bash.

```bash
alias docker-cli='source /Applications/Docker/Docker\ Quickstart\ Terminal.app/Contents/Resources/Scripts/start.sh'
```

3) Now docker and docker-compose are ready to use from the command line.
4) Run `echo $DOCKER_HOST` to see the IP for the external Docker network.
