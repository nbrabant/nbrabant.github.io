# Prestashop 1.7 Cheat Sheet


## Liste de modules dans un hook
```sql
SELECT *
FROM `ps_module`
WHERE id_module IN (
	SELECT id_module FROM `ps_hook_module` WHERE id_hook = 8
);
```

## Principal displaying hooks

* front Right Column    > 7
* front Left Column     > 8
* front header          > 10

* front footer product  > 18
* front footer          > 22


Don't forget to modify the host into `shop_url` (multishop table) for local envs

## Installation de module
```bash
bin/console prestashop:module install {MODULENAME}
```
