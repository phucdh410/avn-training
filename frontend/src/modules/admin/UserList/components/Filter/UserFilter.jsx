import React from 'react';
import PropTypes from 'prop-types';
import { CTabAdmin, CSelectAdmin } from 'src/commons';
import { USER_FILTER, USER_SORT } from 'src/configs/table.config';
import { ROUTE_ADMIN } from 'src/configs/route.config';
import './UserFilter.scss';

export const FilterBar = ({
	tabActive,
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

	return (
		<div className="filter-bar flex">
			<div className="filter-type hidden xl:flex flex-auto space-x-3">
				{USER_FILTER.map((tab, index) => (
					<CTabAdmin
						key={index}
						isActive={
							tabActive
								? tabActive === tab.value + ''
									? true
									: false
								: tab.value === ''
								? true
								: false
						}
						path={`${ROUTE_ADMIN.ACCOUNT.BASE}${ROUTE_ADMIN.POST.LIST}`}
						name={tab.name}
						value={`${
							tab.value !== '' ? `?active=${tab.value}` : ''
						}`}
					/>
				))}
			</div>
			<div className="filter-more flex flex-auto xl:justify-end space-x-3">
				<CSelectAdmin
					placeholder="Sắp xếp theo thời gian tạo"
					options={USER_SORT.SORT_BY}
					defaultValue={sortByActive || USER_SORT.SORT_BY[0].value}
					onChange={onChangeSortBy}
				/>
				<CSelectAdmin
					placeholder="Giảm dần"
					options={USER_SORT.SORT_TYPE}
					defaultValue={
						sortTypeActive || USER_SORT.SORT_TYPE[0].value
					}
					onChange={onChangeSortType}
				/>
			</div>
		</div>
	);
};

FilterBar.propTypes = {
	tabActive: PropTypes.any,
	onChangeSort: PropTypes.func,
	sortByActive: PropTypes.string,
	sortTypeActive: PropTypes.string,
};
