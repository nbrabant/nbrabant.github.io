# Prestashop 1.7 Cheat Sheet


## Hook usages
```sql
SELECT ps_hook.name AS hook_name, ps_module.name AS module_name, ps_hook_module.position
FROM ps_module
LEFT JOIN ps_hook_module ON ps_module.id_module = ps_hook_module.id_module
LEFT JOIN ps_hook ON ps_hook.id_hook = ps_hook_module.id_hook
WHERE ps_hook.name IN ({{HOOK_NAMES}})
ORDER BY ps_hook.id_hook, ps_hook_module.position;
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
