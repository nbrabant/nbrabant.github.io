====05 - Attach and Detach from Docker Container====

====1. Overview====

This tutorial is going to cover how to attach and detach from Docker container. It could be necessary either to view its ongoing output or to control it interactively and then detach from it when we’re done.

====2. Attach to a Running Docker Container====

To attach to a running Docker container, we can use the docker attach command which has the syntax as the following:
<code bash>
docker attach [OPTIONS] CONTAINER
</code>

Here are some command’s options:
Name, shorthand 	Default 	Description
–detach-keys 	Table 	Override the key sequence for detaching a container
–no-stdin 	false 	Do not attach STDIN
–sig-proxy 	true 	Proxy all received signals to the process

Example:

We can attach to the same contained process multiple times simultaneously, screen sharing style, or quickly view the progress of our detached process.

Let’s say we have an opensuse docker and start it in background as the following:

<code bash>
<span class="hljs-comment"> docker run -d --name attachdemo opensuse /usr/bin/top -b</span>
</code>

To attach to the above running container, we can issue the following command:
<code bash>
[vagrant@localhost ~]$ docker attach attachdemo
</code>

Then, it will let us connect with the attachdemo container, and we can see the output of the top command.
<code bash>
[vagrant@localhost ~]$ docker attach attachdemo

top - 14:32:57 up  1:25,  0 users,  load average: 0.00, 0.02, 0.05
Tasks:   1 total,   1 running,   0 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.3 us,  0.3 sy,  0.0 ni, 99.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st

KiB Mem:   2842268 total,   421528 used,  2420740 free,    44892 buffers
KiB Swap:  1572860 total,        0 used,  1572860 free.   224344 cached Mem

PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
1 root      20   0   19648   1236    956 R 0.000 0.043   0:00.03 top
</code>

====3. Detach from a Docker Container====
===3.1. Detach from a Docker container and stop it===

To detach from a Docker container and stop it, we can use CTRL-c key sequence which will  send SIGKILL to the container. If –sig-proxy is true (the default),CTRL-c will send a SIGINT to the container.

===3.2. Detach from a Docker container and leave it running===

In general, to detach from a Docker container and leave it running, we can use the CTRL-p CTRL-q key sequence.

Points to note:

To detach from a Docker container, we often use CTRL-c, this often causes the container to be stopped. To work around, we can use the -sig-proxy is false when attach a running container.

Example:

Let’s start a Docker container:
<code bash>
<span class="hljs-comment"> docker run -d --name attachdemo opensuse /usr/bin/top -b</span>
</code>

And then attach to it with -sig-proxy
<code bash>
docker attach --sig-proxy=false attachdemo
</code>

Let’s use CTRL-c to detach from the container and then check its status:
<code bash>
docker ps
</code>

<code>
CONTAINER ID   IMAGE      COMMAND            CREATED        STATUS        PORTS  NAMES
4585c85708a2   opensuse   "/usr/bin/top -b"  31 seconds ago Up 30 seconds        attachdemo
</code>

We can see the container is still alive.

====4. Get Into a Docker Container====

When we attach to a running Docker container, we often need to control, monitor it or just simply for debugging purpose. In such a case, to execute an interactive bash shell on the container is most likely preferred. To do that, we can use the docker exec command which is used to run a command in a running container.

Example:

Let’s create a Docker container:
<code bash>
docker run -d --name attachdemo opensuse /usr/bin/top -b
</code>

And then execute an interactive bash shell on the above container:
<code bash>
docker exec -it attachdemo bash
</code>

Let’s see the terminal:

<code bash>
[vagrant@localhost ~]$ docker exec -it attachdemo bash
bash-4.3#
</code>

We now can do whatever with the bash and detach from a Docker container and leave it running by CTRL-c.
