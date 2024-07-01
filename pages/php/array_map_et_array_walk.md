# Différence majeure array_map et array_walk

**array_map()** retourne un tableau contenant tous les éléments du tableau array1, après leur avoir appliqué la fonction callback. Ainsi, pour le script

```php
// array map
$array = array(
  'Pomme de terre',
  'Carotte',
  'Tomate',
  'Navet',
  'Poire',
  'Raisin'
);

$return = array_map(function($value) {
  return strtolower($value);
}, $array);

var_dump($array, $return);
```

Le var_dump retournera :
```php
// $array
array (size=6)
  0 => string 'Pomme de terre' (length=14)
  1 => string 'Carotte' (length=7)
  2 => string 'Tomate' (length=6)
  3 => string 'Navet' (length=5)
  4 => string 'Poire' (length=5)
  5 => string 'Raisin' (length=6)

// $return
array (size=6)
  0 => string 'pomme de terre' (length=14)
  1 => string 'carotte' (length=7)
  2 => string 'tomate' (length=6)
  3 => string 'navet' (length=5)
  4 => string 'poire' (length=5)
  5 => string 'raisin' (length=6)
```

Le tableau d'origine reste inchangé, le retour de la fonction sera le résultat du tableau traité par le callback.

**array_walk()** exécute la fonction callback définie par l'utilisateur sur chaque élément du tableau array. Ainsi, pour le script
```php
// array walk
$array = array(
  'Pomme de terre',
  'Carotte',
  'Tomate',
  'Navet',
  'Poire',
  'Raisin'
);

$return = array_walk($array, function(&$value) {
  $value = strtolower($value);
});

var_dump($array, $return);
```

Le var_dump retournera :
```php
// $array
array (size=6)
  0 => string 'pomme de terre' (length=14)
  1 => string 'carotte' (length=7)
  2 => string 'tomate' (length=6)
  3 => string 'navet' (length=5)
  4 => string 'poire' (length=5)
  5 => string 'raisin' (length=6)

// $return
boolean true
```

Le tableau d'origine est modifié, le retour de la fonction sera un booléen.
