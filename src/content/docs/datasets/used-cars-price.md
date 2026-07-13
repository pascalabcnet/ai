---
title: UsedCarsPrice
description: Датасет с ценами подержанных автомобилей.
---

`UsedCarsPrice` — датасет с данными о подержанных автомобилях.

Файл данных:

```text
used_cars_price.csv
```

В программе датасет доступен так:

```pascal
var ds := Datasets.UsedCarsPrice;
var df := ds.Data;
```

Датасет удобно использовать для задач регрессии: например, для предсказания цены автомобиля.

