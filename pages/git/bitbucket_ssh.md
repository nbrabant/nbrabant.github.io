====Configurer SSH pour Git====

===S'assurer que SSH est bien installé===

Depuis un terminal, taper la commande :
<code bash>
ssh -V
</code>

Si SSH est installé, le terminal renvoi les informations de version :
<code bash>
OpenSSH_5.6p1, OpenSSL 0.9.8r 8 Feb 2011
usage: ssh [-1246AaCfgKkMNnqsTtVvXxYy] [-b bind_address] [-c cipher_spec]
           [-D [bind_address:]port] [-e escape_char] [-F configfile]
           [-I pkcs11] [-i identity_file]
           [-L [bind_address:]port:host:hostport]
           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
[-R [bind_address:]port:host:hostport] [-S ctl_path]
           [-W host:port] [-w local_tun[:remote_tun]]
           [user@]hostname [command]>
</code>

Lister ensuite le contenu du dossier ~/.ssh
<code bash>
ls -a ~/.ssh
</code>

Si un utilisateur n'a pas encore été défini, il faut créer la paire de clé privée/publique

===Créer l'utilisateur par défaut===

Pour l'utilisation de plusieurs identité, se référer à la [[https://confluence.atlassian.com/bitbucket/configure-multiple-ssh-identities-for-gitbash-mac-osx-linux-271943168.html|documentation Atlassian]]

Depuis un terminal, utiliser la commande ssh-keygen
<code bash>
ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (~/.ssh/id_rsa):
Created directory '~/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in ~/.ssh/id_rsa.
Your public key has been saved in ~/.ssh/id_rsa.pub.
The key fingerprint is:
4c:80:61:2c:00:3f:9d:dc:08:41:2e:c0:cf:b9:17:69 emmap1@myhost.local
The key's randomart image is:
+--[ RSA 2048]----+
|*o+ooo.          |
|.+.=o+ .         |
|. *.* o .        |
| . = E o         |
|    o . S        |
|   . .           |
|     .           |
|                 |
|                 |
+-----------------+
</code>

===Démarrer le ssh-agent et charger les clés===

Depuis un terminal, taper la commande ps -e | grep [s]sh-agent afin de savoir si le ssh-agent est en cours d'execution
<code bash>
ps -e | grep [s]sh-agent
9060 ?? 0:00.28 /usr/bin/ssh-agent -l
</code>

Si ce n'est pas le cas, le démarrer avec la commande
<code bash>
ssh-agent /bin/bash
</code>

Ajouter l'identité au ssh-agent
<code bash>
ssh-add ~/.ssh/id_rsa
Enter passphrase for /Users/emmap1/.ssh/id_rsa:
Identity added: /Users/emmap1/.ssh/id_rsa (/Users/emmpa1/.ssh/id_rsa)
</code>

Pour connaitre la liste des identités ajoutées au ssh-agent
<code bash>
ssh-add -l
</code>

===Complément de documentation===
[[https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html|Voir la documentation Bitbucket]]
