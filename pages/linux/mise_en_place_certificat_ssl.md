====Mise en place certificat SSL====

===1. Génération de la paire de clés private/certificat CSR===

<code bash>
openssl req -new -newkey rsa:4096 -nodes -sha256 -out certificat.csr -keyout certificat.key
</code>

===2. Demande de certificat SSL===


===3. Installation du certificat SSL===
