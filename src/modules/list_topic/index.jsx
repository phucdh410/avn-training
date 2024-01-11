import React, { useState, useEffect, useMemo } from 'react';
import { GridTopic, Breadcumb, CategorySlider } from './components';
import api from 'src/api';
import './index.scss';
import { useQuery } from 'src/hooks/query.hook';
import { stringify } from 'query-string';
import { useHistory } from 'react-router-dom';
import Client from '../client';
import { useWindowDimension } from 'src/hooks/window_demision.hook';
import { goToTop } from 'src/utils/function.util';

export const ListTopic = () => {
	const [topics, setTopics] = useState();
	const [pinTopics, setPinTopics] = useState();
	const [categories, setCategories] = useState();
	const [currentUrl, setCurrentUrl] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [keyWord, setKeyWord] = useState('');
	const [width] = useWindowDimension();
	const query = useQuery();
	const history = useHistory();

	useEffect(() => {
		goToTop();
	}, []);

	const pageLimit = useMemo(() => {
		if (width < 770) {
			return 10;
		}

		return 9;
	}, [width]);

	useEffect(() => {
		if (query.page) {
			const intPage = parseInt(query.page);

			if (intPage !== 'NaN') {
				setCurrentPage(intPage);
			}
		}
	}, [query.page]);

	useEffect(() => {
		const newUrl = location.pathname + location.search;

		if (currentUrl !== newUrl) {
			const getCategories = async () => {
				const result = await api.category.getListCategoryPaging({
					deleted: false,
					active: true,
					limit: pageLimit,
					sortBy: 'sortOrder',
					sortType: 'desc',
					...query,
				});

				setCategories(result?.data);
			};

			setCurrentUrl(newUrl);
			getCategories();
		}
	}, [currentUrl, pageLimit, query]);

	useEffect(() => {
		const getData = async () => {
			const topics = await Promise.all([
				api.topic.getList({
					deleted: false,
					active: true,
				}),
				api.topic.getList({
					deleted: false,
					active: true,
					isPin: true,
				}),
			]);

			setTopics(topics[0]?.data);
			setPinTopics(topics[1]?.data);
		};

		getData();
	}, []);

	const onChangePage = page => {
		const currentPath = history.location.pathname;
		const queryPage = { ...query, page };
		const newQueryStr = '?' + stringify(queryPage);

		history.push(currentPath + newQueryStr);
	};

	const onChangeKeyWord = e => setKeyWord(e?.target?.value);

	const onSubmitSearchKeyWord = () => {
		const currentPath = history.location.pathname;
		const queryPage = { ...query, title: keyWord };
		const newQueryStr = '?' + stringify(queryPage);

		history.push(currentPath + newQueryStr);
	};

	return (
		<Client className="list-topic">
			<Breadcumb />
			<CategorySlider data={topics} />
			<GridTopic
				pageLimit={pageLimit}
				categories={categories}
				pinTopics={pinTopics}
				currentPage={currentPage}
				onChangePage={onChangePage}
				onChangeKeyWord={onChangeKeyWord}
				onSubmitSearch={onSubmitSearchKeyWord}
			/>
		</Client>
	);
};
