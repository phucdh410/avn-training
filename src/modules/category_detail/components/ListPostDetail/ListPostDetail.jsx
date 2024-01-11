import React from 'react';
import PropTypes from 'prop-types';
import './ListPostDetail.scss';

import { PostDetail } from '..';
import { getLinkImage } from 'src/utils/function.util';
import { useTranslation } from 'react-i18next';

export const ListPostDetail = ({ posts }) => {
	console.log(
		'🚀 ~ file: ListPostDetail.jsx:10 ~ ListPostDetail ~ posts:',
		posts,
	);
	const { t } = useTranslation();
	return (
		<div className="list-detail">
			<div className="list-detail__heading">
				{/* <p>.</p> */}
				<h4 className="list-detail__heading--title">
					{t('topic_content')}
				</h4>
			</div>
			<div className="list-detail__post">
				{posts?.map((post, index) => (
					<PostDetail
						key={index}
						name={post?.title}
						image={getLinkImage(post?.banner?.path)}
						done={post?.done}
						type={post?.type}
						slug={post?.slug}
						createdAt={post?.createdAt}
					/>
				))}
			</div>
		</div>
	);
};

ListPostDetail.propTypes = {
	posts: PropTypes.any,
};
