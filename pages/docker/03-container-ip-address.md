====03 - How To Get Docker Container’s IP Address====

This quick tutorial is going to cover how to get Docker container’s IP address from host machine or inside a Docker container.
====1. Get ID or Name of a Docker Container====

We’re going to review how to get ID or name of a Docker container first because they’re prerequisite to get Docker container’s IP address. You can refer to another tutorial for more basic Docker commands.

To get ID or name of a Docker container, we can issue the following command from the host machine:

<code bash>
docker ps
</code>

By default, the command shows all running containers as the following:

<code>
CONTAINER ID  IMAGE                   CREATED         STATUS        PORTS   NAMES
260f108e4271  wurstmeister/kafka      2 minutes ago   Up 2 minutes          tender_gates
4a432e03f0c3  wurstmeister/zookeeper  3 minutes ago   Up 3 minutes  22/tcp  naughty_mestorf
</code>

We can show all containers by adding the -a option for the command:
<code bash>
docker ps -a
</code>

We can filter by using | operator:
<code bash>
docker ps -a | grep kafka
</code>

After getting the ID or name of the Docker container, we can go ahead to get its IP address.
====2. Get Docker Container’s IP Address from Host Machine====
===2.1. Get IP Address of a Single Docker Container===

The command can be used to get Docker container’s IP address is docker inspect with some options:

<code bash>
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_id_or_name
</code>

Let’s see an example which we will get IP address of a Docker container which has ID 4a432e03f0c3:

<code bash>
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 4a432e03f0c3
172.17.0.2
</code>

With old version of Docker, we can use the following syntax:

<code bash>
docker inspect --format '{{ .NetworkSettings.IPAddress }}' container_id_or_name
</code>

Let’s see an example:
<code bash>
vagrant@geeksgn:~$ docker inspect --format '{{ .NetworkSettings.IPAddress }}' 4a432e03f0c3
172.17.0.2
</code>

===2.2. Get IP Addresses of All Docker Containers===

We can tune the above commands to get IP addresses of all Docker containers in just one single command:
<code bash>
docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
</code>

Here is the output on my environment:

<code bash>
$ docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
/mad_visvesvaraya - 172.17.0.3
/naughty_mestorf - 172.17.0.2
/grave_keller -
</code>

With old version of Docker, we can use the following syntax:

<code bash>
docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress }}' $(docker ps -aq)
</code>

The output can be:

<code bash>
$ docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress }}' $(docker ps -aq)
/mad_visvesvaraya - 172.17.0.3
/naughty_mestorf - 172.17.0.2
/grave_keller -
</code>

Another command that can be used to get Docker IP address is docker container inspect. In similar to the docker inspect command, it is mainly used for displaying detailed information on one or more containers. However, we can leverage it to get Docker IP address.

For example, let’s get IP addresses of all Docker containers:

<code bash>
docker container inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
</code>

====3. Get IP Address of a Docker Container from Inside Container====
===3.1. Get in a Docker Container===

To get IP address of a Docker container from inside, we can get in it first by using the docker exec command:

<code bash>
docker exec -it container_id_or_name bash
</code>

For example, let’s get in a docker container which sas id: 4a432e03f0c3

<code bash>
docker exec -it 4a432e03f0c3 bash
</code>

===3.3. Get IP Address of a Docker Container===

After getting in the docker container, we can issue normal Linux command to get Docker container’s IP address,  for example:

<code bash>
ip addr
</code>

or

<code bash>
ip addr | grep global
inet 172.17.0.2/16 scope global eth0
</code>

or

<code bash>
/sbin/ip route|awk '/default/ { print $3 }'
</code>
