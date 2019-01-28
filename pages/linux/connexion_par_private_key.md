====Mise en place d'une connexion par clé privée====

===Principe de la connexion===

You must generate both a public and a private key pair. For example:

{{:linux:ssh-welcome-setup.png?600|}}

Where,
<code>
server1.cyberciti.biz – You store your public key on the remote hosts and you have an accounts on this Linux/Unix based server.
client1.cyberciti.biz – Your private key stays on the desktop/laptop/ computer (or local server) you use to connect to server1.cyberciti.biz server.
</code>

Do not share or give your private file to anyone.
In public key based method you can log into remote hosts and server, and transfer
files to them, without using your account passwords. Feel free to replace server1.cyberciti.biz
and client1.cyberciti.biz names with your actual setup. Enough talk,
let’s set up public key authentication.

===Création de la paire private/public===

Open the Terminal and type following commands if .ssh directory does not exists:

<code bash>
mkdir ~/.ssh && chmod 700 ~/.ssh
</code>

Ensuite, il faut générer la paire de clé en utilisant la commande ssh-keygen

<code bash>
ssh-keygen -t rsa
</code>

The following syntax specifies the 4096 of bits in the RSA key to creation (default 2048):
<code bash>
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -C "My web-server key"
</code>

Where,
<code>
-t rsa : Specifies the type of key to create. The possible values are “rsa1” for protocol version 1 and “dsa”, “ecdsa”, “ed25519”, or “rsa” for protocol version 2.
-b 4096 : Specifies the number of bits in the key to create
-f ~/.ssh/vps-cloud.web-server.key : Specifies the filename of the key file.
-C "My web-server key" : Set a new comment.
</code>


Après la configuration de la clé, le terminal affichera en output

<code bash>
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/vivek/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/vivek/.ssh/id_rsa.
Your public key has been saved in /Users/vivek/.ssh/id_rsa.pub.
The key fingerprint is:
80:5f:25:7c:f4:90:aa:e1:f4:a0:01:43:4e:e8:bc:f5 vivek@desktop01
The key's randomart image is:
+--[ RSA 2048]----+
| oo    ...+.     |
|.oo  .  .ooo     |
|o .o. . .o  .    |
| o ...+o.        |
|  o .=.=S        |
| .  .Eo .        |
|                 |
|                 |
|                 |
+-----------------+
</code>

You need to set the Key Pair location and name. I recommend you use the default location if you do not yet have another key there, for example: $HOME/.ssh/id_rsa. You will be prompted to supply a passphrase (password) for your private key. I suggest that you setup a passphrase when prompted. You should see two new files in $HOME/.ssh/ directory:

<code bash>
$HOME/.ssh/id_rsa– contains your private key.
$HOME/.ssh/id_rsa.pub – contain your public key.
</code>

===Récupération de serveur à serveur===

Utiliser la commande scp afin de récupérer la clé publique depuis le serveur distant

<code bash>
scp {{user}}@{{server-ip}}:~/.ssh/id_rsa.pub ~/.ssh/authorized_keys/{{keyname}}.pub
</code>

Avec cette commande, il vous est requis le mot de passe du serveur distant, nous allons voir comment modifier cela dans la suite

===Mise en place de la connexion par clé===

Depuis un terminal, taper la commande ps -e | grep [s]sh-agent afin de savoir si le ssh-agent est en cours d'execution

Si ce n'est pas le cas, le démarrer avec la commande

<code bash>
ssh-agent /bin/bash
</code>

Il faut ensuite exécuter la commande ssh-add. cette commande, sans paramètre, ajoute la clé privée id_rsa à la liste des clés du ssh-agent

De retour sur le poste, en exécutant une connexion ssh depuis un terminal, il est possible désormais de se connecter dans saisir de mot de passe


<code bash>
#!/usr/bin/expect -f
spawn ssh-add /home/user/.ssh/id_rsa
expect "Enter passphrase for /home/user/.ssh/id_rsa:"
send "passphrase\n";
expect "Identity added: /home/user/.ssh/id_rsa (/home/user/.ssh/id_rsa)"
interact
</code>
