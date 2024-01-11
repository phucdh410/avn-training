import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { useQuery } from 'src/hooks/query.hook';
import { CTable, CSelectAdmin } from 'src/commons';
import { POST_COLUMNS } from 'src/configs/table.config';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';
import { FilterBar } from './components';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { LoadingContext } from 'src/contexts/loading.context';
import {
	onGetListPostPaging,
	onUpdateActivePost,
	onDeletePost,
} from 'src/redux/post/post.action';
import { onGetAllTopic } from 'src/redux/topic/topic.action';
import { onGetListCategoriesByTopic } from 'src/redux/category/category.action';
import {
	alertSuccess,
	alertWarningDelete,
	alertWarningHide,
} from 'src/utils/alert.util';
import {
	DeleteOutlined,
	EditOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
	BarChartOutlined,
} from '@ant-design/icons';
import { selectCategoriesData } from 'src/redux/category/category.selector';
import { selectTopicsData } from 'src/redux/topic/topic.selector';
import { handleSearchBasic } from 'src/utils/function.util';
import './PostList.scss';
import { selectPostsData } from 'src/redux/post/post.selector';
import { ROUTE_ADMIN } from 'src/configs/route.config';

const PostListContainer = ({
	topics,
	categories,
	posts,
	onGetListCategoriesByTopic,
	onGetListPostPaging,
	onDeletePost,
	onUpdateActivePost,
	onGetAllTopic,
}) => {
	const [sortObj, setSortObj] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [currentUrl, setCurrentUrl] = useState();
	const [, setLoadingOverLay] = useContext(LoadingContext);
	const [topicSelected, setTopicSelected] = useState();
	const [categorySeletected, setCategorySeleceted] = useState();
	const query = useQuery();
	const history = useHistory();

	useEffect(() => {
		if (query.page) {
			setCurrentPage(parseInt(query.page));
		}
	}, [query.page]);

	useEffect(() => {
		onGetAllTopic();
		onGetListPostPaging();
	}, [onGetAllTopic, onGetListPostPaging, onGetListCategoriesByTopic]);

	useEffect(() => {
		const newUrl = location.pathname + location.search;

		if (currentUrl !== newUrl) {
			setCurrentUrl(newUrl);

			if (categorySeletected === 'all') {
				onGetListPostPaging({ ...query });
			} else {
				onGetListPostPaging({
					...query,
					categoryId: categorySeletected,
				});
			}
		}
	}, [
		categorySeletected,
		currentUrl,
		onGetListPostPaging,
		query,
		topicSelected,
	]);

	const onChangeSort = newSortObj => {
		const currentSortObj = { ...sortObj, ...query, ...newSortObj };
		const currentQueryStr = '?' + stringify(currentSortObj);
		const newUrl = location.pathname + currentQueryStr;

		history.push(newUrl);
		setSortObj(currentSortObj);
	};

	const onClickHide = (id, status) => {
		if (status === true) {
			onUpdateActivePost(id, status, () => {
				setLoadingOverLay(false);
				if (categorySeletected === 'all') {
					onGetListPostPaging({ ...query });
				} else {
					onGetListPostPaging({
						...query,
						categoryId: categorySeletected,
					});
				}
				alertSuccess(MESSAGE_FEEDBACK.COMMON.SHOW_SUCCESS);
			});
		} else {
			alertWarningHide(() => {
				setLoadingOverLay(true);

				onUpdateActivePost(id, status, () => {
					setLoadingOverLay(false);
					if (categorySeletected === 'all') {
						onGetListPostPaging({ ...query });
					} else {
						onGetListPostPaging({
							...query,
							categoryId: categorySeletected,
						});
					}
					alertSuccess(MESSAGE_FEEDBACK.COMMON.HIDE_SUCCESS);
				});
			});
		}
	};

	const onClickDelete = id => {
		alertWarningDelete(() => {
			setLoadingOverLay(true);

			onDeletePost(id, () => {
				setLoadingOverLay(false);
				if (categorySeletected === 'all') {
					onGetListPostPaging({ ...query });
				} else {
					onGetListPostPaging({
						...query,
						categoryId: categorySeletected,
					});
				}
				alertSuccess(MESSAGE_FEEDBACK.COMMON.DELETE_SUCCESS);
			});
		});
	};

	const onChangeTopicSelected = value => {
		setTopicSelected(value);
		setCategorySeleceted(null);

		if (value !== 'all') {
			onGetListCategoriesByTopic(value, query);
		} else {
			onGetListCategoriesByTopic();
		}
	};

	const onChangeCategorySelected = value => {
		setCategorySeleceted(value);

		if (value === 'all') {
			onGetListPostPaging({ ...query });
		} else {
			onGetListPostPaging({
				categoryId: value,
			});
		}
	};

	const onEdit = id =>
		history.push(`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.EDIT}/${id}`);

	const onViewListUserView = id =>
		history.push(
			`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.USER_VIEWED}/${id}`,
		);

	const getTopicOptions = () => {
		const listOptions = [
			{
				content: 'Tất cả',
				value: 'all',
			},
		];

		let topicOptions = [];

		if (
			topics?.data &&
			Array.isArray(topics?.data) &&
			topics.data.length > 0
		) {
			topicOptions = topics?.data?.map(item => {
				return {
					content: item?.name,
					value: item?._id,
				};
			});
		}

		return [...listOptions, ...topicOptions];
	};

	const getCategoryOptions = () => {
		const listOptions = [
			{
				content: 'Tất cả',
				value: 'all',
			},
		];

		let categoryOptions = [];

		if (
			categories?.data &&
			Array.isArray(categories?.data) &&
			categories.data.length > 0
		) {
			categoryOptions = categories?.data?.map(item => {
				return {
					content: item?.name,
					value: item?._id,
				};
			});
		}

		return [...listOptions, ...categoryOptions];
	};

	return (
		<section className="post-list">
			<div className="white-block-content">
				<h1 className="header-title">Danh sách bài viết</h1>
				<div className="user-filter">
					<FilterBar
						tabActive={query && query.active}
						sortByActive={query && query.sortBy}
						sortTypeActive={query && query.sortType}
						onChangeSort={onChangeSort}
					/>
				</div>
				<div className="user-add-action flex space-x-5">
					<CSelectAdmin
						options={getTopicOptions()}
						value={topicSelected}
						placeholder="Chọn chủ đề"
						label="Chọn chủ đề"
						showSearch
						onChange={onChangeTopicSelected}
						filterOption={handleSearchBasic}
						defaultValue="all"
						className="select-filter"
					/>
					<CSelectAdmin
						options={getCategoryOptions()}
						value={categorySeletected}
						placeholder="Chọn loại chủ đề"
						label="Chọn loại chủ đề"
						showSearch
						onChange={onChangeCategorySelected}
						filterOption={handleSearchBasic}
						className="select-filter"
						disabled={topicSelected === 'all'}
					/>
				</div>
				<CTable
					columns={[
						...POST_COLUMNS,
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
										icon={<BarChartOutlined />}
										className="ml-2 btn-actions btn-pin"
										type="primary"
										onClick={() => onViewListUserView(_id)}
									/>

									<Button
										type="primary"
										className="ml-2 btn-actions btn-edit"
										icon={<EditOutlined />}
										onClick={() => onEdit(_id)}
									/>
									{data?.active ? (
										<Button
											className="ml-2 btn-actions btn-hide"
											icon={<EyeInvisibleOutlined />}
											onClick={() =>
												onClickHide(_id, false)
											}
											danger
										/>
									) : (
										<Button
											danger
											className="ml-2 btn-actions btn-hide"
											icon={<EyeOutlined />}
											onClick={() =>
												onClickHide(_id, true)
											}
										/>
									)}

									<Button
										type="primary"
										className="ml-2 btn-actions btn-delete"
										icon={<DeleteOutlined />}
										onClick={() => onClickDelete(_id)}
										danger
									/>
								</>
							),
						},
					]}
					data={posts?.data}
					total={posts?.total}
					currentPage={currentPage}
					loading={!posts?.data}
					scroll={{ x: 1300 }}
				/>
			</div>
		</section>
	);
};

PostListContainer.propTypes = {
	topics: PropTypes.object,
	categories: PropTypes.object,
	posts: PropTypes.object,
	onGetListCategoriesByTopic: PropTypes.func,
	onGetListPostPaging: PropTypes.func,
	onDeletePost: PropTypes.func,
	onUpdateActivePost: PropTypes.func,
	onGetAllTopic: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	categories: selectCategoriesData,
	topics: selectTopicsData,
	posts: selectPostsData,
});

export const PostList = connect(mapStateToProps, {
	onGetAllTopic,
	onGetListCategoriesByTopic,
	onGetListPostPaging,
	onDeletePost,
	onUpdateActivePost,
})(PostListContainer);
