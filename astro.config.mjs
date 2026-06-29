// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
        site: 'https://pascalabcnet.github.io',
	base: isProd ? '/ai/' : '/',

	devToolbar: {
		enabled: false,
	},
	integrations: [
		starlight({
			title: 'ML PascalABC.NET',
			pagination: false,
			customCss: ['./src/styles/custom.css'],
			components: {
				Header: './src/components/SiteHeader.astro',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/pascalabcnet/pascalabcnet' }],
			locales: {
				root: {
					label: 'Русский',
					lang: 'ru',
				},
			},
			sidebar: [
				{
					label: '🏠 Обзор',
					collapsed: false,
					items: [
						{ label: 'О библиотеке', link: '/' },
					],
				},
				{
					label: '📋 Начало работы',
					collapsed: false,
					items: [
						{ label: 'Установка', slug: 'getting-started/installation' },
						{ label: 'Быстрый старт', slug: 'getting-started/first-model' },
					],
				},
				{
					label: '📊 Данные',
					collapsed: true,
					items: [
						{ label: 'Класс DataFrame', slug: 'dataframe' },
						{ label: 'Загрузка и просмотр', link: '/dataframe/loading/' },
						{ label: 'Действия со столбцами', link: '/dataframe/columns/' },
						{ label: 'Фильтрация и сортировка', link: '/dataframe/filter-sort/' },
						{ label: 'Статистика', link: '/dataframe/statistics/' },
						{ label: 'Группировка', link: '/dataframe/grouping/' },
						{ label: 'Объединение таблиц', link: '/dataframe/join/' },
						{ label: 'Дата и время', link: '/dataframe/datetime/' },
						{ label: 'Пропущенные данные', link: '/dataframe/missing/' },
						{ label: 'DataFrame и Pandas', link: '/dataframe/pandas/' },
					],
				},
				{
					label: '🔧 Подготовка данных',
					collapsed: true,
					items: [
						{ label: 'Обзор', link: '/preprocessing/' },
						{ label: 'Обработка пропусков', link: '/preprocessing/missing/' },
						{ label: 'Кодирование категорий', link: '/preprocessing/encoding/' },
						{ label: 'Масштабирование признаков', link: '/preprocessing/scaling/' },
					],
				},
				{
					label: '🧠 Машинное обучение',
					collapsed: true,
					items: [
						{ label: 'Обзор задач', link: '/models/' },
						{
							label: 'Классификация',
							collapsed: false,
							items: [
								{ label: 'Обзор', link: '/models/classification/' },
								{ label: 'LogisticRegression', link: '/models/classification/logistic-regression/' },
								{ label: 'KNNClassifier', link: '/models/classification/knn-classifier/' },
								{ label: 'DecisionTreeClassifier', link: '/models/classification/decision-tree-classifier/' },
								{
									label: 'Оценка качества',
									collapsed: true,
									items: [
										{ label: 'Train/Test Split', link: '/validation/train-test-split/' },
										{ label: 'Accuracy', link: '/metrics/accuracy/' },
										{ label: 'Матрица ошибок', link: '/metrics/confusion-matrix/' },
										{ label: 'Precision / Recall / F1', link: '/metrics/precision-recall-f1/' },
									],
								},
								{ label: 'RandomForestClassifier', link: '/models/classification/random-forest-classifier/' },
								{ label: 'GradientBoostingClassifier', link: '/models/classification/gradient-boosting-classifier/' },
							],
						},
						{
							label: 'Регрессия',
							collapsed: true,
							items: [
								{ label: 'LinearRegression', link: '/models/regression/linear-regression/' },
								{ label: 'KNNRegressor', link: '/models/regression/knn-regressor/' },
								{ label: 'DecisionTreeRegressor', link: '/models/regression/decision-tree-regressor/' },
								{ label: 'RandomForestRegressor', link: '/models/regression/random-forest-regressor/' },
								{ label: 'GradientBoostingRegressor', link: '/models/regression/gradient-boosting-regressor/' },
							],
						},
						{
							label: 'Кластеризация',
							collapsed: true,
							items: [
								{ label: 'KMeans', link: '/models/clustering/kmeans/' },
								{ label: 'DBSCAN', link: '/models/clustering/dbscan/' },
							],
						},
						{
							label: 'Оценка качества',
							collapsed: true,
							items: [
								{ label: 'TrainTestSplit', link: '/validation/train-test-split/' },
								{ label: 'Accuracy', link: '/metrics/accuracy/' },
								{ label: 'Матрица ошибок', link: '/metrics/confusion-matrix/' },
								{ label: 'Precision / Recall / F1', link: '/metrics/precision-recall-f1/' },
								{ label: 'MAE', link: '/metrics/mae/' },
								{ label: 'MSE', link: '/metrics/mse/' },
								{ label: 'RMSE', link: '/metrics/rmse/' },
								{ label: 'R²', link: '/metrics/r2/' },
								{ label: 'SilhouetteScore', link: '/metrics/silhouette-score/' },
								{ label: 'AdjustedRandIndex', link: '/metrics/adjusted-rand-index/' },
								{ label: 'KFold', link: '/validation/kfold/' },
								{ label: 'StratifiedKFold', link: '/validation/stratified-kfold/' },
								{ label: 'CrossValidate', link: '/validation/cross-validate/' },
							],
						},
					],
				},
				{
					label: '🧩 Конвейеры',
					collapsed: true,
					items: [
						{ label: 'Конвейеры', slug: 'getting-started/first-pipeline' },
					],
				},
				{
					label: '📈 Визуализация',
					collapsed: true,
					items: [
						{ label: 'PlotML', slug: 'visualization' },
					],
				},
				{
					label: '🗃️ Наборы данных',
					collapsed: true,
					items: [
						{ label: 'Встроенные датасеты', slug: 'datasets' },
					],
				},
				{
					label: '💡 Примеры',
					collapsed: true,
					items: [
						{ label: 'Примеры', slug: 'examples' },
					],
				},
			],
		}),
	],
});
