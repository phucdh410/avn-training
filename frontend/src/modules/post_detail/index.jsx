import './index.scss';

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
	HeaderPostDetail,
	ContentPostDetail,
	RelatedSliderPostDetail,
} from './components';

import { CTest } from 'src/commons';

import api from 'src/api';
import { ACCOUNT_TYPE } from 'src/configs/constant.config';
import { UserContext } from 'src/contexts/user.context';

import Client from '../client';

export const PostDetailClient = () => {
	const params = useParams();
	const [userContext] = useContext(UserContext);
	const [postDetail, setPostDetail] = useState();
	const [postRelated, setPostRelated] = useState();
	const [testDetail, setTestDetail] = useState();
	const history = useHistory();

	useEffect(() => {
		const getData = async () => {
			api.post
				.getBySlug(params?.slug)
				.then(result => {
					setPostDetail(result?.data);
				})
				.catch(() => history.push('/404'));
		};

		getData();
	}, [history, params?.slug]);

	useEffect(() => {
		if (postDetail) {
			const getData = async () => {
				const postRelateds = await api.post.userGetByCategoryId(
					postDetail?.categoryId?._id,
				);

				setPostRelated(postRelateds?.data);

				const testDetail = await api.exam.getByPostId(postDetail?._id);

				if (testDetail) {
					setTestDetail(testDetail?.data);
				}
			};

			getData();
		}
	}, [postDetail]);

	useEffect(() => {
		if (postDetail && userContext?.group === ACCOUNT_TYPE.USER) {
			const updateUserViewed = async () => {
				const result = await api.postUser.updateStatusViewed({
					postId: postDetail?._id,
					duration: 0,
					done: true,
				});

				return result;
			};

			updateUserViewed();
		}
	}, [postDetail, userContext?.group]);

	return (
		<Client className="post-detail-client">
			<HeaderPostDetail
				postDetail={postDetail}
				testDetail={testDetail}
				postRelated={postRelated}
			/>
			<ContentPostDetail postDetail={postDetail} />

			{testDetail && (
				<div className="test-wrapper">
					<CTest href={testDetail.url} />
				</div>
			)}
			<RelatedSliderPostDetail
				postDetail={postDetail}
				postRelateds={postRelated}
			/>
		</Client>
	);
};
