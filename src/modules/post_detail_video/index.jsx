import './index.scss';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ContentPostDetailVideo } from './components';
import {
	RelatedSliderPostDetail,
	HeaderPostDetail,
} from '../post_detail/components';

import { CTest } from 'src/commons';

import Client from '../client';

import api from 'src/api';
import { useTranslation } from 'react-i18next';

export const PostDetailVideo = () => {
	const params = useParams();
	const [postDetail, setPostDetail] = useState();
	const [postRelateds, setPostRelated] = useState();
	const [testDetail, setTestDetail] = useState();
	const [done, setDone] = useState(false);
	const history = useHistory();
	const { t } = useTranslation();

	useEffect(() => {
		const getData = async () => {
			try {
				const result = await api.post.getBySlug(params?.slug);

				const postRelateds = await api.post.userGetByCategoryId(
					result?.data?.categoryId?._id,
				);

				setPostRelated(postRelateds?.data);

				setPostDetail(result?.data);

				if (result?.data?.statusView?.done) {
					setDone(true);
				}
			} catch (err) {
				history.push('/404');
			}
		};

		getData();
	}, [history, params?.slug]);

	useEffect(() => {
		if (postDetail) {
			const getData = async () => {
				const testDetail = await api.exam.getByPostId(postDetail?._id);

				if (testDetail) {
					setTestDetail(testDetail?.data);
				}
			};

			getData();
		}
	}, [postDetail]);

	return (
		<Client className="post-video-detail">
			<HeaderPostDetail
				postDetail={postDetail}
				testDetail={testDetail}
				postRelated={postRelateds}
			/>
			<ContentPostDetailVideo
				key={params?.slug}
				{...postDetail}
				setDone={setDone}
			/>

			{testDetail && (
				<div className="text__wrapper">
					<CTest
						href={testDetail.url}
						canTest={done}
						disabledText={t('please_read_carefully_9')}
					/>
				</div>
			)}
			<RelatedSliderPostDetail
				postDetail={postDetail}
				postRelateds={postRelateds}
			/>
		</Client>
	);
};
