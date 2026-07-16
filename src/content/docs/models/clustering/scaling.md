---
title: Масштабирование
description: Почему масштаб признаков важен для кластеризации.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
---

Кластеризация часто основана на расстояниях между объектами. Поэтому масштаб признаков сильно влияет на результат.

Если один признак измеряется в тысячах, а другой — в единицах, расстояние между объектами почти полностью будет определяться первым признаком.

## Пример с разными масштабами

Представим, что объект описывается двумя признаками:

```text
возраст: 20, 30, 40
доход: 50000, 80000, 120000
```

Разница в доходе намного больше разницы в возрасте. Если не выполнить масштабирование, алгоритм будет почти полностью ориентироваться на доход.

## StandardScaler

Часто для кластеризации используют `StandardScaler`. Он преобразует признаки так, чтобы у каждого признака среднее было примерно `0`, а стандартное отклонение примерно `1`.

В этом примере специально исказим второй признак: умножим его на `1000`. Из-за этого расстояния по второй оси начнут доминировать, и `KMeans` будет видеть данные иначе, чем они устроены на самом деле.

```pascal
uses MLABC, PlotML;

begin
  var (X, trueLabels) := Datasets.MakeBlobs(
    n := 300,
    centers := 3,
    clusterStd := 0.7,
    seed := 8
  );

  // Искажаем вторую координату
  for var i := 0 to X.RowCount - 1 do
    X[i, 1] *= 1000;

  var Xscaled := X.Clone;
  var scaler := new StandardScaler;
  Xscaled := scaler.FitTransform(Xscaled);

  var model1 := new KMeans(3, seed := 42);
  var labels1 := model1.FitPredict(X);

  var model2 := new KMeans(3, seed := 42);
  var labels2 := model2.FitPredict(Xscaled);

  var (xs1, ys1) := X.Cols(0, 1);
  var (xs2, ys2) := Xscaled.Cols(0, 1);

  var fig := Plot.Grid(1, 2);

  fig[0, 0].Points(xs1, ys1, labels1, size := 4);
  fig[0, 0].Points(model1.Centers, color := Colors.Black, size := 12, marker := MarkerType.Cross);
  fig[0, 0].Title := 'Без масштабирования';

  fig[0, 1].Points(xs2, ys2, labels2, size := 4);
  fig[0, 1].Points(model2.Centers, color := Colors.Black, size := 12, marker := MarkerType.Cross);
  fig[0, 1].Title := 'После StandardScaler';
end.
```

Без масштабирования кластеры и центры кластеров искажаются: расстояния по одной оси становятся намного больше расстояний по другой оси и начинают доминировать. После `StandardScaler` оба признака становятся сопоставимыми, поэтому `KMeans` снова учитывает обе координаты.

<img src="/images/kmeans-scaling.png" alt="KMeans до и после масштабирования признаков" class="doc-image-wide" />

## Когда масштабирование особенно важно

Масштабирование особенно важно для алгоритмов, которые используют расстояния:

- `KMeans`;
- `DBSCAN`;
- `KNNClassifier`;
- `KNNRegressor`.

Для деревьев решений масштабирование обычно не требуется, но для кластеризации его почти всегда стоит проверить.
