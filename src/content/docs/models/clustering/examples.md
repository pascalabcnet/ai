---
title: Примеры кластеризации
description: Сравнение KMeans и DBSCAN на разных данных.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
---

На этой странице собраны типовые учебные примеры кластеризации.

## KMeans на компактных группах

`KMeans` хорошо подходит, когда кластеры похожи на компактные группы вокруг центров.

```pascal
uses MLABC, PlotML;

begin
  var (X, trueLabels) := Datasets.MakeBlobs(
    n := 300,
    centers := 3,
    clusterStd := 0.8,
    seed := 42);

  var model := new KMeans(3, seed := 42);

  var labels := model.FitPredict(X);

  var xs := X.Col(0);
  var ys := X.Col(1);

  Plot.Points(xs, ys, labels, size := 4);
  Plot.Title := 'KMeans на компактных кластерах';
end.
```

## KMeans на данных сложной формы

Если кластеры имеют сложную форму, `KMeans` может работать плохо: он стремится разделить пространство вокруг центров.

Для таких данных лучше подходит `DBSCAN`.

## DBSCAN на MakeMoons

```pascal
uses MLABC, PlotML;

begin
  var (X, trueLabels) := Datasets.MakeMoons(
    n := 400,
    noise := 0.08,
    seed := 42);

  var scaler := new StandardScaler;
  var Xscaled := scaler.FitTransform(X);

  var model := new DBSCAN(
    eps := 0.25,
    minSamples := 5);

  var labels := model.FitPredict(Xscaled);

  var xs := Xscaled.Col(0);
  var ys := Xscaled.Col(1);

  Plot.Points(xs, ys, labels, size := 4);
  Plot.Title := 'DBSCAN на кластерах сложной формы';
end.
```

## Что сравнивать

При сравнении алгоритмов полезно смотреть:

- форму найденных кластеров;
- наличие шумовых точек;
- устойчивость к масштабированию;
- метрики качества, если они уместны.

Если истинных меток нет, используют [Silhouette Score](/metrics/silhouette-score/). Если истинные метки известны в учебном датасете, можно использовать [Adjusted Rand Index](/metrics/rand-index/).
