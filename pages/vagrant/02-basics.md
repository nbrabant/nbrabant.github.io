====02 - Basic Vagrant Commands====

Below are some basic Vagrant commands that often be used when we work with Vagrant.

Basic Vagrant Commands - Vagrant CLI
1. Vagrant commands used for boxes

This section covers some basic Vagrant commands that can be used to manage Vagrant boxes.
1.1. Check current version

vagrant --version
1
2
3


vagrant --version

or

vagrant -v
1
2
3


vagrant -v

The output should be similar to below:

Vagrant 1.8.1
1
2
3


Vagrant 1.8.1

These commands also can be to check whether Vagrant is ready to work on our environment or not.

1.2. List all boxes

We may need to list all the boxes on our PCs, even just to know the names.

vagrant box list
1
2
3


vagrant box list


An example output on my console:

centos/7        (virtualbox, 1603.01)
ubuntu/trusty64 (virtualbox, 20160406.0.0)
1
2
3
4


centos/7        (virtualbox, 1603.01)
ubuntu/trusty64 (virtualbox, 20160406.0.0)


1.3. Add a box


vagrant box add ADDRESS
1
2
3


vagrant box add ADDRESS


1.3.1. A shorthand name of box

If we start the VM, Vagrant will download the box from the public catalog of available Vagrant images

vagrant box add ubuntu/trusty64-juju
1
2
3


vagrant box add ubuntu/trusty64-juju


1.3.2. Add a remote box specified by URL


vagrant box add https://atlas.hashicorp.com/ubuntu/boxes/trusty64
1
2
3


vagrant box add https://atlas.hashicorp.com/ubuntu/boxes/trusty64


1.3.3. Add a local box


vagrant box add CentOS7.1 file:///D:/Work/VagrantBoxes/CentOS-7.1.1503-x86_64-netboot.box
1
2
3


vagrant box add CentOS7.1 file:///D:/Work/VagrantBoxes/CentOS-7.1.1503-x86_64-netboot.box


Another article relates to adding the local box on Vagrant:Add Local Box To Vagrant
1.4. Remove a box

vagrant box remove NAME
1
2
3


vagrant box remove NAME

Note that because a box may have many versions and providers (VirtualBox, VMWare), you may need to list all the box first in order to know which one should be removed.

To list all the boxes, you can use the command: vagrant box list. For example,

$ vagrant box list
centos7               (virtualbox, 0)
morungos-centos67.box (virtualbox, 0)
ub14                  (virtualbox, 0)
ubuntu/xenial64       (virtualbox, 20160721.0.0)
ubuntu/xenial64       (virtualbox, 20160830.0.0)
ubuntu16.04           (virtualbox, 0)
ubuntu16.04trusty     (virtualbox, 0)
1
2
3
4
5
6
7
8
9
10


$ vagrant box list
centos7               (virtualbox, 0)
morungos-centos67.box (virtualbox, 0)
ub14                  (virtualbox, 0)
ubuntu/xenial64       (virtualbox, 20160721.0.0)
ubuntu/xenial64       (virtualbox, 20160830.0.0)
ubuntu16.04           (virtualbox, 0)
ubuntu16.04trusty     (virtualbox, 0)


1.4.1. Remove a box with shorthand name


vagrant box remove ubuntu16.04
1
2
3


vagrant box remove ubuntu16.04


1.4.2. Remove a box with specific version


vagrant box remove ubuntu/xenial64 --box-version=20160721.0.0
1
2
3


vagrant box remove ubuntu/xenial64 --box-version=20160721.0.0


2. Vagrant commands for virtual machines (VMs)

This section list all basic Vagrant commands that can be used with Vagrant virtual machines which were created from Vagrant Boxes
2.5. Check global status of all VMs

vagrant global-status
1
2
3


vagrant global-status

For example, here is the list of VMs and their states on my machine.

$ vagrant global-status
id       name        provider   state    directory

-----------------------------------------------------------
105c303  workstation virtualbox poweroff D:/Working/vagrant/centos7
bd1f511  default     virtualbox running  D:/Working/vagrant/centos7-3
f19b559  default     virtualbox poweroff D:/Working/vagrant/centos1
2c24ad6  default     virtualbox poweroff D:/Working/vagrant/ubuntu16.04
1
2
3
4
5
6
7
8
9
10


$ vagrant global-status
id       name        provider   state    directory

-----------------------------------------------------------
105c303  workstation virtualbox poweroff D:/Working/vagrant/centos7
bd1f511  default     virtualbox running  D:/Working/vagrant/centos7-3
f19b559  default     virtualbox poweroff D:/Working/vagrant/centos1
2c24ad6  default     virtualbox poweroff D:/Working/vagrant/ubuntu16.04

2.6. Initialize a new VM

vagrant init ubuntu/trusty64-juju
1
2
3


vagrant init ubuntu/trusty64-juju

This command will create a configuration file named Vagrantfile in the current directory. The content is similar as below:

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64-juju"
end
1
2
3
4
5


Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64-juju"
end

When we start Vagrant in this directory, Vagrant will download the box: ubuntu/trusty64-juju from the internet to local and use it as the image of the VM.

If you want to search for the boxes, you can go to Hashicorp website
2.7. Start a VM

vagrant up
1
2
3


vagrant up

If we want to start any VM, simply go to the folder which the Vagrantfile exist. The command will start the VM and the output console is as below:

Bringing machine 'default' up with 'virtualbox' provider...
==> default: Box 'ubuntu/trusty64-juju' could not be found. Attempting to find a
nd install...
    default: Box Provider: virtualbox
    default: Box Version: >= 0
==> default: Loading metadata for box 'ubuntu/trusty64-juju'
    default: URL: https://atlas.hashicorp.com/ubuntu/trusty64-juju
==> default: Adding box 'ubuntu/trusty64-juju' (v20160707.0.1) for provider: vir
tualbox
    default: Downloading: https://atlas.hashicorp.com/ubuntu/boxes/trusty64-juju
/versions/20160707.0.1/providers/virtualbox.box
==> default: Waiting for cleanup before exiting...

    default: Progress: 0% (Rate: 0/s, Estimated time remaining: --:--:--):--)
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16


Bringing machine 'default' up with 'virtualbox' provider...
==> default: Box 'ubuntu/trusty64-juju' could not be found. Attempting to find a
nd install...
    default: Box Provider: virtualbox
    default: Box Version: >= 0
==> default: Loading metadata for box 'ubuntu/trusty64-juju'
    default: URL: https://atlas.hashicorp.com/ubuntu/trusty64-juju
==> default: Adding box 'ubuntu/trusty64-juju' (v20160707.0.1) for provider: vir
tualbox
    default: Downloading: https://atlas.hashicorp.com/ubuntu/boxes/trusty64-juju
/versions/20160707.0.1/providers/virtualbox.box
==> default: Waiting for cleanup before exiting...

    default: Progress: 0% (Rate: 0/s, Estimated time remaining: --:--:--):--)

2.8. SSH to the VM

vagrant ssh
1
2
3


vagrant ssh

If you want to ssh to the VM, simply go to the folder has the Vagrantfile and issue above command. Note that the command only works if we have ssh client installed on the host machine. For Windows machine, we often don’t have it. To make sure the command will work on the Windows, please refer to this article: Running Vagrant SSH on Windows

2.9. Shutdown the VM

imply go to the folder has the Vagrantfile and issue below command

vagrant halt
1
2
3


vagrant halt


2.10. Destroy the VM


vagrant destroy [name|id]
1
2
3


vagrant destroy [name|id]


Example:

vagrant destroy ubuntu/trusty64-juju
1
2
3


vagrant destroy ubuntu/trusty64-juju


This command will stop the VM and destroy all resources that were created during the machine creation process.
