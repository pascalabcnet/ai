---
title: Синтетические датасеты
description: Генераторы учебных наборов данных.
---

Синтетические датасеты создаются программно. Они полезны, когда нужно быстро получить данные с заранее понятной структурой: линейно разделимые классы, круги, спирали, группы точек или зависимость для регрессии.

В отличие от реальных датасетов, здесь мы заранее задаём форму данных и часто знаем правильные ответы `y`. Поэтому синтетические датасеты удобно использовать для проверки алгоритмов, визуализации и учебных экспериментов.

## Все генераторы на одном графике

```pascal
uses MLABC, PlotML;

begin
  var fig := Plot.Grid(2, 3);

  var (X1, y1) := Datasets.MakeBlobs(
    n := 300,
    centers := 3,
    clusterStd := 0.7,
    seed := 1
  );
  fig[0, 0].Points(X1.Col(0), X1.Col(1), y1, size := 4);
  fig[0, 0].Title := 'MakeBlobs';

  var (X2, y2) := Datasets.MakeMoons(
    n := 300,
    noise := 0.1,
    seed := 2
  );
  fig[0, 1].Points(X2.Col(0), X2.Col(1), y2, size := 4);
  fig[0, 1].Title := 'MakeMoons';

  var (X3, y3) := Datasets.MakeCircles(
    n := 300,
    noise := 0.08,
    factor := 0.45,
    seed := 3
  );
  fig[0, 2].Points(X3.Col(0), X3.Col(1), y3, size := 4);
  fig[0, 2].Title := 'MakeCircles';

  var (X4, y4) := Datasets.MakeSpiral(
    n := 300,
    classes := 3,
    turns := 2.5,
    noise := 0.015,
    seed := 4
  );
  fig[1, 0].Points(X4.Col(0), X4.Col(1), y4, size := 4);
  fig[1, 0].Title := 'MakeSpiral';

  var (X5, y5) := Datasets.MakeRegression(
    n := 300,
    nFeatures := 1,
    nInformative := 1,
    noise := 0.2,
    seed := 5
  );
  fig[1, 1].Points(X5.Col(0), y5, size := 4);
  fig[1, 1].Title := 'MakeRegression';

  var (X6, y6) := Datasets.MakeClassification(
    n := 300,
    nFeatures := 2,
    nInformative := 2,
    nRedundant := 0,
    noise := 0.2,
    classSep := 2.5,
    seed := 6
  );
  fig[1, 2].Points(X6.Col(0), X6.Col(1), y6, size := 4);
  fig[1, 2].Title := 'MakeClassification';
end.
```

Вывод:

<img src="/images/synthetic-datasets-grid.png" alt="Синтетические датасеты MakeBlobs, MakeMoons, MakeCircles, MakeSpiral, MakeRegression и MakeClassification" class="doc-image-medium" />

Эта программа показывает, что синтетические датасеты могут иметь совершенно разную структуру. Одни удобны для кластеризации, другие — для классификации, третьи — для регрессии.

## MakeBlobs

`MakeBlobs` создаёт несколько компактных групп точек.

```pascal
var (X, y) := Datasets.MakeBlobs(
  n := 600,
  centers := 3,
  clusterStd := 1.2,
  seed := 1
);
```

Такой датасет удобно использовать для кластеризации: например, чтобы показать работу `KMeans`, выбор числа кластеров и расположение центроидов.

## MakeMoons

`MakeMoons` создаёт две группы точек в форме двух “лун”.

```pascal
var (X, y) := Datasets.MakeMoons(
  n := 600,
  noise := 0.1,
  seed := 1
);
```

Этот датасет хорошо показывает, что классы или кластеры не всегда разделяются прямой линией. Он полезен для сравнения линейных и нелинейных моделей, а также для демонстрации `DBSCAN`.

## MakeCircles

`MakeCircles` создаёт две концентрические окружности.

```pascal
var (X, y) := Datasets.MakeCircles(
  n := 600,
  noise := 0.05,
  factor := 0.5,
  seed := 1
);
```

Здесь один класс расположен внутри другого. Такой пример хорошо показывает ограниченность простых линейных моделей и пользу деревьев, лесов и других нелинейных алгоритмов.

## MakeSpiral

`MakeSpiral` создаёт несколько спиральных классов.

```pascal
var (X, y) := Datasets.MakeSpiral(
  n := 600,
  classes := 3,
  turns := 2.5,
  noise := 0.015,
  seed := 1
);
```

Это более сложный пример для классификации. Он нужен, когда хочется показать задачу с сильно нелинейной границей между классами.

## MakeRegression

`MakeRegression` создаёт данные для задачи регрессии: признаки `X` и числовую целевую переменную `y`.

```pascal
var (X, y) := Datasets.MakeRegression(
  n := 500,
  nFeatures := 1,
  nInformative := 1,
  noise := 0.2,
  seed := 1
);
```

Такой датасет удобно использовать для проверки моделей регрессии: `LinearRegression`, `KNNRegressor`, `DecisionTreeRegressor`, `RandomForestRegressor` и `GradientBoostingRegressor`.

## MakeClassification

`MakeClassification` создаёт данные для задачи классификации.

```pascal
var (X, y) := Datasets.MakeClassification(
  n := 500,
  nFeatures := 2,
  nInformative := 2,
  nRedundant := 0,
  noise := 0.2,
  classSep := 2.0,
  seed := 1
);
```

Этот генератор удобен, когда нужно получить управляемую задачу классификации: можно менять число признаков, шум, разделимость классов и баланс классов.

## Пример задачи классификации

Сгенерируем данные, разделим их на обучающую и тестовую выборки, обучим модель и посчитаем `Accuracy`.

```pascal
uses MLABC;

begin
  var (X, y) := Datasets.MakeClassification(
    n := 500,
    nFeatures := 2,
    nInformative := 2,
    nRedundant := 0,
    noise := 0.2,
    classSep := 2.0,
    seed := 1
  );

  var (Xtrain, Xtest, ytrain, ytest) :=
    Validation.TrainTestSplit(X, y, testRatio := 0.25, seed := 42);

  var model := new LogisticRegression;
  model.Fit(Xtrain, ytrain);

  var pred := model.Predict(Xtest);
  var acc := Metrics.Accuracy(ytest, pred);

  Println('Accuracy:', acc:0:3);
end.
```

В этом примере `MakeClassification` играет роль учебного датасета, а дальше используется обычный ML-процесс: разбиение данных, обучение модели, предсказание и оценка качества.
