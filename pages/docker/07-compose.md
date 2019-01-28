====07 - Docker compose===

===Docker Compose process===
1. Définir l'environnement de l'application avec un Dockerfile
2. Définir les services qui composent l'application dans un docker-compose.yml
3. Enfin, exécuter docker-compose up

===Installation docker compose===

Note : sur Mac, Windows et Docker Toolbox, Docker Compose est inclus

Sous Linux, [[https://github.com/docker/compose/releases|rendez-vous sur le repo Git du projet]]

<code bash>
curl -L https://github.com/docker/compose/releases/download/1.13.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
</code>

===Démarrage par l'exemple (projet en PHP sur nginx)===
Dans le dossier du projet, créer le fichier docker-compose.yml

<code>
version: '3'

services:
  nginx:
    build: docker/nginx
    command: nginx -g "daemon off;"
    links:
      - php
    ports:
      - "81:81"

  php:
    build: docker/php
    volumes:
      - ./docker/php:/var/www/html
    working_dir: /var/www/html
    command: php-fpm
    ports:
      - "9000:9000"
</code>

Lors de l'exécution du docker-compose up, ce fichier fera un build d'une application tournant sur les composants nginx et php5
dont les définitions (Dockerfile) et configurations se trouvent dans le dossier docker du projet.

L'application sera accessible sur un navigateur à l'adresse http://127.0.0.1:9000

===Usefull command list===
Commandes :
<code bash>
  build              Build or rebuild services
  bundle             Generate a Docker bundle from the Compose file
  config             Validate and view the Compose file
  create             Create services
  down               Stop and remove containers, networks, images, and volumes
  events             Receive real time events from containers
  exec               Execute a command in a running container
  help               Get help on a command
  images             List images
  kill               Kill containers
  logs               View output from containers
  pause              Pause services
  port               Print the public port for a port binding
  ps                 List containers
  pull               Pull service images
  push               Push service images
  restart            Restart services
  rm                 Remove stopped containers
  run                Run a one-off command
  scale              Set number of containers for a service
  start              Start services
  stop               Stop services
  top                Display the running processes
  unpause            Unpause services
  up                 Create and start containers
  version            Show the Docker-Compose version information
</code>

Options :
<code bash>
Options:
  -f, --file FILE             Specify an alternate Compose file (default: docker-compose.yml)
  -p, --project-name NAME     Specify an alternate project name (default: directory name)
  --verbose                   Show more output
  -v, --version               Print version and exit
  -H, --host HOST             Daemon socket to connect to

  --tls                       Use TLS; implied by --tlsverify
  --tlscacert CA_PATH         Trust certs signed only by this CA
  --tlscert CLIENT_CERT_PATH  Path to TLS certificate file
  --tlskey TLS_KEY_PATH       Path to TLS key file
  --tlsverify                 Use TLS and verify the remote
  --skip-hostname-check       Don't check the daemon's hostname against the name specified
                              in the client certificate (for example if your docker host
                              is an IP address)
  --project-directory PATH    Specify an alternate working directory
                              (default: the path of the Compose file)
</code>
