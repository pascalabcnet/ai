---
title: DataFrame и Pandas
description: Сравнение базовых операций DataFrame и Pandas
---

В ML PascalABC.NET основной тип для табличных данных называется `DataFrame`. По назначению он похож на `DataFrame` из библиотеки Pandas в Python, но устроен в стиле PascalABC.NET.

Если вы знакомы с Pandas, большинство базовых операций имеют прямые аналоги.

## Загрузка данных

| Pandas                    | DataFrame                       |
| ------------------------- | ------------------------------- |
| `pd.read_csv('data.csv')` | `DataFrame.FromCsv('data.csv')` |
| `pd.read_excel(...)`      | `DataFrame.FromODS(...)`        |

## Просмотр таблицы

| Pandas          | DataFrame            |
| --------------- | -------------------- |
| `print(df)`     | `df.Print;`          |
| `df.info()`     | `df.PrintInfo;`      |
| `df.head()`     | `df.Head.Print;`     |
| `df.tail()`     | `df.Tail.Print;`     |
| `df.describe()` | `df.Describe.Print;` |

## Выбор и преобразование столбцов

| Pandas                         | DataFrame                                          |
| ------------------------------ | -------------------------------------------------- |
| `df[['Age','Salary']]`         | `df.Select(['Age','Salary'])`                      |
| `df.drop(columns=['Comment'])` | `df.Drop(['Comment'])`                             |
| `df['T_K'] = df['T'] + 273.15` | `df.WithColumnFloat('T_K', r -> r['T'] + 273.15)`  |
| `df['T'] = df['T'] + 273.15`   | `df.ReplaceColumnFloat('T', r -> r['T'] + 273.15)` |

## Работа с датой и временем

| Pandas                | DataFrame                             |
| --------------------- | ------------------------------------- |
| `pd.to_datetime(...)` | автоматическое распознавание DateTime |
| `df['Date'].dt.year`  | `df.WithDatePart(...)`                |
| `df['Date'].dt.month` | `df.WithDatePart(...)`                |
| `df['Date'].dt.day`   | `df.WithDatePart(...)`                |

## Фильтрация

Pandas:

```python
df[df['Salary'] > 80000]
```

DataFrame:

```pascal
df.Filter(r -> r['Salary'] > 80000)
```

Сложное условие:

```python
df[(df['Department']=='IT') & (df['Salary']>80000)]
```

```pascal
df.Filter(r ->
  (r['Department'] = 'IT') and
  (r['Salary'] > 80000)
)
```

## Сортировка

| Pandas                                      | DataFrame                       |
| ------------------------------------------- | ------------------------------- |
| `df.sort_values('Salary')`                  | `df.SortBy('Salary')`           |
| `df.sort_values('Salary', ascending=False)` | `df.SortByDescending('Salary')` |

## Статистика

| Pandas                  | DataFrame                |
| ----------------------- | ------------------------ |
| `df['Salary'].min()`    | `df.Min('Salary')`       |
| `df['Salary'].max()`    | `df.Max('Salary')`       |
| `df['Salary'].mean()`   | `df.Mean('Salary')`      |
| `df['Salary'].median()` | `df.Median('Salary')`    |
| `df['Salary'].std()`    | `df.Std('Salary')`       |
| `df['Salary'].var()`    | `df.Variance('Salary')`  |

## Группировка

Pandas:

```python
df.groupby('City')['Salary'].max()
```

DataFrame:

```pascal
df.GroupBy('City')
  .Max('Salary')
```

## Категориальные данные

| Pandas                      | DataFrame                |
| --------------------------- | ------------------------ |
| `df['City'].unique()`       | `df.Unique('City')`      |
| `df['City'].nunique()`      | `df.NUnique('City')`     |
| `df['City'].value_counts()` | `df.ValueCounts('City')` |

## Пропущенные данные

| Pandas                      | DataFrame                 |
| --------------------------- | ------------------------- |
| `df.isna().sum()`           | `df.MissingCounts`        |
| `df.dropna()`               | `df.DropMissing()`        |
| `df.dropna(subset=['Age'])` | `df.DropMissing(['Age'])` |

Для заполнения пропусков в ML PascalABC.NET рекомендуется использовать класс `Imputer`.

## Дубликаты

| Pandas                 | DataFrame             |
| ---------------------- | --------------------- |
| `df.drop_duplicates()` | `df.DropDuplicates()` |

## Ограничение диапазона

| Pandas                 | DataFrame                |
| ---------------------- | ------------------------ |
| `df['Age'].clip(18,70)` | `df.Clip('Age', 18, 70)` |

## Основные отличия

`DataFrame` не является прямой копией Pandas.

В `DataFrame`:

- отсутствует индекс строк;
- отсутствуют `loc`, `iloc` и `at`;
- отсутствуют строковые запросы `query(...)`;
- отсутствуют операции `inplace=True`;
- используются типизированные столбцы (`Integer`, `Real`, `String`, `Boolean`, `DateTime`);
- фильтрация и преобразования выполняются с помощью лямбда-выражений PascalABC.NET.

Такой подход делает код более типобезопасным и лучше соответствует стилю PascalABC.NET.
