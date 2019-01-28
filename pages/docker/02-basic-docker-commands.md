====02 - Basic Docker Commands====

To continue the series of articles about Docker, I’d like to share about some basic Docker commands that we often used when we work with Docker.
0. Very first Docker command

The very first Docker command should be itself which shows how to to use the Docker commands, how many options, parameters, some basic Docker commands, etc.

For ex:
<code bash>
$ docker
Usage: docker [OPTIONS] COMMAND [arg...]
  docker daemon [ --help | ... ]
  docker [ --help | -v | --version ]

A self-sufficient runtime for containers.

Options:
  --config=~/.docker              Location of client config files
  -D, --debug                     Enable debug mode
  -H, --host=[]                   Daemon socket(s) to connect to
  -h, --help                      Print usage
  -l, --log-level=info            Set the logging level
  --tls                           Use TLS; implied by --tlsverify
  --tlscacert=~/.docker/ca.pem    Trust certs signed only by this CA
  --tlscert=~/.docker/cert.pem    Path to TLS certificate file
  --tlskey=~/.docker/key.pem      Path to TLS key file
  --tlsverify                     Use TLS and verify the remote
  -v, --version                   Print version information and quit

Commands:
  attach    Attach to a running container
  build     Build an image from a Dockerfile
  commit    Create a new image from a container's changes
  cp        Copy files/folders between a container and the local filesystem
  create    Create a new container
</code>

The next essential one which gives us summarized information about how many Docker containers in our environment, how many is Running, Paused, Stopped. How many Docker images in our environment, the server version, Docker Root Dir, Total Memory, Storage Driver and so on.

For ex:
<code bash>
$ docker info

Containers: 2
  Running: 0
  Paused: 0
  Stopped: 2
Images: 1
Server Version: 1.11.0
  Storage Driver: aufs
  Root Dir: /var/lib/docker/aufs
  Backing Filesystem: extfs
  Dirs: 6
  Dirperm1 Supported: false
Logging Driver: json-file
Cgroup Driver: cgroupfs
Plugins:
  Volume: local
  Network: bridge null host
Kernel Version: 3.13.0-85-generic
Operating System: Ubuntu 14.04.4 LTS
OSType: linux
Architecture: x86_64
...
</code>


To check which version of Docker is being installed in your operating system, included Docker client and Server, you can use below command:

For ex:
<code bash>
$ docker version

Client:
  Version: 1.11.0
  API version: 1.23
  Go version: go1.5.4
  Git commit: 4dc5990
  Built: Wed Apr 13 18:34:23 2016
  OS/Arch: linux/amd64

Server:
  Version: 1.11.0
  API version: 1.23
  Go version: go1.5.4
  Git commit: 4dc5990
  Built: Wed Apr 13 18:34:23 2016
  OS/Arch: linux/amd64
</code>


====1. Some Docker Registry, Repository Commands====
===1.1. Search For a Term on the Docker Registry===

This Docker command used when you want to search for any image you want. For example, you want to search for ubuntu docker, centos docker, chef docker,..
<code bash>
$ docker search [OPTIONS] TERM
</code>

For ex: Below example will search for Docker Apache Kafka on the registry. You can see that the first one has 143 rated stars. I’m going to pull it on the next command.
<code bash>
$ docker search kafka

NAME                        DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
wurstmeister/kafka          Multi-Broker kafka 0.8.x image                  143                  [OK]
spotify/kafka               A simple docker image with both Kafka and ...   108                  [OK]
sheepkiller/kafka-manager   kafka-manager                                   31                   [OK]
ches/kafka                  Apache Kafka. Tagged versions. JMX. Cluste...   30                   [OK]
</code>

===1.2. Pull a Docker Image from Registry to Local Machine===
<code bash>
$ docker pull [OPTIONS] NAME[:TAG|@DIGEST]
</code>

For ex: Below command will pull the wurstmeiter/kafka image to local machine.
<code bash>
$ docker pull  wurstmeister/kafka

Using default tag: latest
latest: Pulling from wurstmeister/kafka

ee54741ab35b: Downloading
a3ed95caeb02: Download complete
9c9e170ca59d: Pulling fs layer
9515f029f814: Retrying in 1 second
</code>

====2. Some Docker commands used for Docker images.====

This section list out some Docker commands to manipulate Docker images.

===2.1. List all Docker Images in Our Environment===
<code bash>
$ docker images
</code>

For ex:
<code bash>
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              690ed74de00f        6 months ago        960 B
</code>

The above example shows that there is only one image: hello-world on my environment.


===2.2. Remove a Docker Image===
<code bash>
$ docker rmi image_name
</code>

For ex:
<code bash>
$ docker rmi hello-world
</code>

On above example, I’ve tried to remove image: hello-world. Note that if there is any container still has reference to the image, an exception likes below will be thrown:
<code bash>
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container
c09660ed4522 is using its referenced image 690ed74de00f
</code>

In this case, we have to remove all the containers referenced to this Docker image first. Then remove the docker image. However, we can force to remove the image by adding -f parameter in the preceding the command.
<code bash>
$ docker rmi -f  hello-world
Untagged: hello-world:latest
Deleted: sha256:690ed74de00f99a7d00a98a5ad855ac4febd66412be132438f9b8dbd300a937d
</code>

===2.3. Remove all Docker Images===

There will be some cases, you want to remove all Docker images instead of one by one. Let’s use the below command:
<code bash>
$ docker rmi $(docker images -q)
</code>

===2.4. To Show History of a Docker Image===
<code bash>
$ docker history image_name
</code>

For ex:
<code bash>
$ docker history hello-world
IMAGE               CREATED             CREATED BY                                      SIZE
690ed74de00f        6 months ago        /bin/sh -c #(nop) CMD ["/hello"]                0 B
&lt;missing&gt;           6 months ago        /bin/sh -c #(nop) COPY file:1ad52e3eaf4327c8f   960 B
</code>

====3. Some Docker Commands Used for Container====

Below are some Docker commands which can be used for Docker containers.

===3.1. Create a Container from a Docker Image===
<code bash>
$ docker create image_name
</code>

For ex:
<code bash>
  $ docker create hello-world
  2470fa9d4b7edf6318ede1d90a6a263802177231439abd025053cf58d3223b3b
</code>

We have just created a new container from the hello-world image, and the output of above command is a docker container id of the container has been started yet.

===3.2. Start a Docker Container===
<code bash>
docker start container_id
</code>

For example:
<code bash>
$ docker start -i  2470fa9d4b7edf6318ede1d90a6a263802177231439abd025053cf58d3223b3b

Hello from Docker.
This message shows that your installation appears to be working correctly.
</code>

Note that we add the parameter -i to Keep STDIN opened so that we can see the “Hello from Docker” message above.


===3.3. Start and Run a Container===
<code bash>
$ docker run image_name
</code>

For example:
<code bash>
$ docker run -i hello-world

Hello from Docker.
This message shows that your installation appears to be working correctly.
</code>

The above command create a container from the image: hello-world and start it.


===3.4. See All The Docker Containers===
<code bash>
$ docker ps  -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS
2470fa9d4b7e        hello-world         "/hello"            6 minutes ago       Exited (0) 3 minutes ago
</code>

We just have 1 Stopped container. If we just wanted to see all Running container, we can drop the parameter: -a
<code bash>
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS
</code>

===3.5. Inspect a Docker Container===
<code bash>
$ docker inspect [OPTIONS] CONTAINER|IMAGE [CONTAINER|IMAGE...]
</code>

For ex:
<code bash>
$ docker inspect 78ae776f45c6

[
  {
    "Id": "78ae776f45c6207504c33501a4b17c771c0c441de2a20603871fc660dff71d41",
    "Created": "2016-04-26T17:24:54.618594804Z",
    "Path": "/hello",
    "Args": [],
    "State": {
      "Status": "exited",
      "Running": false,
      "Paused": false,
      "Restarting": false,
      "OOMKilled": false,
      "Dead": false,
      "Pid": 0,
      "ExitCode": 0,
      "Error": "",
      "StartedAt": "2016-04-26T17:24:54.794157192Z",
      "FinishedAt": "2016-04-26T17:24:54.799527453Z"
    },
...
]
</code>

Return all information about docker container.


===3.6. Stop a Docker Container===
<code bash>
$ docker stop [OPTIONS] CONTAINER [CONTAINER...]
</code>

For ex:
<code bash>
docker stop 2470fa9d4b7e
</code>

docker stop is diffrent with docker kill. docker stop attempts to trigger a graceful shutdown by sending the standard POSIX signal SIGTERM, whereas docker kill just kills the process by default.


===3.7. Kill a Docker Container===
<code bash>
$ docker kill [OPTIONS] CONTAINER [CONTAINER...]
</code>

For ex:
<code bash>
$ docker kill 2470fa9d4b7e
</code>

===3.8. Remove a Docker Container===
<code bash>
docker rm  &lt;CONTAINER ID&gt;
</code>

For ex:
<code bash>
docker rm 2470fa9d4b7e
</code>

===3.9. Remove All Docker Containers===
<code bash>
docker rm $(docker ps -a -q)
</code>

===3.10. Get Bash Shell Inside a Docker Container===
<code bash>
docker exec -i -t "container_id" bash
</code>

For example:
<code bash>
$ docker exec -i -t 2470fa9d4b7e bash
</code>

To see all other commands, we can go to docker official site.

https://docs.docker.com/engine/reference/commandline/
