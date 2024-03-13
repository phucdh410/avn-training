import './RelatedList.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { CSlider } from 'src/commons';
import { RelatedListItem } from './RelatedListItem';

import excludeIcon from '../../assets/Exclude-icon.svg';

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

export const RelatedList = ({ data }) => {
	const { t } = useTranslation();
	return (
		<div className="related-list">
			<img src={excludeIcon} className="related-list__Ex-right" alt="" />
			<div className="related-list__header ">
				<div className="related-list__header__title mb-5">
					{t('other_training_topics')}
				</div>
			</div>

			{/* <div className="related-list__content">
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
					<RelatedListItem
						key={topic?._id}
						className="related-list__post__item"
						image={getLinkImage(topic?.banner?.path)}
						title={topic?.name}
						description={topic?.description}
						href={`/category/${topic?.slug}`}
					/>
				))}
			</CSlider>
		</div>
	);
};

RelatedList.propTypes = {
	data: PropTypes.any,
};
