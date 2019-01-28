====Gestion users et groups====

===Chemin vers les différents fichiers de config===
	* /etc/passwd – Contains one line for each user account.
	* /etc/shadow – Contains the password information in encrypted formatfor the system’s accounts and optional account aging information.
	* /etc/group – Defines the groups on the system.
	* /etc/default/useradd – This file contains a value for the default group, if none is specified by the useradd command.
	* /etc/login.defs – This file defines the site-specific configuration for the shadow password suite stored in /etc/shadow file.

===Ajout d'utilisateur===
La commande 'useradd' permet d'ajouter un utilisateur suivant cette syntaxe :
<code bash>
useradd -G {group-name} username
</code>

Vérifier qu'un utilisateur n'existe pas :
<code bash>
grep ^vivek /etc/passwd
</code>

Ajout d'un nouvel utilisateur à un groupe :
<code bash>
useradd -G developers vivek
</code>

Modification du mot de passe d'un utlisateur :
<code bash>
passwd vivek
</code>


===Ajout de groupe===
<code bash>
groupadd developers
</code>


===Ajout d'un utilisateur existant à un groupe===
<code bash>
usermod -g www tony
</code>

^ Options				^ Purpose																	^
| -a					| Add the user to the supplementary group(s). Use only with the -G option.	|
| --append				| :::																		|
| -g GROUP				| Use this GROUP as the default group.										|
| --gid GROUP			| :::																		|
| -G GRP1,GRP2			| Add the user to GRP1,GRP2 secondary group.								|
| --groups GRP1,GRP2	| :::																		|
