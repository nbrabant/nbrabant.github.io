====Sécurité sur serveur Linux====

===Mise en place d'une iptable===

==Principe==

Le logiciel iptable permet de configurer le pare-feu linux

==Mise en place==

Installation :

<code>
apt-get install iptables
</code>

Déclaration des règles :

Dans le fichier /etc/init.d/firewall, ajouter

1. **filtrage de toute les règles** :
<code>
iptables -t filter -F
iptables -t filter -X
</code>

2. **Blocage de tout le trafic par défaut** (ne pas lancer le script tout de suite sous peine de tout bloquer) :
<code>
iptables -t filter -P INPUT DROP
iptables -t filter -P FORWARD DROP
iptables -t filter -P OUTPUT DROP
</code>

3. On ne ferme pas les connexions déjà établies
<code>
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
</code>

4. On autorise le loopback (on ne va pas se bloquer nous-mêmes !)
<code>
iptables -t filter -A INPUT -i lo -j ACCEPT
iptables -t filter -A OUTPUT -o lo -j ACCEPT
</code>

5. Pour finir, on ouvre les ports
<code>
# exemple pour le port 80
iptables -t filter -A OUTPUT -p tcp --dport 80 -j ACCEPT
iptables -t filter -A INPUT -p tcp --dport 80 -j ACCEPT
</code>

6. Avant de lancer le firewall
<code>
chmod +x /etc/init.d/firewall
/etc/init.d/firewall
</code>

===Mise en place d'un fail2ban===

==Principe==

Permet de bloquer le brute-force, les dictionnaire et les denis de service

==Mise en place==

<code>
# installation
apt-get install fail2ban

# configuration
nano /etc/fail2ban/jail.conf
</code>

Options :
- **destemail** : indiquez une adresse mail si vous voulez recevoir des mails d’alerte de la part de fail2ban.
- **bantime** : temps de bannissement des IP suspectes ;
- **maxretry** : nombre de tentatives de connexion permise avant bannissement.
