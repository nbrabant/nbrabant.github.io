====01 - Install Vagrant on Ubuntu 16.04 LTS (Xenial Xerus)====

In this post, I’d like to show how to install Vagrant on Ubuntu 16.04. We may have 2 approaches to install Vagrant on Ubuntu.

    Use apt-get to install Vagrant from the repository of the distribution
    Download proper binary package from the Vagrant download page and install it normally.

We will try both of them.
Install Vagrant On Ubuntu 16.04

Install Vagrant On Ubuntu 16.04
1. Use apt-get to install Vagrant

We will use apt-get to install Vagrant from distribution repository. Note that if we use this approach, we may not have the latest version of Vagrant as the second way.
1.1. Update the packages info from repositories

sudo apt-get update
1
2
3


sudo apt-get update

1.2. Check the Vagrant package info (optional)

We can check for the information of the Vagrant package currently.

apt-cache show vagrant
1
2
3


apt-cache show vagrant


The output should be similar to:

Package: vagrant
Priority: optional
Section: universe/admin
Installed-Size: 2466
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Original-Maintainer: Antonio Terceiro <terceiro@debian.org>
Architecture: all
Version: 1.8.1+dfsg-1
Depends: bsdtar, bundler, curl, openssh-client, ruby-childprocess (>= 0.3.7), ruby-erubis (>= 2.7.0), ruby-i18n (>= 0.6.0), ruby-listen, ruby-log4r (>= 1.1.9), ruby-net-scp (>= 1.1.0), ruby-net-sftp, ruby-net-ssh (>= 1:2.6.6), ruby-rest-client, ruby-nokogiri, ruby-rb-inotify, ruby
Suggests: virtualbox (>= 4.0)
Filename: pool/universe/v/vagrant/vagrant_1.8.1+dfsg-1_all.deb
...
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


Package: vagrant
Priority: optional
Section: universe/admin
Installed-Size: 2466
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Original-Maintainer: Antonio Terceiro <terceiro@debian.org>
Architecture: all
Version: 1.8.1+dfsg-1
Depends: bsdtar, bundler, curl, openssh-client, ruby-childprocess (>= 0.3.7), ruby-erubis (>= 2.7.0), ruby-i18n (>= 0.6.0), ruby-listen, ruby-log4r (>= 1.1.9), ruby-net-scp (>= 1.1.0), ruby-net-sftp, ruby-net-ssh (>= 1:2.6.6), ruby-rest-client, ruby-nokogiri, ruby-rb-inotify, ruby
Suggests: virtualbox (>= 4.0)
Filename: pool/universe/v/vagrant/vagrant_1.8.1+dfsg-1_all.deb
...


Note that the current version is 1.8.1+dfsg-1
1.3. Install Vagrant

sudo apt-get install vagrant
1
2
3


sudo apt-get install vagrant

You have to confirm “Y” when you’re asked.

1.4. Verify the installation.

We can verify the installation by issue command to check the installed version of Vagrant.

Vagrant 1.8.1
1
2
3


Vagrant 1.8.1


We have installed Vagrant 1.8.1 on our Ubuntu 16.04
2. Download Vagrant package and install it manually.

Vagrant download page provides the latest version of Vagrant. The current version is 1.8.5, both 32-bit and 64-bit. You should select proper version for your machine. Currently, I will download the 64-bit version. Note that we will download the package built for Debian.

wget https://releases.hashicorp.com/vagrant/1.8.5/vagrant_1.8.5_x86_64.deb
1
2
3


wget https://releases.hashicorp.com/vagrant/1.8.5/vagrant_1.8.5_x86_64.deb


After finishing the download, we can install it by:

sudo dpkg -i vagrant_1.8.5_x86_64.deb
1
2
3


sudo dpkg -i vagrant_1.8.5_x86_64.deb


Vagrant will be installed quickly after that. We can verify the installation by issue a command to check its version:

vagrant -v
1
2
3


vagrant -v


The output on my terminal:

Vagrant 1.8.5
1
2
3


Vagrant 1.8.5


We have installed Vagrant 1.8.5 on Ubuntu 16.04 successfully.
3. Uninstall Vagrant on Ubuntu 16.04

If you install Vagrant by using apt-get, you can issue below command to uninstall it.

sudo apt-get remove vagrant
1
2
3


sudo apt-get remove vagrant


Confirm “Y” when you are asked.

If you install Vagrant by using debian package, you can uninstall it by:

sudo dpkg -r vagrant
1
2
3


sudo dpkg -r vagrant
