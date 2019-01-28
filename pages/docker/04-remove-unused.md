====04 - How To Remove Unused Docker Images, Containers, Volumes, and Networks====

This tutorial is going to cover how to remove unused Docker images, containers, volumes, and networks.
====1. Remove Docker Images====
===1.1. List All Docker Images===

Before removing a Docker image, we have to know its name or id first. And we can use the docker images command to list all Docker images in our environment. Let’s refer to another tutorial for more basic Docker commands.

To list all Docker images:
<code bash>
docker images
</code>

For example,
<code>
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
alpine              latest              4a415e366388        5 days ago          3.98 MB
hello-world         latest              48b5124b2768        7 weeks ago         1.84 kB
busybox             latest              7968321274dc        7 weeks ago         1.11 MB
iron/node           latest              9ca501065d18        10 months ago       18.6 MB
</code>

To list all Docker images including intermediate images:
<code bash>
docker images -a
<code>

===1.2. Remove One or More Docker Images===
==1.2.1. Using the docker image rm command==

To remove one ore more Docker images, we can use the docker image rm command which has the syntax as the following:
<code bash>
docker image rm [OPTIONS] IMAGE [IMAGE...]
</code>

Some options:
Name, shorthand 	Default 	Description
–force, -f 	false 	Force removal of the image
–no-prune 	false 	Do not delete untagged parents

Let’s see an example which we will remove two Docker images hello-world and alpine:
<code bash>
docker image rm hello-world alpine
</code>

==1.2.2. Using the docker rmi command==

We can use the docker rmi, another Docker command to remove one or more Docker images. And the command has syntax as the following:
<code bash>
docker rmi [OPTIONS] IMAGE [IMAGE...]
</code>

Some options of the command:
Name, shorthand 	Default 	Description
–force, -f 	false 	Force removal of the image
–no-prune 	false 	Do not delete untagged parents
Let’s see the following example which we use the docker rmi command to delete Docker images: busybox and iron/node

<code bash>
docker rmi busybox iron/node
</code>

===1.3. Remove Unused Docker Images===

To remove unused Docker images, we can use the docker image prune command which has the syntax as the following:
<code bash>
docker image prune [OPTIONS]
</code>

Some options of the command:
Name, shorthand 	Default 	Description
–all, -a 	false 	Remove all unused Docker images, not just dangling ones
–filter 		Provide filter values (e.g. ‘until= ‘)
–force, -f 	false 	Do not prompt for confirmation

By default, the command just removes all dangling Docker images which are layers that have no relationship to any tagged images. By adding the -a option to the command, we can delete all used Docker images.

Let’s see the following example which we are going to delete all unused Docker images, not just dangling ones:
<code bash>
$  docker image prune -a
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N] y
Deleted Images:
untagged: alpine:latest
untagged: alpine@sha256:58e1a1bb75db1b5a24a462dd5e2915277ea06438c3f105138f97eb53149673c4
deleted: sha256:4a415e3663882fbc554ee830889c68a33b3585503892cc718a4698e91ef2a526
deleted: sha256:23b9c7b43573dd164619ad59e9d51eda4095926729f59d5f22803bcbe9ab24c2

Total reclaimed space: 3.984 MB
</code>

====2. Remove Docker Containers====
===2.1. List All Docker Containers===

In similar to removing Docker images, before we remove Docker containers, we have to know its name or id first. And we can use the docker ps command to list all Docker containers in our environment. Let’s refer to another tutorial for more basic Docker commands.

To list all Docker containers (default shows just running):
<code bash>
docker ps -a
</code>

Or we can use the new Docker syntax:
<code bash>
docker container ls -a
</code>

The sample output:
<code bash>
[vagrant@localhost ~]$ docker ps -a
CONTAINER ID    IMAGE      COMMAND             CREATED         STATUS                    PORTS NAMES
545ca8616836    busybox    "sh"                5 seconds ago   Exited (0) 4 seconds ago        wonderf
365c4ef9668a    alpine     "/bin/echo hello"   9 seconds ago   Exited (0) 8 seconds ago        youthfu
bdfc72b71d26    opensuse   "/bin/echo hello"   36 seconds ago  Exited (0) 34 seconds ago       elated
</code>

===2.2. Remove One or More Docker Containers===
==2.2.1. Using the docker container rm command==

We can use the docker container rm command which has the syntax as following, to remove one or more Docker containers:
<code bash>
docker container rm [OPTIONS] CONTAINER [CONTAINER...]
</code>

Some options:
Name, shorthand 	Default 	Description
–force, -f 	false 	Force removal of the running containers (use SIGKILL)
–link, -l 	false 	Remove the specified link
–volumes, -v 	false 	Remove the volumes associated with the container

Example:

To remove the containers which have IDs: 545ca8616836, 365c4ef9668a
<code bash>
docker container rm 545ca8616836 365c4ef9668a
</code>

==2.2.2. Using the docker rm command==

Another Docker command that can be used to remove one or more Docker containers is docker rm. Let’s see its syntax:
<code bash>
docker rm [OPTIONS] CONTAINER [CONTAINER...]
</code>

The command options are similar to the docker container rm command options.

Example:

To remove container has id: bdfc72b71d26
<code bash>
docker rm bdfc72b71d26
</code>

===2.3. Remove Stopped Docker Containers===

To remove stopped Docker containers, we can use the docker container prune command which has the syntax as the following:
<code bash>
docker container prune [OPTIONS]
</code>

Some command options:
Name, shorthand 	Default 	Description
–filter 		Provide filter values (e.g. ‘until= ‘)
–force, -f 	false 	Do not prompt for confirmation

Example:

Let’s list all containers:
<code bash>
[vagrant@localhost ~]$ docker  ps -a
CONTAINER ID  IMAGE    COMMAND              CREATED         STATUS                     PORTS NAMES
08539dbb5aaf  busybox  "sh"                 8 seconds ago   Exited (0) 7 seconds ago         musing_be
5c5dae751476  opensuse "tail -f /dev/null"  19 seconds ago  Up 18 seconds                    thirsty_y
</code>

Then remove all stopped containers:
<code bash>
[vagrant@localhost ~]$ docker container prune -f
Deleted Containers:
08539dbb5aaf440dc2a582d75783087e7304bd537881c34d59886cb8c91df52a
</code>

Let’s see the list of containers again:

<code bash>
[vagrant@localhost ~]$ docker  ps -a
CONTAINER ID  IMAGE     COMMAND             CREATED        STATUS        PORTS NAMES
5c5dae751476  opensuse  "tail -f /dev/null" 4 minutes ago  Up 4 minutes        thirsty_yalow
</code>

We can see that only the stopped busybox container was removed while the opensue container is still running.


====3. Remove Docker Networks====
===3.1. List All Docker Networks===

To list all Docker networks, we can use the docker network ls command which has syntax as below:
<code bash>
docker network ls [OPTIONS]
</code>

===3.2. Remove One or More Docker Networks===
==3.2.1. Using the docker network rm command==

We can use the docker network rm command which syntax is described as below, to remove one ore more Docker networks.
<code bash>
docker network rm NETWORK [NETWORK...]
</code>

===3.3. Remove All Unused Docker Networks===

To remove all unused Docker networks, we can use the docker network prune command which syntax is described as below:
<code bash>
docker network prune [OPTIONS]
</code>

Here are some command options:
Name, shorthand 	Default 	Description
–filter 		Provide filter values (e.g. ‘until= ‘)
–force, -f 	false 	Do not prompt for confirmation


====4. Remove Docker Volumes====
===4.1. List All Docker Volumes===

Before removing any Docker volume, we should know about it first. And to do that we can use the docker volume ls to list all Docker volumes. Let’s see the command syntax:

<code bash>
docker volume ls [OPTIONS]
</code>

Some options:
<code>
Name, shorthand 	Default 	Description
–filter, -f 		Provide filter values (e.g. ‘dangling=true’)
–format 		Pretty-print volumes using a Go template
–quiet, -q 	false 	Only display volume names
</code>

===4.2. Remove One or More Docker Volumes===

To remove one or more Docker volume, we can use the docker volume rm command which syntax is as below:

<code bash>
docker volume rm [OPTIONS] VOLUME [VOLUME...]

Name, 	shorthand 	Default 	Description
–force, -f 	 	false 		Force the removal of one or more volumes
</code>


Example:

To remove Docker volumes: data01, data02
<code bash>
docker volume rm data01 data02
</code>

===4.3. Remove All Unused Docker Volumes===

To remove all unused Docker volumes, we can use the docker volume prune command which has syntax as the following:
<code bash>
docker volume prune [OPTIONS]
</code>

Options:
Name, shorthand 	Default 	Description
–force, -f 	false 	Do not prompt for confirmation
Example:

<code bash>
docker volume prune -f
</code>

====5. Remove All Docker Unused Data====

To remove all Docker unused data which includes used images, stopped containers, unused networks and unused volumes, we can use the docker system prune command which has the following syntax:
<code bash>
docker system prune [OPTIONS]
</code>

Options:
Name, shorthand 	Default 	Description
–all, -a 	false 	Remove all unused images not just dangling ones
–filter 		Provide filter values (e.g. ‘until= ‘)
–force, -f 	false 	Do not prompt for confirmation

Example:
<code bash>
[vagrant@localhost ~]$ docker system prune
</code>
