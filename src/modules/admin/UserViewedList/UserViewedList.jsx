import React, { useState, useEffect } from 'react';
import { USER_VIEWED_COLUMS } from 'src/configs/table.config';
import { CTable } from 'src/commons';
import { FilterBar } from './components';
import { stringify } from 'query-string';
import { useQuery } from 'src/hooks/query.hook';
import api from 'src/api';
import './UserViewedList';
import { useParams, useHistory } from 'react-router-dom';
import { objectFlat } from 'src/utils/function.util';
import { Button } from 'antd';

export const UserViewedList = () => {
	const [users, setUsersData] = useState();
	const [sortObj, setSortObj] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [currentUrl, setCurrentUrl] = useState();
	const history = useHistory();
	const query = useQuery();
	const params = useParams();

	useEffect(() => {
		const newUrl = location.pathname + location.search;

		if (currentUrl !== newUrl) {
			const getUserViewed = async () => {
				const users = await api.postUser.getListPostUserViewedPaging(
					params.id,
					query,
				);

				const usersFormated = objectFlat(users);

				setUsersData(usersFormated);
			};

			getUserViewed();
			setCurrentUrl(newUrl);
		}
	}, [currentUrl, params.id, query]);

	useEffect(() => {
		if (query.page) {
			setCurrentPage(parseInt(query.page));
		}
	}, [query.page]);

	const onChangeSort = newSortObj => {
		const currentSortObj = { ...sortObj, ...query, ...newSortObj };

		const currentQueryStr = '?' + stringify(currentSortObj);

		const newUrl = location.pathname + currentQueryStr;

		history.push(newUrl);
		setSortObj(currentSortObj);
	};

	const onExport = async () => {
		await api.postUser.exportUserViewed(params.id, query);
	};

	return (
		<section className="user-list">
			<div className="white-block-content">
				<h1 className="header-title">
					Danh sách nhân viên đã xem bài viết
				</h1>
				<div className="user-filter">
					<FilterBar
						tabActive={query && query.done}
						sortByActive={query && query.sortBy}
						sortTypeActive={query && query.sortType}
						onChangeSort={onChangeSort}
						id={params.id}
					/>
				</div>
				<div className="user-add-action">
					<Button
						type="primary"
						className="float-right mb-5"
						onClick={onExport}
					>
						Xuất ra file Excel
					</Button>
				</div>

				<CTable
					columns={[...USER_VIEWED_COLUMS]}
					data={users?.data}
					total={users?.total}
					currentPage={currentPage}
					loading={!users?.data}
					scroll={{ x: 1300 }}
				/>
			</div>
		</section>
	);
};

UserViewedList.propTypes = {};
