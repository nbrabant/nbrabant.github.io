====Compilation croisée====

===Introduction===

Dans le cas de compilation de vers des architectures avec des ressources limitées de type ARM (Raspberry PI par exemple),
l'idéal est de procéder à une compilation croisée. Il s'agit de compiler sur une machine plus puissante pour l'autre.
En théorie, ce n'est pas compliqué. En pratique, c'est autre chose, car pour compiler le compilateur croisé vous aurez entre autres
besoin d'un compilateur hôte, d'outils pour la cible (binutils), ou encore des bibliothèques C adaptées (libc).
Cette dernière phrase un peu incompréhensible juste pour vous dire que les choses ne sont pas si évidentes.

Heureusement, des outils tels que crosstool-NG existent afin de fabriquer sur mesure les outils afin de réaliser du cross-compiling

===Installation des outils===

Sous Debian, il faudra installer les outils bzip2, build-essential, bison, flex, gperf, texinfo, gawk, libtool, automake, libncurses5-dev, help2man et subversion

<code bash>
sudo apt-get install bzip2 build-essential bison flex gperf texinfo gawk libtool automake libncurses5-dev help2man subversion
</code>

A cela, il faudra ajouter les outils de compilation GCC et Make avant de télécharger le projet crosstool-ng

<code bash>
# 1.23.0 est la dernière version au moment où j'écris
export VERSION=1.23.0
wget http://crosstool-ng.org/download/crosstool-ng/crosstool-ng-1.23.0.tar.bz2
tar xjf crosstool-ng-1.23.0.tar.bz2
cd crosstool-ng-1.23.0
./configure --prefix=/opt/crosstool-ng
make
sudo make install
</code>

===Configuration de crosstoll-ng===

L'installation n'a installé que les scripts nécessaires sur la machine afin de pouvoir fabriquer les outils de compilation croisée.
Cette étape permet de déterminer les outils dont on a besoin. Pour sélectionner la toolchain, l'outil propose une interface
*menuconfig* familière aux compilateur de noyaux Linux.

<code bash>
cd
export PATH="${PATH}:/opt/crosstool-ng/bin"

# Créer un dossier pour la configuration des outils à construire
# Attention: ce n'est pas là que les outils seront installés à la fin!
mkdir my-toolchain
cd my-toolchain

# Configuration de la toolchain à fabriquer
ct-ng menuconfig
</code>

Dans le menuconfig, vous aurez un certain nombre d'options à modifier afin de créer une toolchain ARM pour Raspberry PI :

1. Dans le menu *Path and miscs options* :
  * Cocher *Try feature marked as experimental* (qui permettra de définir le compilateur ultérieurement)
  * Vous pouvez modifier l'emplacement d'installation de la toolchain (par défaut, ${HOME}/x-tools/${CT_TARGET})
2. Dans le menu Target options :
  * Pour Target architecture, choissiez ARM (micro-controlleur utilisé sur les Raspberry PI)
  * Pour Endianness, vérifier que little endian est sélectionné
  * Enfin, vérifiez que bitness est en 32 bits
3. Dans le menu Operating System :
  * Changer Target OS pour Linux
4. Dans le menu Binary utilities :
  * Choissiez une version récente de binutils (2.28 à l'heure actuelle)
5. Dans le menu C Compiler :
  * Activer le compilateur linaro
  * Dans gcc version, choissiez un compilateur linaro recent
6. Enregistrer

===Construction de la toolchain===

Une fois la configuration des outils effectuée, il faudra build la solution, et c'est à crosstool-ng de jouer en se basant sur la configuration établie précédemment :

<code bash>
ct-ng build
</code>

Crosstool-ng va téléchahrger et décompresser les sources nécessaires puis compiler et installer la toolchain. En fonction de la puissance de votre machine et la qualité de votre bande passante, l'opération peut durer environ 1h30.
En cas d'erreur de build, vérifier dans le journal build.log afin de détecter et corriger l'erreur.
