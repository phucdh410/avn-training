import React, { useEffect, useState } from 'react';
import './ContentPostDetail.scss';
import PropTypes from 'prop-types';
import htmlParse from 'html-react-parser';
// import { API_URL } from 'src/configs/constant.config';

export const ContentPostDetail = ({ postDetail }) => {
	const [contentFormated, setContentFormated] = useState('');

	useEffect(() => {
		if (postDetail?.content) {
			let content = postDetail?.content;

			// const imgTags = content.match(/<img[^>]+src="([^">]+)"/g);

			// const srcRegex = /<img.*?src="(.*?)"/;

			// if (imgTags?.length) {
			// 	imgTags.forEach(img => {
			// 		const src = srcRegex.exec(img)[1];

			// 		content = content?.replace(src, `${API_URL}${src}`);
			// 	});
			// }

			setContentFormated(content);
		}
	}, [postDetail?.content]);

	return (
		<div className="content-post">
			<div className="content-post__title">{postDetail?.title}</div>
			<div className="content-post__content">
				{contentFormated && htmlParse(contentFormated)}
			</div>
		</div>
	);
};

ContentPostDetail.propTypes = {
	postDetail: PropTypes.any,
};
