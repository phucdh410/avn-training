import './GridTopic.scss';

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { CFilter, CTopicGrid, CTopicCard, CPaging } from 'src/commons';
import { getLinkImage } from 'src/utils/function.util';
import { useTranslation } from 'react-i18next';

export const GridTopic = ({
	categories,
	currentPage,
	onChangePage,
	pinTopics,
	// onChangeKeyWord,
	// onSubmitSearch,
	pageLimit,
}) => {
	// const onSubmit = e => {
	// 	if (e.key === 'Enter') {
	// 		onSubmitSearch();
	// 		return;
	// 	}
	// };
	const { t } = useTranslation();

	const sortCategories = useMemo(() => {
		const data = categories?.data?.sort((a, b) => {
			if (a.sortOrder !== b.sortOrder) {
				return b.sortOrder - a.sortOrder;
			}
			return new Date(b.createdAt) - new Date(a.createdAt);
		});

		return {
			data,
			total: categories?.total,
		};
	}, [categories]);

	return (
		<div className="list__topic-wrap">
			<div className="list__topic">
				<div className="list__topic__header">
					<div className="list__topic__header__title">
						{t('all_topics')}
					</div>
					{/* <div className="list__topic__header__search">
						<input
							type="text"
							className="list__topic__header__search__input"
							placeholder="Tìm kiếm chủ đề..."
							onKeyDown={onSubmit}
							onChange={onChangeKeyWord}
						/>
						<i className="icon search"></i>
					</div> */}
				</div>

				<div className="list__topic__body">
					<div className="list__topic__body__filter">
						<CFilter topics={pinTopics} type="topic" />
					</div>
					<CTopicGrid className="list__topic__body__grid">
						{sortCategories?.data?.map((topic, index) => (
							<CTopicCard
								key={index}
								href={`/category/${topic?.slug}`}
								title={topic?.name}
								description={topic?.description}
								image={getLinkImage(topic?.banner?.path)}
								type="list-topic-card"
							/>
						))}
					</CTopicGrid>
				</div>
				<div className="paging-wrapper">
					<CPaging
						total={sortCategories?.total}
						current={currentPage}
						limit={pageLimit}
						onChangePage={onChangePage}
					/>
				</div>
				{/* <GridTopicPaging total={topics?.total} /> */}
			</div>
		</div>
	);
};

GridTopic.propTypes = {
	categories: PropTypes.any,
	currentPage: PropTypes.number,
	onChangePage: PropTypes.func,
	pinTopics: PropTypes.any,
	keyWord: PropTypes.string,
	onChangeKeyWord: PropTypes.func,
	onSubmitSearch: PropTypes.func,
	pageLimit: PropTypes.number,
};
