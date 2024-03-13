import './index.scss';

import React, { useState, useEffect } from 'react';

import { Introduce, NormalTopic, PinTopic, Slide } from './components';
import Client from '../client';

import api from 'src/api';
import { getLinkImage } from 'src/utils/function.util';
import i18n from 'i18next';

export const Homepage = () => {
	const [detail, setDetail] = useState();
	const [pinPosts, setPinPosts] = useState();
	const [normalPosts, setNormalPosts] = useState();

	useEffect(() => {
		const getHomepage = async () => {
			const result = await api.homepage.getHomePageByLanguage({
				lang: i18n.language,
			});

			setDetail(result?.data);
		};

		getHomepage();
	}, []);

	useEffect(() => {
		const getData = async () => {
			const results = await Promise.all([
				api.category.getListCategoryPaging({
					limit: 4,
					active: true,
					sortBy: 'sortOrder',
					sortType: 'desc',
					client: true,
				}),
				api.topic.getListTopicPaging({
					limit: 10,
					//isPin: false,
					active: true,
					sortBy: 'sortOrder',
					sortType: 'desc',
					client: true,
				}),
			]);

			setPinPosts(results[0]?.data?.data);
			setNormalPosts(results[1]?.data?.data);

			setTimeout(() => {
				const node = document.getElementById('pin-topic');

				if (node) {
					window.scrollTo({
						top: node.offsetTop,
						behavior: 'smooth',
					});
				}
			}, 1000);
		};

		getData();
	}, []);

	return (
		<Client className="homepage">
			<Slide
				slides={detail?.slides
					.sort((a, b) => b.sortOrder - a.sortOrder)
					.map(slide => ({
						...slide,
						image: getLinkImage(slide?.file?.path || ''),
					}))}
			/>
			<Introduce
				introduce={detail?.introduce}
				bigBanner={
					detail?.bigBanner
						? getLinkImage(detail?.bigBanner?.path)
						: ''
				}
				smallBanner={
					detail?.smallBanner
						? getLinkImage(detail?.smallBanner?.path)
						: ''
				}
			/>

			<PinTopic data={pinPosts} />

			<NormalTopic data={normalPosts} />
		</Client>
	);
};
