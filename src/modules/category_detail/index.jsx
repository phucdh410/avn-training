import './index.scss';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import {
	BreadcumbDetail,
	ListPostDetail,
	RuleDetail,
	RelatedList,
} from './components';
import Client from '../client';
import { CTest } from 'src/commons';
import api from 'src/api';
import { goToTop } from 'src/utils/function.util';

export const CategoryDetail = () => {
	const params = useParams();
	const [categoryDetail, setCategoryDetail] = useState();
	const [posts, setPosts] = useState();
	const [categories, setCategories] = useState();
	const [testInfo, setTestInfo] = useState();
	const location = useLocation();
	// const [isAllViewed, setIsAllViewed] = useState();

	const isViewedAll = useMemo(() => {
		return posts?.data?.length
			? posts?.data?.every(post => post?.done)
			: false;
	}, [posts]);

	useEffect(() => {
		goToTop();
	}, [location.pathname]);

	useEffect(() => {
		const getData = async () => {
			const category = await api.category.getBySlug(params?.slug);

			setCategoryDetail(category?.data);
		};

		getData();
	}, [params?.slug]);

	useEffect(() => {
		if (categoryDetail) {
			const getCategories = async () => {
				const categories = await api.category.getListCategoryByTopic(
					categoryDetail?.topicId,
				);

				setCategories(categories?.data);
			};

			getCategories();
		}
	}, [categoryDetail]);

	useEffect(() => {
		if (categoryDetail) {
			const getPost = async () => {
				const posts = await api.post.userGetByCategoryId(
					categoryDetail?._id,
					{
						sortBy: 'sortOrder',
						sortType: 'desc',
						active: true,
						deleted: false,
					},
				);

				setPosts(posts);
			};

			getPost();
		}
	}, [categoryDetail]);

	useEffect(() => {
		if (categoryDetail) {
			const getTestInfo = async () => {
				const result = await api.exam.getByCategoryId(
					categoryDetail?._id,
				);
				setTestInfo(result?.data?.data);
			};

			getTestInfo();
		}
	}, [categoryDetail]);

	return (
		<Client className="cate-detail">
			<BreadcumbDetail category={categoryDetail} />
			<RuleDetail />
			<ListPostDetail posts={posts?.data} />

			{testInfo?.sourceType && (
				<div className="text__wrapper">
					<CTest href={testInfo.url} canTest={isViewedAll} />
				</div>
			)}

			<RelatedList data={categories} />
		</Client>
	);
};
