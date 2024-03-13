import './index.scss';

import React, { useEffect, useState } from 'react';

import { PinTopic, Breadcumb } from './components';

import Client from '../client';
import api from 'src/api';
import { goToTop } from 'src/utils/function.util';

export const PinTopicPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pinPosts, setPinPosts] = useState();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		goToTop();
	}, []);

	useEffect(() => {
		const getData = async () => {
			const result = await api.category.getListCategoryPaging({
				limit: 10,
				active: true,
				sortBy: 'sortOrder',
				sortType: 'desc',
				client: true,
			});
			setPinPosts(result?.data?.data);
			setTotal(result?.data?.total);
		};
		getData();
	}, []);

	const onShowMore = async () => {
		const result = await api.category.getListCategoryPaging({
			limit: 10,
			active: true,
			sortBy: 'sortOrder',
			sortType: 'desc',
			page: currentPage + 1,
			client: true,
		});

		setCurrentPage(currentPage + 1);

		setPinPosts([...pinPosts, ...result.data.data]);
	};

	return (
		<Client className="pin-topic-page">
			<Breadcumb />
			<PinTopic
				data={pinPosts}
				onShowMore={onShowMore}
				total={total}
				page={currentPage}
			/>
		</Client>
	);
};
