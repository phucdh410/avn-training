import './NormalTopic.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import { CButton, CTopicCard, CSlider } from 'src/commons';

import { RESPONSIVE_SIZE } from 'src/configs/responsive.config';

import { getLinkImage } from 'src/utils/function.util';
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

export const NormalTopic = ({ data }) => {
	const { t } = useTranslation();
	return (
		<div className="normal-topic">
			<LazyLoad once offset={100}>
				<img
					src="/assets/images/Ex_green.png"
					className="normal-topic__Ex-right"
					alt=""
				/>
			</LazyLoad>
			<LazyLoad once offset={100}>
				<img
					src="/assets/images/Ex_left.png"
					className="normal-topic__Ex-left"
					alt=""
				/>
			</LazyLoad>

			<div className="normal-topic__header">
				<div className="normal-topic__header__title">
					{t('training_theme_library')}
				</div>
				<div>
					<CButton className="normal-topic__header__btn">
						<Link to="/topic">{t('view_all_topics')}</Link>
						<img
							src="/assets/images/right.png"
							className="normal-topic__header__icon"
							alt=""
						/>
					</CButton>
				</div>
			</div>

			{/* <div className="normal-topic__content">
				<p>
					Mỗi công ty trong Tập đoàn Ajinomoto sẽ cố gắng cung cấp một
					môi trường làm việc cho phép nhân viên phát huy hết tiềm
					năng của họ, để họ và công ty có thể cùng nhau phát triển.
				</p>
			</div> */}

			<CSlider
				slidesToShow={3}
				slidesToScroll={1}
				responsive={responsive}
			>
				{data?.map(topic => (
					<CTopicCard
						key={topic?._id}
						className="normal-topic__post__item"
						image={getLinkImage(topic?.file?.path)}
						title={topic?.name}
						description={topic?.description}
						href={`/topic/${topic?.slug}`}
					/>
				))}
			</CSlider>
		</div>
	);
};

NormalTopic.propTypes = {
	data: PropTypes.any,
};
