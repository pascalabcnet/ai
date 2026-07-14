---
title: MoscowHousing
description: Датасет с данными о квартирах в Москве.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
---

`MoscowHousing` — учебный датасет с данными о квартирах в Москве.

Это прикладной пример для задачи регрессии: по признакам квартиры нужно предсказать её цену.

Регрессия принципиально отличается от классификации. В классификации модель выбирает один из заранее известных классов: например, `ирис щетинистый`, `ирис разноцветный`, `ирис виргинский` или цифру от `0` до `9`.

В регрессии модель предсказывает число. В `MoscowHousing` таким числом является цена квартиры. То есть ответ модели может быть, например, `12500000`, `18300000` или другое вещественное значение.

Поэтому `MoscowHousing` удобно использовать после датасетов `Iris` и `MNIST Small`: на них изучается классификация, а здесь видно, как решается задача предсказания числовой величины.

## Файл данных

Стандартный файл датасета:

```text
moscow_housing.csv
```

В программе датасет доступен так:

```pascal
var ds := Datasets.MoscowHousing;
var df := ds.Data;
```

## Структура датасета

Посмотрим общую информацию, первые строки и схему таблицы.

```pascal
uses MLABC;

begin
  Datasets.Language := 'ru';

  var ds := Datasets.MoscowHousing;
  ds.Info;

  var df := ds.Data;
  df.PrintInfo;
end.
```

**Вывод:**

```
Датасет: moscow_housing

Описание:
Цены на квартиры в Москве с основными характеристиками жилья и расположения.

Задача: регрессия
Строк: 1500
Признаков: 7
Категориальные признаки: renovation

Целевой столбец:
price          → цена квартиры

Признаки:
rooms          → число комнат
area           → площадь квартиры
kitchen_area   → площадь кухни
floor          → этаж
floors_total   → этажей в доме
metro_minutes  → минуты до метро
renovation     → тип ремонта

Строк     : 1500
Столбцов  : 8
========================================================
price         : int                  (1500 без пропусков)
metro_minutes : float                (1500 без пропусков)
rooms         : int                  (1500 без пропусков)
area          : float                (1500 без пропусков)
kitchen_area  : float                (1500 без пропусков)
floor         : int                  (1500 без пропусков)
floors_total  : int                  (1500 без пропусков)
renovation    : string (categorical) (1500 без пропусков)
```

На основании вывода информации о датасете мы можем сделать вывод, что `MoscowHousing` — это таблица из 1500 квартир без пропущенных значений. У каждой квартиры есть числовые признаки, описывающие её размер, этаж и расстояние до метро, а также один категориальный признак `renovation`. Целевой столбец `price` содержит цену квартиры, поэтому дальше мы будем смотреть, как признаки связаны с ценой, и строить модели регрессии для её предсказания.

Отдельно обратим внимание на `renovation`: это категориальный признак. Если использовать его в модели, его нужно предварительно закодировать.

## Визуальный анализ

Перед обучением модели полезно построить графики: изучить распределение целевой переменной и посмотреть, как цена связана с отдельными признаками.

Например, можно построить гистограмму цен:

```pascal
uses MLABC, PlotML;

begin
  var ds := Datasets.MoscowHousing;
  var df := ds.Data;

  var price := df.ToVector(ds.Target);

  Plot.Hist(price, bins := 40);
  Plot.Title := 'Распределение цен на квартиры в Москве';
  Plot.XLabel := 'Цена (руб)';
  Plot.YLabel := 'Количество';
end.
```

Такой график показывает, какие цены встречаются часто, а какие являются редкими.

Вывод:

<img src="/images/moscow-housing-price-hist.png" alt="Распределение цен на квартиры в Москве" class="doc-image-medium" />

По гистограмме видно, что недорогих квартир заметно больше, а очень дорогие квартиры встречаются реже. Такое распределение типично для цен: основная масса объектов находится в нижней и средней части диапазона, а справа остаётся длинный хвост дорогих вариантов.

Ещё один полезный график — зависимость цены от площади:

```pascal
uses MLABC, PlotML;

begin
  var ds := Datasets.MoscowHousing;
  var df := ds.Data;

  var area := df.ToVector('area');
  var price := df.ToVector(ds.Target);

  Plot.Points(area, price, size := 3);

  Plot.XLabel := 'Площадь (м²)';
  Plot.YLabel := 'Цена (руб)';
  Plot.Title := 'Цена квартиры vs площадь';
end.
```

Вывод:

<img src="/images/moscow-housing-area-price-scatter.png" alt="Зависимость цены квартиры от площади" class="doc-image-medium" />

По графику видно, что связь между площадью и ценой действительно есть: в среднем большие квартиры стоят дороже. Но точки расположены не на одной линии, а образуют широкий разброс.

Это важное наблюдение: одной площади недостаточно, чтобы точно предсказать цену квартиры. На цену также влияют число комнат, этаж, расстояние до метро, тип ремонта и другие признаки. Поэтому для модели регрессии лучше использовать не один признак, а несколько.

## Линейная регрессия

Начнём с простой модели линейной регрессии.

```pascal
uses MLABC;

begin
  var ds := Datasets.MoscowHousing;
  var df := ds.Data;

  var features := ['rooms','area','kitchen_area','floor','floors_total','metro_minutes'];
  var target := 'price';

  var X := df.ToMatrix(features);
  var y := df.ToVector(target);

  var (Xtrain, Xtest, ytrain, ytest) :=
    Validation.TrainTestSplit(X, y, 0.2, 42);

  var model := new LinearRegression;
  model.Fit(Xtrain, ytrain);

  var pred := model.Predict(Xtest);

  Println('R²:', Metrics.R2(ytest, pred):0:3);
end.
```

`LinearRegression` пытается описать цену как линейную зависимость от выбранных признаков.

Вывод:

```text
R²: 0.620
```

Это означает, что линейная модель объясняет примерно 62% разброса цен на тестовой выборке. Зависимость между признаками и ценой она действительно нашла, но качество нельзя назвать высоким: заметная часть различий между квартирами остаётся необъяснённой.

Для квартир зависимость часто сложнее линейной: цена может меняться нелинейно, а признаки могут взаимодействовать друг с другом. Поэтому дальше попробуем более сложную модель.

## RandomForestRegressor

Для более сложных зависимостей можно использовать лес деревьев.

Здесь мы пользуемся методом `TrainTestSplit` для всего `DataFrame`, поэтому следующая часть программы немного отличается: сначала получаем `trainDf` и `testDf`, а уже потом преобразуем каждую часть в матрицу признаков и вектор целевых значений.

```pascal
uses MLABC;

begin
  var ds := Datasets.MoscowHousing;
  var df := ds.Data;

  var features := ['rooms','area','kitchen_area','floor','floors_total','metro_minutes'];
  var target := 'price';

  var (trainDf, testDf) := df.TrainTestSplit(0.2, seed := 42);

  var Xtrain := trainDf.ToMatrix(features);
  var ytrain := trainDf.ToVector(target);

  var Xtest := testDf.ToMatrix(features);
  var ytest := testDf.ToVector(target);

  var model := new RandomForestRegressor(seed := 42);
  model.Fit(Xtrain, ytrain);

  var pred := model.Predict(Xtest);

  Println('R²:', Metrics.R2(ytest, pred):0:3);
end.
```

Вывод:

```text
R²: 0.896
```

Это означает, что модель объясняет примерно 90% разброса цен на тестовой выборке. Для учебного датасета и простого набора признаков это сильный результат.


## Pipeline с категориальным признаком

Если добавить признак `renovation`, его нужно преобразовать в числа. Удобнее сделать это через конвейер, используя преобразователь `OneHotEncoder`.

```pascal
uses MLABC;

begin
  var ds := Datasets.MoscowHousing;
  var df := ds.Data;

  var features := [
    'rooms',
    'area',
    'kitchen_area',
    'floor',
    'floors_total',
    'metro_minutes',
    'renovation'
  ];

  var target := 'price';

  var (trainDf, testDf) := df.TrainTestSplit(0.2, seed := 42);

  var pipe :=
    DataPipeline.BuildRegression(
      target,
      features,
      new OneHotEncoder('renovation'),
      new StandardScaler,
      new LinearRegression
    );

  pipe.Fit(trainDf);

  var pred := pipe.Predict(testDf);
  var y := testDf.ToVector(target);

  Println('R²:', Metrics.R2(y, pred):0:3);
end.
```

Конвейер сам применяет `OneHotEncoder` к строковому признаку `renovation`, масштабирует признаки и передаёт подготовленные данные в модель.

## Важность признаков

Некоторые модели умеют показывать, какие признаки оказались наиболее важными.

```pascal
uses MLABC;

begin
  var ds := Datasets.MoscowHousing;
  var df := ds.Data;

  var features := ['rooms','area','kitchen_area','floor','floors_total','metro_minutes'];
  var target := 'price';

  var X := df.ToMatrix(features);
  var y := df.ToVector(target);

  var model := new RandomForestRegressor(seed := 42);
  model.Fit(X, y);

  var imp := model.FeatureImportances;

  Println('Важность признаков:');
  for var i := 0 to features.Length - 1 do
    Println(features[i]:15, ':', imp[i]:0:3);
end.
```

**Вывод:**

```
Важность признаков:
          rooms : 0.088
           area : 0.251
   kitchen_area : 0.180
          floor : 0.153
   floors_total : 0.176
  metro_minutes : 0.152
```

С помощью метода `FeatureImportances` мы можем видеть, что самым важным признаком, влияющим на цену, является площадь квартиры `area`, а количество комнат - наименее влияющий на цену признак. 

## Когда использовать MoscowHousing

`MoscowHousing` удобно использовать для задач регрессии, сравнения моделей, работы с числовыми и категориальными признаками и анализа важности признаков.

Это хороший датасет для перехода от маленьких учебных примеров к более прикладным задачам анализа данных.
