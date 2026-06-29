# ML PascalABC.NET

[Русская версия](README.ru.md)


**ML PascalABC.NET** is a production-level machine learning and AI platform for PascalABC.NET.

The platform is included in the PascalABC.NET distribution and is available to users as part of the language ecosystem. It provides a complete dependency-free ML stack: from tabular data storage and feature preprocessing to classical machine learning models, metrics, validation, pipelines, and the numerical linear algebra core.

The goal of the project is to make machine learning available in PascalABC.NET while preserving clear architecture, type safety, predictable behavior, and educational transparency.
## Website

This repository contains the official website for the ML PascalABC.NET project:

```text
https://pascalabcnet.github.io/ai/
```

The site serves as the public entry point for the project: documentation, examples, architectural notes, educational materials, and project overview.

## About the project

ML PascalABC.NET is a layered machine learning platform built specifically for PascalABC.NET.

It is designed around several core principles:

* **No external dependencies**
  The platform is implemented entirely in PascalABC.NET and does not require third-party ML, DataFrame, numerical, or visualization libraries.

* **Production-level architecture**
  The system is structured into clear layers with strict separation of responsibilities.

* **Educational clarity**
  Algorithms and data structures are implemented in a way that can be studied, explained, and used in teaching.

* **Predictable behavior**
  The platform avoids hidden magic. Operations are explicit, type-aware, and designed to fail fast when the input is invalid.

* **Type safety**
  Data columns, schemas, model interfaces, labels, and transformations are handled through explicit contracts.

* **DataFrame-first workflow**
  The platform supports tabular data processing, preprocessing, model training, prediction, validation, and metrics in a unified workflow.

## Architecture

The platform follows a layered architecture:

```text
DataFrameABC
    ↓
DataAdapters
    ↓
MLABC
    ↓
MLModelsABC / ValidationML / MetricsABC
    ↓
LinearAlgebraML
```

### DataFrameABC

`DataFrameABC` is the tabular data layer.

It provides a column-store DataFrame implementation with typed columns:

```text
Int / Float / Str / Bool
```

Key features include:

* typed column storage;
* explicit schema;
* missing-value support through validity masks;
* cursor-based row access;
* filtering;
* selecting and dropping columns;
* renaming columns;
* grouping;
* joins;
* schema propagation;
* categorical metadata;
* predictable tabular transformations.

### DataAdapters

`DataAdapters` connects tabular data with the numerical ML layer.

It converts DataFrame columns into matrix and vector representations suitable for machine learning algorithms.

### LinearAlgebraML

`LinearAlgebraML` is the numerical foundation of the platform.

It provides dense matrix and vector operations required by ML algorithms, including decomposition methods and transformations such as PCA.

### MLCoreABC

`MLCoreABC` defines the core model interfaces:

```text
IModel
ISupervisedModel
IClassifier
IRegressor
IProbabilisticClassifier
ITransformer
IPreprocessor
```

These interfaces define a consistent contract for models, preprocessors, transformers, pipelines, and validation tools.

### MLModelsABC

`MLModelsABC` contains classical machine learning models, including:

* linear regression;
* logistic regression;
* k-nearest neighbors;
* decision trees;
* random forests;
* gradient boosting;
* classification models;
* regression models.

The models are implemented without external ML libraries and are integrated with the common platform interfaces.

### PreprocessorABC

`PreprocessorABC` provides preprocessing and feature engineering tools:

* imputers;
* standard scaling;
* min-max scaling;
* label encoding;
* one-hot encoding.

Preprocessors follow the usual `Fit` / `Transform` logic and are designed to work as part of larger ML pipelines.

### ValidationML

`ValidationML` provides model validation tools:

* K-fold cross-validation;
* stratified K-fold cross-validation;
* cross-validation helpers.

The validation layer works through model cloning and common model interfaces.

### MetricsABC

`MetricsABC` provides regression and classification metrics, including tools based on confusion matrices and encoded labels.

### Pipelines

The platform includes pipeline abstractions for building complete ML workflows.

Pipeline layers support:

* preprocessing;
* fitting;
* prediction;
* probability prediction for classifiers;
* label encoding;
* DataFrame-based workflows;
* matrix-based workflows.

Specialized pipelines are used for classification, regression, and clustering scenarios.

## Why PascalABC.NET?

PascalABC.NET is a modern Pascal-based programming language and environment designed for education and practical programming.

ML PascalABC.NET extends this ecosystem with a complete machine learning stack that can be used:

* in university courses;
* in school-level advanced programming courses;
* for teaching data science and AI concepts;
* for demonstrating ML algorithms from the inside;
* for practical tabular ML tasks;
* as a production-oriented educational library.

The project aims to show that a modern, type-safe, dependency-free ML platform can be built in PascalABC.NET without sacrificing clarity or architectural discipline.

## Key design principles

### Dependency-free implementation

The platform does not rely on external numerical, ML, DataFrame, or preprocessing libraries.

This makes the system:

* easy to distribute as part of PascalABC.NET;
* easy to install and use without additional setup;
* easy to study and explain;
* suitable for educational and practical scenarios;
* transparent for teaching machine learning, data analysis, and numerical algorithms.

### Explicit architecture

Each module has a clear role.

Data storage, preprocessing, numerical computation, model interfaces, models, validation, metrics, and pipelines are separated into different layers.

### No hidden magic

The platform favors explicit behavior over implicit convenience.

Invalid inputs should be detected early. Type mismatches, schema inconsistencies, unsupported key types, and invalid model states are treated as errors rather than silently corrected.

### Educational and production balance

The implementation is intended to be understandable enough for teaching, but serious enough to support real use.

The project avoids both extremes:

* it is not a toy implementation;
* it is not an opaque black-box framework.

## Repository purpose

This repository contains the website and documentation source for the ML PascalABC.NET project.

The website is the main public location for describing:

* the purpose of the project;
* platform architecture;
* supported modules;
* examples;
* tutorials;
* documentation;
* educational materials;
* development notes.

## Local website development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the website:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The website is deployed to GitHub Pages:

```text
https://pascalabcnet.github.io/ai/
```

The site is published as a GitHub Pages project site under the `/ai/` base path.

## License

No license has been specified yet.
