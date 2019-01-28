====06 - How To Pull A Docker Image And Run A Container====

This quick tutorial is going to cover how to pull a Docker image and run a container.

====1. List or Search For a Docker Image====

Before we can pull a Docker image and run a container, we should know its name first. And to do that, we can go to the Docker hub or Docker store to search for any name.

The alternative way is to use the docker search command to list or search for a Docker image. Let’s see the following example which we search for an Ubuntu docker from the default public registry:

<code bash>
[vagrant@localhost ~]$ docker search ubuntu
NAME                      DESCRIPTION                                     STARS  OFFICIAL  AUTOMATED
ubuntu                    Ubuntu is a Debian-based Linux operating s...   5710   [OK]
rastasheep/ubuntu-sshd    Dockerized SSH service, built on top of of...   77               [OK]
ubuntu-upstart            Upstart is an event-based replacement for ...   71     [OK]
consol/ubuntu-xfce-vnc    Ubuntu container with "headless" VNC sessi...   45               [OK]
</code>

As we can see the docker names, number of stars, and whether a Docker is official or not.

====2. Pull A Docker Image====
===2.1. Pull A Docker Image From The Public Registry===

To pull a Docker image from the public registry, we can use the docker pull command which has the following syntax:

<code bash>
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
</code>

Some command options:
Name, shorthand 	Default 	Description
–all-tags, -a 	false 	Download all tagged images in the repository
–disable-content-trust 	true 	Skip image verification

Let’s see how we pull an official Ubuntu docker image from the public registry.

<code bash>
docker pull ubuntu
<code>

Example output:
<code bash>
[vagrant@localhost ~]$ docker pull ubuntu
Using default tag: latest
latest: Pulling from library/ubuntu
d54efb8db41d: Downloading [=========================================> ] 41.65 MB/50.43 MB
f8b845f45a87: Download complete
</code>

===2.2. Pull A Docker Image From A Private Registry===

To pull a Docker image from a private registry, we can use the same docker pull command and provide exactly the full name of the Docker image on that private registry. Let’s see an example which we pull a ubuntu-java8 image from an private registry localregistry.com:

<code bash>
docker pull localregistry.com:5000/ubuntu-java8
</code>

====3. Run a Docker Container====

After we pull a Docker image from Docker registry, to run a Docker container from that image, we can use the docker run command which has basic syntax as following:

<code bash>
docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
</code>

Let’s see an example which we run the above ubuntu docker image:
<code bash>
docker run -i -t ubuntu /bin/bash
</code>
