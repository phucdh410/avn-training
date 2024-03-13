import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { useQuery } from 'src/hooks/query.hook';
import { CTable, CSelectAdmin } from 'src/commons';
import { CATEGORY_COLUMNS } from 'src/configs/table.config';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';
import { FilterBar, CategoryModal } from './components';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { LoadingContext } from 'src/contexts/loading.context';
import {
	onGetListCategoriesByTopic,
	onCreateCategory,
	onUpdateCategory,
	onDeleteCategory,
	onUpdateActiveCategory,
} from 'src/redux/category/category.action';
import {
	alertSuccess,
	alertWarningDelete,
	alertWarningHide,
	alertFail,
} from 'src/utils/alert.util';
import {
	DeleteOutlined,
	EditOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
} from '@ant-design/icons';
import { selectCategoriesData } from 'src/redux/category/category.selector';
import { selectTopicsData } from 'src/redux/topic/topic.selector';
import './CategoryList.scss';
import { onGetAllTopic } from 'src/redux/topic/topic.action';
import { handleSearchBasic } from 'src/utils/function.util';

const CategoryListContainer = ({
	topics,
	categories,
	onGetListCategoriesByTopic,
	onCreateCategory,
	onUpdateCategory,
	onDeleteCategory,
	onUpdateActiveCategory,
	onGetAllTopic,
}) => {
	const [isModalShow, setIsModalShow] = useState(false);
	const [sortObj, setSortObj] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [categoryDetial, setCategoryDetail] = useState();
	const [currentUrl, setCurrentUrl] = useState();
	const [, setLoadingOverLay] = useContext(LoadingContext);
	const [topicSelected, setTopicSelected] = useState();
	const query = useQuery();
	const history = useHistory();

	useEffect(() => {
		if (query.page) {
			setCurrentPage(parseInt(query.page));
		}
	}, [query.page]);

	useEffect(() => {
		onGetAllTopic();
		onGetListCategoriesByTopic();
	}, [onGetAllTopic, onGetListCategoriesByTopic]);

	useEffect(() => {
		const newUrl = location.pathname + location.search;

		if (currentUrl !== newUrl) {
			setCurrentUrl(newUrl);

			if (topicSelected === 'all') {
				onGetListCategoriesByTopic(null, query);
			} else {
				onGetListCategoriesByTopic(topicSelected, query);
			}
		}
	}, [
		currentUrl,
		onGetListCategoriesByTopic,
		query,
		topicSelected,
		topics.length,
	]);

	const onChangeSort = newSortObj => {
		const currentSortObj = { ...sortObj, ...query, ...newSortObj };
		const currentQueryStr = '?' + stringify(currentSortObj);
		const newUrl = location.pathname + currentQueryStr;

		history.push(newUrl);
		setSortObj(currentSortObj);
	};

	const onShowModal = () => {
		setCategoryDetail(undefined);
		setIsModalShow(true);
	};

	const onHideModal = () => setIsModalShow(false);

	const onEdit = data => {
		onShowModal(true);
		setCategoryDetail(data);
	};

	const onClickHide = (id, status) => {
		if (status === true) {
			onUpdateActiveCategory(id, status, () => {
				setLoadingOverLay(false);
				if (topicSelected === 'all') {
					onGetListCategoriesByTopic(null, query);
				} else {
					onGetListCategoriesByTopic(topicSelected, query);
				}
				alertSuccess(MESSAGE_FEEDBACK.COMMON.SHOW_SUCCESS);
			});
		} else {
			alertWarningHide(() => {
				setLoadingOverLay(true);

				onUpdateActiveCategory(id, status, () => {
					setLoadingOverLay(false);
					if (topicSelected === 'all') {
						onGetListCategoriesByTopic(null, query);
					} else {
						onGetListCategoriesByTopic(topicSelected, query);
					}
					alertSuccess(MESSAGE_FEEDBACK.COMMON.HIDE_SUCCESS);
				});
			});
		}
	};

	const onClickDelete = id => {
		alertWarningDelete(() => {
			setLoadingOverLay(true);

			onDeleteCategory(id, (status, err) => {
				setLoadingOverLay(false);

				if (status) {
					alertSuccess(MESSAGE_FEEDBACK.COMMON.DELETE_SUCCESS);
				} else {
					alertFail(err);
				}
			});
		});
	};

	const onChangeTopic = value => {
		setTopicSelected(value);

		if (value === 'all') {
			onGetListCategoriesByTopic(null, query);
		} else {
			if (query.page !== '1') {
				const currentPath = history.location.pathname;
				const queryPage = { ...query, page: 1 };
				const newQueryStr = '?' + stringify(queryPage);

				history.push(currentPath + newQueryStr);
			} else {
				onGetListCategoriesByTopic(value, query);
			}
		}
	};

	const onChangeTopicSelected = () => {
		if (query.page !== '1') {
			const currentPath = history.location.pathname;
			const queryPage = { ...query, page: 1 };
			const newQueryStr = '?' + stringify(queryPage);

			history.push(currentPath + newQueryStr);
		}
	};

	const getOptions = () => {
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
			topics.data?.length > 0
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

	const onRefetch = () => {
		if (topicSelected === 'all') {
			onGetListCategoriesByTopic(null, query);
		} else {
			onGetListCategoriesByTopic(topicSelected, query);
		}
	};

	return (
		<section className="category-list">
			<div className="white-block-content">
				<h1 className="header-title">Danh sách loại chủ đề</h1>
				<div className="user-filter">
					<FilterBar
						tabActive={query && query.active}
						sortByActive={query && query.sortBy}
						sortTypeActive={query && query.sortType}
						onChangeSort={onChangeSort}
					/>
				</div>
				<div className="user-add-action justify-between flex">
					<CSelectAdmin
						options={getOptions()}
						value={topicSelected}
						placeholder="Something"
						label="Chọn chủ đề"
						showSearch
						onChange={onChangeTopic}
						filterOption={handleSearchBasic}
						defaultValue="all"
						className="select-filter"
					/>
					<Button
						type="primary"
						className=" mb-5"
						onClick={onShowModal}
					>
						Thêm loại chủ đề mới
					</Button>
				</div>
				<CTable
					columns={[
						...CATEGORY_COLUMNS,
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
										className="ml-2 btn-actions btn-edit"
										icon={<EditOutlined />}
										onClick={() => onEdit(data)}
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
					data={categories?.data}
					total={categories?.total}
					currentPage={currentPage}
					loading={!categories?.data}
					scroll={{ x: 1300 }}
				/>
			</div>
			<CategoryModal
				visible={isModalShow}
				onHidden={onHideModal}
				onCreate={onCreateCategory}
				onUpdate={onUpdateCategory}
				onHide={onClickHide}
				onDelete={onClickDelete}
				defaultValue={categoryDetial}
				mode={categoryDetial ? 'update' : 'create'}
				setLoading={setLoadingOverLay}
				topicSelected={topicSelected}
				topics={topics}
				onChangeTopicSelected={onChangeTopicSelected}
				onRefetch={onRefetch}
			/>
		</section>
	);
};

CategoryListContainer.propTypes = {
	topics: PropTypes.object,
	categories: PropTypes.object,
	onGetListCategoriesByTopic: PropTypes.func,
	onCreateCategory: PropTypes.func,
	onUpdateCategory: PropTypes.func,
	onDeleteCategory: PropTypes.func,
	onUpdateActiveCategory: PropTypes.func,
	onGetAllTopic: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	categories: selectCategoriesData,
	topics: selectTopicsData,
});

export const CategoryList = connect(mapStateToProps, {
	onGetAllTopic,
	onGetListCategoriesByTopic,
	onCreateCategory,
	onUpdateCategory,
	onDeleteCategory,
	onUpdateActiveCategory,
})(CategoryListContainer);
