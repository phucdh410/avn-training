import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './UserList.scss';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { useQuery } from 'src/hooks/query.hook';
import { CTable, CInputAdmin } from 'src/commons';
import { selectUsersData } from 'src/redux/user/user.selector';
import { USER_COLUMS } from 'src/configs/table.config';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';
import { FilterBar, RoleModal } from './components';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { LoadingContext } from 'src/contexts/loading.context';
import {
	onGetListUser,
	onCreateUser,
	onUpdateUser,
	onUpdateActiveUser,
	onDeleteUser,
} from 'src/redux/user/user.action';
import {
	alertFail,
	alertSuccess,
	alertWarning,
	alertWarningDelete,
} from 'src/utils/alert.util';
import {
	DeleteOutlined,
	// EditOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
	UserSwitchOutlined,
} from '@ant-design/icons';
import { useDebouncedCallback } from 'use-debounce';
import { objRemovePropertyEmpty } from 'src/utils/function.util';
import axios from 'axios';
import fileDownload from 'js-file-download';
import Swal from 'sweetalert2';

const UserListContainer = ({
	users,
	onGetListUser,
	// onCreateUser,
	onUpdateUser,
	onUpdateActiveUser,
	onDeleteUser,
}) => {
	const [isModalShow, setIsModalShow] = useState(false);
	const [sortObj, setSortObj] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [userDetail, setUserDetail] = useState();
	const [currentUrl, setCurrentUrl] = useState();
	const [, setLoadingOverLay] = useContext(LoadingContext);
	const query = useQuery();
	const history = useHistory();

	useEffect(() => {
		if (query.page) {
			setCurrentPage(parseInt(query.page));
		}
	}, [query.page]);

	useEffect(() => {
		const newUrl = location.pathname + location.search;

		if (currentUrl !== newUrl) {
			onGetListUser(query);
			setCurrentUrl(newUrl);
		}
	}, [currentUrl, onGetListUser, query]);

	const debounced = useDebouncedCallback(e => {
		const value = e.target.value;

		const queryFormated = objRemovePropertyEmpty(query);

		const currentSortObj = {
			...sortObj,
			...queryFormated,
			username: value,
		};
		const currentQueryStr = '?' + stringify(currentSortObj);
		const newUrl = location.pathname + currentQueryStr;

		history.push(newUrl);
	}, 500);

	const nameDebounced = useDebouncedCallback(e => {
		const queryFormated = objRemovePropertyEmpty(query);

		const value = e.target.value;

		const currentSortObj = {
			...sortObj,
			...queryFormated,
			name: value,
			page: 1,
		};
		const currentQueryStr = '?' + stringify(currentSortObj);
		const newUrl = location.pathname + currentQueryStr;

		history.push(newUrl);
		setSortObj(currentSortObj);
	}, 500);

	const onChangeSort = newSortObj => {
		const currentSortObj = { ...sortObj, ...query, ...newSortObj };
		const currentQueryStr = '?' + stringify(currentSortObj);
		const newUrl = location.pathname + currentQueryStr;

		history.push(newUrl);
		setSortObj(currentSortObj);
	};

	const onShowModal = () => setIsModalShow(true);

	const onHideModal = () => {
		if (userDetail) {
			setUserDetail(undefined);
		}

		setIsModalShow(false);
	};

	const onEdit = data => {
		onShowModal(true);
		setUserDetail(data);
	};

	const onClickHideUser = (id, status) => {
		if (status === true) {
			setLoadingOverLay(true);

			onUpdateActiveUser(id, status, () => {
				setLoadingOverLay(false);
				onGetListUser(query);
				alertSuccess(MESSAGE_FEEDBACK.COMMON.SHOW_SUCCESS);
			});
		} else {
			alertWarning(
				MESSAGE_FEEDBACK.USER.HIDE_USER_TITLE,
				MESSAGE_FEEDBACK.USER.HIDE_USER_DESCRIPTION,
				() => {
					setLoadingOverLay(true);

					onUpdateActiveUser(id, status, () => {
						setLoadingOverLay(false);

						onGetListUser(query);
						alertSuccess(MESSAGE_FEEDBACK.COMMON.HIDE_SUCCESS);
					});
				},
			);
		}
	};

	const onClickDeleteUser = id => {
		alertWarningDelete(() => {
			setLoadingOverLay(true);

			onDeleteUser(id, () => {
				onGetListUser(query);
				setLoadingOverLay(false);
				alertSuccess(MESSAGE_FEEDBACK.COMMON.DELETE_SUCCESS);
			});
		});
	};

	const onRefetch = () => {
		onGetListUser(query);
	};

	const onExport = async () => {
		Swal.fire({
			title: 'Đang xuất dữ liệu...',
			allowOutsideClick: false,
			didOpen: async () => {
				Swal.showLoading();

				const token = localStorage.getItem('token');

				const headers = {
					Authorization: `Bearer ${token}`,
					responseType: 'blob',
				};
				await axios
					.get(
						`${process.env.REACT_APP_API_URL}/api/accounts/export`,
						{
							headers,
							responseType: 'blob',
						},
					)
					.then(({ data }) => {
						fileDownload(data, 'dsnv.xlsx');
						alertSuccess('Xuất danh sách nhân viên thành công!');
					})
					.catch(err => {
						console.log(err);
						alertFail(
							'Có lỗi xảy ra!',
							'Không thể xuất danh sách.',
						);
					});
			},
		});
	};

	return (
		<section className="user-list">
			<div className="white-block-content">
				<h1 className="header-title">Danh sách nhân viên</h1>
				<div className="user-filter">
					<FilterBar
						tabActive={query && query.active}
						sortByActive={query && query.sortBy}
						sortTypeActive={query && query.sortType}
						onChangeSort={onChangeSort}
					/>
				</div>
				<div className="user-add-action justify-between flex">
					<div className="flex space-x-5">
						<CInputAdmin
							label="Tìm kiếm theo mã nhân viên"
							placeholder="Nhập mã nhân viên ..."
							onChange={debounced}
							showIconSearch
						/>
						<CInputAdmin
							label="Tìm kiếm theo tên nhân viên"
							placeholder="Nhập tên nhân viên ..."
							onChange={nameDebounced}
							showIconSearch
						/>
					</div>
					<div className="flex space-x-5">
						<Button
							type="primary"
							className="mb-5 transition-all duration-150 hidden" //Xóa hidden nếu cần
							onClick={onExport}
						>
							Export File
						</Button>
						{/* <Button
							type="primary"
							className="float-right mb-5"
							onClick={onShowModal}
						>
							Thêm nhân viên mới
						</Button> */}
					</div>
				</div>
				<CTable
					columns={[
						...USER_COLUMS,
						{
							title: 'Thao tác',
							dataIndex: '_id',
							key: '_id',
							align: 'center',
							ellipsis: true,
							fixed: 'right',
							render: (_id, data) => (
								<>
									<Button
										type="primary"
										className="btn-actions"
										icon={<UserSwitchOutlined />}
										onClick={() => onEdit(data)}
									/>
									{/* <Button
										type="primary"
										className="btn-actions"
										icon={<EditOutlined />}
										onClick={() => onEdit(data)}
									/> */}
									{data?.active ? (
										<Button
											className="ml-2 btn-actions btn-hide"
											icon={<EyeInvisibleOutlined />}
											onClick={() =>
												onClickHideUser(_id, false)
											}
											danger
										/>
									) : (
										<Button
											danger
											className="ml-2 btn-actions btn-hide"
											icon={<EyeOutlined />}
											onClick={() =>
												onClickHideUser(_id, true)
											}
										/>
									)}

									<Button
										type="primary"
										className="ml-2 btn-actions btn-delete"
										icon={<DeleteOutlined />}
										onClick={() => onClickDeleteUser(_id)}
										danger
									/>
								</>
							),
						},
					]}
					data={users?.data}
					total={users?.total}
					currentPage={currentPage}
					loading={!users?.data}
					scroll={{ x: 1300 }}
				/>
			</div>
			{/* <UserModal
				visible={isModalShow}
				onHidden={onHideModal}
				onCreate={onCreateUser}
				onUpdate={onUpdateUser}
				onHide={onClickHideUser}
				onDelete={onClickDeleteUser}
				defaultValue={userDetail}
				mode={userDetail ? 'update' : 'create'}
				setLoading={setLoadingOverLay}
				onRefetch={onRefetch}
			/> */}
			<RoleModal
				visible={isModalShow}
				onHidden={onHideModal}
				onUpdate={onUpdateUser}
				onDelete={onClickDeleteUser}
				defaultValue={userDetail}
				setLoading={setLoadingOverLay}
				onRefetch={onRefetch}
			/>
		</section>
	);
};

UserListContainer.propTypes = {
	users: PropTypes.object,
	onGetListUser: PropTypes.func,
	onCreateUser: PropTypes.func,
	onUpdateUser: PropTypes.func,
	onUpdateActiveUser: PropTypes.func,
	onDeleteUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	users: selectUsersData,
});

export const UserList = connect(mapStateToProps, {
	onGetListUser,
	onCreateUser,
	onUpdateUser,
	onUpdateActiveUser,
	onDeleteUser,
})(UserListContainer);
