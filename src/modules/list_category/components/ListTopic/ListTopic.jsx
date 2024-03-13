import React, { useMemo } from 'react';
import './ListTopic.scss';
import { CFilter, CPaging, CTopicCard, CTopicGrid } from 'src/commons';
import PropTypes from 'prop-types';
import { getLinkImage } from 'src/utils/function.util';
import { useTranslation } from 'react-i18next';

export const ListTopic = ({
	categories,
	currentPage,
	onChangePage,
	// onChangeKeyWord,
	// onSubmitSearch,
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
			if (a?.sortOrder !== b?.sortOrder) {
				return b?.sortOrder - a?.sortOrder;
			} else {
				return new Date(b?.createdAt) - new Date(a?.createdAt);
			}
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
						{t('list_of_topics')}
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
						<CFilter
							topics={sortCategories?.data}
							type="category"
							isRandom
							isDisabled
						/>
					</div>
					<CTopicGrid className="list__topic__body__grid">
						{sortCategories?.data?.map((category, index) => (
							<CTopicCard
								key={index}
								href={`/category/${category?.slug}`}
								title={category?.name}
								description={category?.description}
								image={getLinkImage(category?.banner?.path)}
								type="list-topic-card"
							/>
						))}
					</CTopicGrid>
				</div>
				<div className="paging-wrapper">
					<CPaging
						total={sortCategories?.total}
						current={currentPage}
						limit={9}
						onChangePage={onChangePage}
					/>
				</div>

				{/* <GridTopicPaging total={topics?.total} /> */}
			</div>
		</div>
	);
};

ListTopic.propTypes = {
	categories: PropTypes.any,
	total: PropTypes.number,
	currentPage: PropTypes.number,
	limit: PropTypes.number,
	onChangePage: PropTypes.func,
	keyWord: PropTypes.string,
	onChangeKeyWord: PropTypes.func,
	onSubmitSearch: PropTypes.func,
};
