====Post installation Linux Debian/Ubuntu====

===NodeJS===
<code bash>
curl --silent --location https://deb.nodesource.com/setup_4.x | bash -
apt-get update
</code>

==Install Node==
<code bash>
apt-get install -y nodejs
/usr/bin/npm install -g gulp
/usr/bin/npm install -g browser-sync
</code>

===CURL===
<code bash>
apt-get install -y software-properties-common curl
</code>

===Install Some Basic Packages===
<code bash>
apt-get install -y build-essential dos2unix gcc git libmcrypt4 libpcre3-dev \
make re2c supervisor unattended-upgrades whois vim libnotify-bin htop
</code>

===Install PHP Stuffs===

==environement LAMP==
<code bash>
sudo apt install apache2 php mysql-server libapache2-mod-php php-mysql
</code>

==php extensions==
<code bash>
apt-get install -y php-cli php-dev php-pear \
php-mysql php-pgsql php-apcu php-json php-curl php-gd \
php-gmp php-imap php-mcrypt php-xdebug php-memcached
</code>

==Make MCrypt Available==
<code bash>
ln -s /etc/php/conf.d/mcrypt.ini /etc/php/mods-available
phpenmod mcrypt
</code>

==Install Composer globally==
<code bash>
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
</code>

==Set Some PHP CLI Settings==
<code bash>
sed -i "s/error_reporting = ./error_reporting = E_ALL/" /etc/php/cli/php.ini
sed -i "s/display_errors = ./display_errors = On/" /etc/php/cli/php.ini
sed -i "s/memory_limit = .*/memory_limit = 512M/" /etc/php/cli/php.ini
</code>

===GIT===

==git assume==

A mettre dans ton ~/.gitconfig

<code>
[alias]
assume = update-index --assume-unchanged
unassume = update-index --no-assume-unchanged
assumed = "!git ls-files -v | grep ^h | cut -c 3-"
</code>

Comme ça tu peux faire git assume fichier, git unassume fichier et git assumed pour voir la liste des ignorés
