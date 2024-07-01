# Breadcrumb Prestashop 1.6

Ou comment ajouter du référencement en Rich Snippets sous Prestashop 1.6 en ne modifiant que le template et en ajoutant une classe overidée


Ajout des Rich Snippets breadcrumb sur Prestashop : modification du tpl

Dans un premier temps, vous devons modifiez le template du breadbrumb. Ouvrez le template dubredcrumb de votre thème

```html
<!-- Breadcrumb -->
{if isset($smarty.capture.path)}{assign var='path' value=$smarty.capture.path}{/if}
<div class="breadcrumb">
    <a href="{$base_dir}" title="{l s='Return to Home'}"><i class="icon-home"></i></a>
    {if isset($path) AND $path}
        <span class="navigation-pipe" {if isset($category) && isset($category->id_category) && $category->id_category == 1}style="display:none;"{/if}>{$navigationPipe|escape:html:'UTF-8'}</span>
        {if !$path|strpos:'span'}
            <span class="navigation_page">{$path}</span>
        {else}
            {$path}
        {/if}
    {/if}
</div>
<!-- /Breadcrumb -->
```

Et modifiez le de cette manière :

```html
<!-- Breadcrumb -->
{if isset($smarty.capture.path)}{assign var='path' value=$smarty.capture.path}{/if}
<div class="breadcrumb clearfix" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
    <span itemprop="title"><a class="home" href="{$base_dir}" title="{l s='Return to Home'}" itemprop="url"><i class="icon-home"></i></a></span>
    {if isset($path) AND $path}
        <span class="navigation-pipe" {if isset($category) && isset($category->id_category) && $category->id_category == 1}style="display:none;"{/if}>{$navigationPipe|escape:'html':'UTF-8'}</span>
        {if !$path|strpos:'itemprop="title"'}
            <span itemprop="title" class="navigation_page">{$path}</span>
        {else}
            {$path}
        {/if}
    {/if}
</div>
<!-- /Breadcrumb -->
```

A partir de ce template, vous devez overrider la génération de breadcrumb de Prestashop avec la méthode Tools::getPath()


Ajout des Rich Snippets breadcrumb sur Prestashop : override du Tools::getPath()

Dans un premier temps, créez la classe Tools, héritant de ToolsCore dans le dossier override/classe et copier la méthode getTools dans la nouvelle classe créée. Ensuite, juste après la vérification de la variable $context, initialisez la valeur de la variable $path comme suit :

```php
$path = '<span itemprop="title">'.$path.'</span>';
```

Dans l'itération de lecture des différentes catégories, ajoutez les attributs itemprop sur les balises de lien :

```php
$full_path .=
	(($n < $n_categories || $link_on_the_item) ? '<a href="'.Tools::safeOutput($context->link->getCategoryLink((int)$category['id_category'], $category['link_rewrite'])).'" itemprop="url" title="'.htmlentities($category['name'], ENT_NOQUOTES, 'UTF-8').'">' : '').
	htmlentities($category['name'], ENT_NOQUOTES, 'UTF-8').
	(($n < $n_categories || $link_on_the_item) ? '</a>' : '').
	(($n++ != $n_categories || !empty($path)) ? '<span class="navigation-pipe">'.$pipe.'</span>' : '');
```

Même chose pour la partie CMS :

```php
if ($path != $category->name)
    $full_path .= '<a href="'.Tools::safeOutput($category_link).'" itemprop="url">'.htmlentities($category->name, ENT_NOQUOTES, 'UTF-8').'</a><span class="navigation-pipe">'.$pipe.'</span>'.$path;
else
    $full_path = ($link_on_the_item ? '<a href="'.Tools::safeOutput($category_link).'" itemprop="url">' : '').htmlentities($path, ENT_NOQUOTES, 'UTF-8').($link_on_the_item ? '</a>' : '');
```


Au final, la réécriture de la méthode devrait être semblable à celà :

```php
class Tools extends ToolsCore
{
    public static function getPath($id_category, $path = '', $link_on_the_item = false, $category_type = 'products', Context $context = null) {
        if (!$context)
            $context = Context::getContext();

        $path = '<span itemprop="title">'.$path.'</span>';

        $id_category = (int)$id_category;
        if ($id_category == 1)
            return '<span class="navigation_end">'.$path.'</span>';

        $pipe = Configuration::get('PS_NAVIGATION_PIPE');
        if (empty($pipe))
            $pipe = '>';

        $full_path = '';
        if ($category_type === 'products') {
            $interval = Category::getInterval($id_category);
            $id_root_category = $context->shop->getCategory();
            $interval_root = Category::getInterval($id_root_category);
            if ($interval)
            {
                $sql = 'SELECT c.id_category, cl.name, cl.link_rewrite
                        FROM '._DB_PREFIX_.'category c
                        LEFT JOIN '._DB_PREFIX_.'category_lang cl ON (cl.id_category = c.id_category'.Shop::addSqlRestrictionOnLang('cl').')
                        WHERE c.nleft <= '.$interval['nleft'].'
                            AND c.nright >= '.$interval['nright'].'
                            AND c.nleft >= '.$interval_root['nleft'].'
                            AND c.nright <= '.$interval_root['nright'].'
                            AND cl.id_lang = '.(int)$context->language->id.'
                            AND c.active = 1
                            AND c.level_depth > '.(int)$interval_root['level_depth'].'
                        ORDER BY c.level_depth ASC';
                $categories = Db::getInstance()->executeS($sql);

                $n = 1;
                $n_categories = count($categories);
                foreach ($categories as $category)
                {
                    $full_path .=
                    (($n < $n_categories || $link_on_the_item) ? '<a href="'.Tools::safeOutput($context->link->getCategoryLink((int)$category['id_category'], $category['link_rewrite'])).'" itemprop="url" title="'.htmlentities($category['name'], ENT_NOQUOTES, 'UTF-8').'">' : '').
                    htmlentities($category['name'], ENT_NOQUOTES, 'UTF-8').
                    (($n < $n_categories || $link_on_the_item) ? '</a>' : '').
                    (($n++ != $n_categories || !empty($path)) ? '<span class="navigation-pipe">'.$pipe.'</span>' : '');
                }
                return $full_path.$path;
            }
        } else if ($category_type === 'CMS') {
            $category = new CMSCategory($id_category, $context->language->id);
            if (!Validate::isLoadedObject($category)) {
                die(Tools::displayError());
			}
            $category_link = $context->link->getCMSCategoryLink($category);
            if ($path != $category->name) {
                $full_path .= '<a href="'.Tools::safeOutput($category_link).'" itemprop="url">'.htmlentities($category->name, ENT_NOQUOTES, 'UTF-8').'</a><span class="navigation-pipe">'.$pipe.'</span>'.$path;
            } else {
                $full_path = ($link_on_the_item ? '<a href="'.Tools::safeOutput($category_link).'" itemprop="url">' : '').htmlentities($path, ENT_NOQUOTES, 'UTF-8').($link_on_the_item ? '</a>' : '');
			}
            return Tools::getPath($category->id_parent, $full_path, $link_on_the_item, $category_type);
        }
    }
}
```
