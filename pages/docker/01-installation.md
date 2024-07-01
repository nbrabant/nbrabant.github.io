## 01 - Install Docker on Ubuntu 16.04, 15.10, 14.04

This tutorial is going to cover about how to install Docker on Ubuntu 16.04, 15.10, 14.04. I just wanted to summarize all basic steps so that Docker installation on Ubuntu is actually quite simple.

### 1. Preparation
####1.1 Check Kernel Version

Here are prerequisites to install Docker on Ubuntu 16.04, 15.10, 14.04

Your Ubuntu must be 64-bits OS
Docker requires kernel version should be 3.10 at minimum

You can do a quick check by using the following command:
```bash
uname -r
```


### 1.2. Update APT sources
####1.2.1. Executes below commands with root privilege to update APT package information and CA certificates##

This will make sure APT can get latest and related certificates of its repositories.
```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```

#### 1.2.2. Create a file at: /etc/apt/sources.list.d/docker.list

If the file was exist, empty the file content.

#### 1.2.3. Add below entry to the file.

If your OS is Ubuntu 16.04
```bash
deb https://apt.dockerproject.org/repo ubuntu-xenial main
```

You can do that by using vim, nano or any editor you prefer. Below is an example for my Ubuntu 16.04
```bash
sudo bash -c "echo 'deb https://apt.dockerproject.org/repo ubuntu-xenial main' > /etc/apt/sources.list.d/docker.list"
```

Or if your OS is Ubuntu 14.04
```bash
deb https://apt.dockerproject.org/repo ubuntu-trusty main
```

Or if your OS is Ubuntu 15.10
```bash
deb https://apt.dockerproject.org/repo ubuntu-wily main
```

#### 1.2.4 Update APT index and purge the old repositories (if exist)
```bash
sudo apt-get update
sudo apt-get purge lxc-docker
```

#### 1.2.5 Docker recommends to install linux-image-extra which allows us to use aufs storage driver
```bash
sudo apt-get install -y linux-image-extra-$(uname -r)
```

Done. You have finished the preparation. Next step will be the installation.


## 2. Install Docker on Ubuntu 16.04, 15.10, 14.04

Execute below steps in sequence to install Docker on Ubuntu 16.04, 15.10, 14.04.

### 2.1. Simply execute below command to install Docker
```bash
sudo apt-get install docker-engine
```

### 2.2. Start Docker daemon##
```bash
sudo service docker start
```

### 2.3 Verify the installation by execute below command
```bash
sudo docker run hello-world
```

You should see the result as below:

Install Docker on Ubuntu 16.04, 15.10, 14.04 - hello-world docker
```bash
sudo docker run hello-world
```


## 3. Additional Configurations
### 3.1. Avoid using sudo command when use docker commands####

By default, docker deamon run with root user. To avoid using sudo when use docker commands, we will create a group docker and add user to that group. According to the docker document, when the docker daemon starts, it makes the ownership of the Unix socket read/writable by the docker group.


### 3.1.1. Create docker group
```bash
sudo groupadd docker
```

#### 3.1.2. Add our desire user to that group
```bash
sudo usermod -aG docker vagrant
```

Currently, my user is vagrant


#### 3.1.3. Log out and log in again
#### 3.1.4. Verify that we don’t need sudo anymore
```bash
docker run hello-world
```


## 4. Uninstall Docker

Below are steps to uninstall Docker on Ubuntu 16.04, 15.10, 14.04.


### 4.1. Uninstall Docker engine
```bash
sudo apt-get purge docker-engine
```

### 4.2. Uninstall all related dependent packages
```bash
sudo apt-get autoremove --purge docker-engine
```

### 4.3. Remove all images, containers, volumes
```bash
sudo rm -rf /var/lib/docker
```

As for custom configuration files created , you have to delete by yourselves.
