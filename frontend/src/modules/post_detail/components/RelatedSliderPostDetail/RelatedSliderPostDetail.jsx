import './RelatedSliderPostDetail.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { CSlider, CButton } from 'src/commons';
import { PostDetail } from 'src/modules/category_detail/components/PostDetail/PostDetail';

import { POST_TYPE } from 'src/configs/constant.config';
import { getLinkImage } from 'src/utils/function.util';

import arr from '../../assets/img/arrow-right.png';
import excludeIcon from '../../assets/Exclude-icon.svg';

import { RESPONSIVE_SIZE } from 'src/configs/responsive.config';
import { useTranslation } from 'react-i18next';

const responsive = [
	{
		breakpoint: RESPONSIVE_SIZE.XL2,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
		},
	},
	{
		breakpoint: RESPONSIVE_SIZE.MD,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
		},
	},
	{
		breakpoint: RESPONSIVE_SIZE.SM,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		},
	},
];
export const RelatedSliderPostDetail = ({ postRelateds, postDetail }) => {
	const { t } = useTranslation();
	return (
		<div className="related-slider">
			<img src={excludeIcon} className="related-list__Ex-right" alt="" />
			<div className="related-slider__header">
				<h4 className="related-slider__header__title">
					{t('related_content')}
				</h4>
				<Link to={`/category/${postDetail?.categoryId?.slug}`}>
					<CButton className="related-slider__header__btn-detail">
						{t('view_detail_content')}
						<img
							src={arr}
							className="related-slider__header__btn-detail__icon"
							alt=""
						/>
					</CButton>
				</Link>
			</div>
			<CSlider
				slidesToShow={3}
				slidesToScroll={1}
				responsive={responsive}
				className="related-slider__list"
			>
				{postRelateds?.map((post, index) => (
					<PostDetail
						name={post?.title}
						image={getLinkImage(post?.banner?.path)}
						key={index}
						done={post?.done}
						href={`/post/${
							post?.type === POST_TYPE.TEXT ? 'text' : 'video'
						}/${post.slug}`}
						createdAt={post?.createdAt}
						type={post?.type}
						slug={post?.slug}
					/>
				))}
			</CSlider>
		</div>
	);
};

RelatedSliderPostDetail.propTypes = {
	postDetail: PropTypes.any,
	postRelateds: PropTypes.any,
};
