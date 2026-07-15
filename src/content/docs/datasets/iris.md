---
title: Iris
description: Классический датасет ирисов Фишера для задачи классификации.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
---

`Iris` — классический **датасет ирисов Фишера**. Это один из самых известных датасетов в машинном обучении.

Он часто используется для первого знакомства с классификацией: данные маленькие, признаки числовые, классы хорошо сбалансированы.

В датасете 150 строк: по 50 цветков каждого вида.

## Задача

По измерениям цветка ириса нужно определить его вид.

Целевая переменная:

- `species`.

Классы:

- `setosa`;
- `versicolor`;
- `virginica`.

В русской локализации:

- ирис щетинистый;
- ирис разноцветный;
- ирис виргинский.

## Признаки

В датасете четыре числовых признака:

| Столбец | Описание |
| --- | --- |
| `sepal_length` | длина чашелистика |
| `sepal_width` | ширина чашелистика |
| `petal_length` | длина лепестка |
| `petal_width` | ширина лепестка |

Так как все признаки числовые, датасет удобно использовать для первых моделей без сложной предобработки.

## Загрузка и просмотр

В программе датасет загружается через `Datasets.Iris`. Сам набор данных хранится в свойстве `Data` и представляет собой обычный `DataFrame`.

```pascal
uses MLABC;

begin
  var ds := Datasets.Iris;
  var df := ds.Data;

  ds.Info;
end.
```

Если нужен доступ к признакам и целевому столбцу, их имена уже описаны в датасете:

```pascal
Println(ds.Features);
Println(ds.Target);
```

## Информация о датасете

```pascal
uses MLABC;

begin
  // Откомментируйте - всё станет по-английски
  // Datasets.Language := 'en';

  var ds := Datasets.Iris;
  ds.Info;

  ds.ClassCounts.PrintLines;
  ds.ClassCounts.PrintLines(kv -> ds.ClassName(kv.Key) + ' → ' + kv.Value);
end.
```

Программа выводит:

```text
Датасет: Iris

Описание:
Классический датасет ирисов Фишера. Один из самых известных датасетов в машинном обучении.

Задача: Classification
Строк: 150
Признаков: 4
Цель: species

sepal_length  → длина чашелистика
sepal_width   → ширина чашелистика
petal_length  → длина лепестка
petal_width   → ширина лепестка

(setosa,50)
(versicolor,50)
(virginica,50)

ирис щетинистый → 50
ирис разноцветный → 50
ирис виргинский → 50
```

`Задача: Classification` означает, что это задача классификации.

`Строк: 150` — всего 150 объектов. `Признаков: 4` — у каждого объекта четыре числовых измерения.

Строки

```text
(setosa,50)
(versicolor,50)
(virginica,50)
```

показывают, что датасет сбалансирован: в каждом классе ровно 50 объектов.

Строка

```pascal
//Datasets.Language := 'en';
```

позволяет переключить описания и названия классов на английский язык.

## Обучение модели

На `Iris` удобно показать полный цикл классификации: взять данные, разделить их на обучающую и тестовую части, обучить модель и посчитать точность.

```pascal
uses MLABC;

begin
  var ds := Datasets.Iris;
  var df := ds.Data;

  var pipe :=
    DataPipeline.BuildClassification(
      ds.Target,
      ds.Features,
      new StandardScaler,     // Matrix transformer
      new LogisticRegression  // Model
    );

  var (trainDf, testDf) := df.TrainTestSplit(0.2, seed := 3);

  pipe.Fit(trainDf);

  var pred := pipe.Predict(testDf);

  var y := pipe.GetEncodedLabels(testDf);

  Println('Точность:', Metrics.Accuracy(y, pred):0:3);
end.
```

Вывод:

```text
Точность: 0.967
```

Это означает, что модель правильно определила примерно 96.7% цветков из тестовой выборки.

В этом примере используется конвейер:

```text
DataFrame → StandardScaler → LogisticRegression
```

`StandardScaler` масштабирует числовые признаки, а `LogisticRegression` обучается предсказывать вид ириса.

## То же самое без конвейера

Без `DataPipeline` те же действия нужно выполнить вручную:

```pascal
uses MLABC;

begin
  var ds := Datasets.Iris;
  var df := ds.Data;

  var X := df.ToMatrix(ds.Features);
  var target := df.EncodeTarget(ds.Target);
  var y := target.Labels;

  var (Xtrain, Xtest, ytrain, ytest) :=
    Validation.TrainTestSplit(X, y, testRatio := 0.2, seed := 3);

  var scaler := new StandardScaler;
  Xtrain := scaler.FitTransform(Xtrain);
  Xtest := scaler.Transform(Xtest);

  var model := new LogisticRegression;
  model.Fit(Xtrain, ytrain);

  var pred := model.Predict(Xtest);

  Println('Точность:', Metrics.Accuracy(ytest, pred):0:3);
end.
```

Здесь видно, какие шаги конвейер скрывает внутри себя.

Сначала таблица превращается в матрицу признаков `X` и вектор ответов `y`. Затем данные делятся на обучающую и тестовую части.

После этого создаётся `StandardScaler`.

```pascal
Xtrain := scaler.FitTransform(Xtrain);
```

`FitTransform` выполняет два действия сразу:

1. `Fit` — вычисляет параметры масштабирования по обучающим данным;
2. `Transform` — применяет это масштабирование к обучающим данным.

Для тестовых данных используется уже только `Transform`:

```pascal
Xtest := scaler.Transform(Xtest);
```

Это важно: параметры масштабирования нельзя заново вычислять по тестовой выборке. Тестовые данные должны обрабатываться так же, как новые данные, которые модель раньше не видела.

Конвейер делает это автоматически: при `pipe.Fit(trainDf)` он обучает `StandardScaler` только на обучающих данных, а при `pipe.Predict(testDf)` применяет уже найденное масштабирование к тестовым данным.

## Когда использовать Iris

`Iris` хорош для первых шагов в машинном обучении:

- датасет маленький и понятный;
- все признаки числовые;
- классы сбалансированы;
- легко строить графики;
- удобно сравнивать модели классификации;
- можно показывать `TrainTestSplit`, `Accuracy`, матрицу ошибок и pipeline.
