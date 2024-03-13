import React from 'react';
import PropTypes from 'prop-types';
import { CTabAdmin, CSelectAdmin } from 'src/commons';
import { TOPIC_FILTER, TOPIC_SORT } from 'src/configs/table.config';
import { ROUTE_ADMIN } from 'src/configs/route.config';
import './TopicFilter.scss';

export const FilterBar = ({
	tabActive,
	pinActive,
	onChangeSort,
	sortByActive,
	sortTypeActive,
}) => {
	const onChangeSortBy = value => {
		onChangeSort({ sortBy: value });
	};

	const onChangeSortType = value => {
		onChangeSort({ sortType: value });
	};

	const getValue = value => {
		if (value === 'isPin') {
			return `${value !== '' ? `?isPin=true` : ''}`;
		} else {
			return `${value !== '' ? `?active=${value}` : ''}`;
		}
	};

	const checkActive = value => {
		if (pinActive && value === 'isPin') {
			return true;
		}

		if (tabActive) {
			return tabActive === value + '' ? true : false;
		}

		if (!tabActive && !pinActive && value === '') {
			return true;
		}
	};

	return (
		<div className="filter-bar flex">
			<div className="filter-type hidden xl:flex flex-auto space-x-3">
				{TOPIC_FILTER.map((tab, index) => (
					<CTabAdmin
						key={index}
						isActive={checkActive(tab.value)}
						path={`${ROUTE_ADMIN.TOPIC.BASE}${ROUTE_ADMIN.TOPIC.LIST}`}
						name={tab.name}
						value={getValue(tab.value)}
					/>
				))}
			</div>
			<div className="filter-more flex flex-auto xl:justify-end space-x-3">
				<CSelectAdmin
					placeholder="Sắp xếp theo thời gian tạo"
					options={TOPIC_SORT.SORT_BY}
					defaultValue={sortByActive || TOPIC_SORT.SORT_BY[0].value}
					onChange={onChangeSortBy}
				/>
				<CSelectAdmin
					placeholder="Giảm dần"
					options={TOPIC_SORT.SORT_TYPE}
					defaultValue={
						sortTypeActive || TOPIC_SORT.SORT_TYPE[0].value
					}
					onChange={onChangeSortType}
				/>
			</div>
		</div>
	);
};

FilterBar.propTypes = {
	tabActive: PropTypes.any,
	pinActive: PropTypes.any,
	onChangeSort: PropTypes.func,
	sortByActive: PropTypes.string,
	sortTypeActive: PropTypes.string,
};
