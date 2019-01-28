====01 - Install Docker on Ubuntu 16.04, 15.10, 14.04====

This tutorial is going to cover about how to install Docker on Ubuntu 16.04, 15.10, 14.04. I just wanted to summarize all basic steps so that Docker installation on Ubuntu is actually quite simple.

====1. Preparation====
===1.1 Check Kernel Version===

Here are prerequisites to install Docker on Ubuntu 16.04, 15.10, 14.04

Your Ubuntu must be 64-bits OS
Docker requires kernel version should be 3.10 at minimum

You can do a quick check by using the following command:
<code bash>
uname -r
</code>


===1.2. Update APT sources===
==1.2.1. Executes below commands with root privilege to update APT package information and CA certificates==

This will make sure APT can get latest and related certificates of its repositories.
<code bash>
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
</code>

==1.2.2. Create a file at: /etc/apt/sources.list.d/docker.list==

If the file was exist, empty the file content.

==1.2.3. Add below entry to the file.==

If your OS is Ubuntu 16.04
<code bash>
deb https://apt.dockerproject.org/repo ubuntu-xenial main
</code>

You can do that by using vim, nano or any editor you prefer. Below is an example for my Ubuntu 16.04
<code bash>
sudo bash -c "echo 'deb https://apt.dockerproject.org/repo ubuntu-xenial main' > /etc/apt/sources.list.d/docker.list"
</code>

Or if your OS is Ubuntu 14.04
<code bash>
deb https://apt.dockerproject.org/repo ubuntu-trusty main
</code>

Or if your OS is Ubuntu 15.10
<code bash>
deb https://apt.dockerproject.org/repo ubuntu-wily main
</code>

==1.2.4 Update APT index and purge the old repositories (if exist)==
<code bash>
sudo apt-get update
sudo apt-get purge lxc-docker
</code>

==1.2.5 Docker recommends to install linux-image-extra which allows us to use aufs storage driver==
<code bash>
sudo apt-get install -y linux-image-extra-$(uname -r)
</code>

Done. You have finished the preparation. Next step will be the installation.


===2. Install Docker on Ubuntu 16.04, 15.10, 14.04===

Execute below steps in sequence to install Docker on Ubuntu 16.04, 15.10, 14.04.

==2.1. Simply execute below command to install Docker==
<code bash>
	sudo apt-get install docker-engine
</code>

==2.2. Start Docker daemon==
<code bash>
sudo service docker start
</code>

==2.3 Verify the installation by execute below command==
<code bash>
sudo docker run hello-world
</code>

You should see the result as below:

Install Docker on Ubuntu 16.04, 15.10, 14.04 - hello-world docker
<code bash>
sudo docker run hello-world
</code>


====3. Additional Configurations====
===3.1. Avoid using sudo command when use docker commands===

By default, docker deamon run with root user. To avoid using sudo when use docker commands, we will create a group docker and add user to that group. According to the docker document, when the docker daemon starts, it makes the ownership of the Unix socket read/writable by the docker group.


==3.1.1. Create docker group==
<code bash>
sudo groupadd docker
</code>

==3.1.2. Add our desire user to that group==
<code bash>
sudo usermod -aG docker vagrant
</code>

Currently, my user is vagrant


===3.1.3. Log out and log in again===
==3.1.4. Verify that we don’t need sudo anymore==
<code bash>
docker run hello-world
</code>


====4. Uninstall Docker====

Below are steps to uninstall Docker on Ubuntu 16.04, 15.10, 14.04.


===4.1. Uninstall Docker engine===
<code bash>
sudo apt-get purge docker-engine
</code>

===4.2. Uninstall all related dependent packages===
<code bash>
sudo apt-get autoremove --purge docker-engine
</code>

===4.3. Remove all images, containers, volumes===
<code bash>
sudo rm -rf /var/lib/docker
</code>

As for custom configuration files created , you have to delete by yourselves.
