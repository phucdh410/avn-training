import React, { useEffect, useState } from 'react';
import { ListTopic, Breadcumb } from './components';
import './index.scss';
import api from 'src/api';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'src/hooks/query.hook';
import { stringify } from 'query-string';
import Client from '../client';
import { goToTop } from 'src/utils/function.util';

export const ListCategory = () => {
	const [topicDetail, setTopicDetail] = useState();
	const [categories, setCategories] = useState();
	const [currentUrl, setCurrentUrl] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [keyWord, setKeyWord] = useState('');
	const params = useParams();
	const history = useHistory();
	const query = useQuery();

	useEffect(() => {
		goToTop();
	}, []);

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
			const getData = async () => {
				const topic = await api.topic.getBySlug(params?.slug);

				const categories = await api.category.getListCategoryPaging({
					topicId: topic?.data?._id,
					deleted: false,
					active: true,
					limit: 9,
					...query,
				});

				setCurrentUrl(newUrl);
				setTopicDetail(topic?.data);
				setCategories(categories?.data);
			};

			getData();
		}
	}, [currentUrl, params?.slug, query]);

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
		<Client className="category">
			<Breadcumb topic={topicDetail} />
			<ListTopic
				categories={categories}
				onChangePage={onChangePage}
				currentPage={currentPage}
				onChangeKeyWord={onChangeKeyWord}
				onSubmitSearch={onSubmitSearchKeyWord}
			/>
		</Client>
	);
};
