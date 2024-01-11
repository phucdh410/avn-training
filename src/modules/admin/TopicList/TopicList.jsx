import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './TopicList.scss';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { useQuery } from 'src/hooks/query.hook';
import { CTable } from 'src/commons';
import { selectTopicsData } from 'src/redux/topic/topic.selector';
import { TOPIC_COLUMNS } from 'src/configs/table.config';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';
import { FilterBar, TopicModal } from './components';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { LoadingContext } from 'src/contexts/loading.context';
import {
	onGetListTopicPaging,
	onCreateTopic,
	onUpdateTopic,
	onUpdateActiveTopic,
	onUpdatePinTopic,
	onDeleteTopic,
} from 'src/redux/topic/topic.action';
import {
	alertFail,
	alertSuccess,
	alertWarningDelete,
	alertWarningHide,
} from 'src/utils/alert.util';
import {
	DeleteOutlined,
	EditOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
	PushpinOutlined,
} from '@ant-design/icons';

const TopicListContainer = ({
	topics,
	onGetListTopicPaging,
	onCreateTopic,
	onUpdateTopic,
	onUpdateActiveTopic,
	onUpdatePinTopic,
	onDeleteTopic,
}) => {
	const [isModalShow, setIsModalShow] = useState(false);
	const [sortObj, setSortObj] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [topicDetail, setTopicDetail] = useState();
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
			onGetListTopicPaging(query);
			setCurrentUrl(newUrl);
		}
	}, [currentUrl, onGetListTopicPaging, query]);

	const onChangeSort = newSortObj => {
		const currentSortObj = { ...sortObj, ...query, ...newSortObj };
		const currentQueryStr = '?' + stringify(currentSortObj);
		const newUrl = location.pathname + currentQueryStr;

		history.push(newUrl);
		setSortObj(currentSortObj);
	};

	const onShowModal = () => {
		setTopicDetail(undefined);
		setIsModalShow(true);
	};

	const onHideModal = () => {
		if (topicDetail) {
			setTopicDetail(undefined);
		}

		setIsModalShow(false);
	};

	const onEdit = data => {
		onShowModal(true);
		setTopicDetail(data);
	};

	const onClickHideTopic = (id, status) => {
		if (status === true) {
			onUpdateActiveTopic(id, status, () => {
				setLoadingOverLay(false);

				onGetListTopicPaging(query);
				alertSuccess(MESSAGE_FEEDBACK.COMMON.SHOW_SUCCESS);
			});
		} else {
			alertWarningHide(() => {
				setLoadingOverLay(true);

				onUpdateActiveTopic(id, status, () => {
					setLoadingOverLay(false);
					onGetListTopicPaging(query);
					alertSuccess(MESSAGE_FEEDBACK.COMMON.HIDE_SUCCESS);
				});
			});
		}
	};

	const onClickPinTopic = (id, status) => {
		onUpdatePinTopic(id, status, () => {
			let message = '';

			if (status) {
				message = MESSAGE_FEEDBACK.COMMON.PIN_SUCCESS;
			} else {
				message = MESSAGE_FEEDBACK.COMMON.UNPIN_SUCCESS;
			}

			setLoadingOverLay(false);
			onGetListTopicPaging(query);
			alertSuccess(message);
		});
	};

	const onClickDeleteTopic = id => {
		alertWarningDelete(() => {
			setLoadingOverLay(true);

			onDeleteTopic(id, (status, err) => {
				setLoadingOverLay(false);

				if (status) {
					onGetListTopicPaging(query);
					alertSuccess(MESSAGE_FEEDBACK.COMMON.DELETE_SUCCESS);
				} else {
					alertFail(err);
				}
			});
		});
	};

	const onRefetch = () => {
		onGetListTopicPaging(query);
	};

	return (
		<section className="user-list">
			<div className="white-block-content">
				<h1 className="header-title">Danh sách chủ đề</h1>
				<div className="user-filter">
					<FilterBar
						tabActive={query && query.active}
						pinActive={query && query.isPin}
						sortByActive={query && query.sortBy}
						sortTypeActive={query && query.sortType}
						onChangeSort={onChangeSort}
					/>
				</div>
				<div className="user-add-action">
					<Button
						type="primary"
						className="float-right mb-5"
						onClick={onShowModal}
					>
						Thêm chủ đề mới
					</Button>
				</div>
				<CTable
					columns={[
						...TOPIC_COLUMNS,
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
										className="btn-actions btn-pin"
										icon={<PushpinOutlined />}
										onClick={() =>
											onClickPinTopic(_id, !data.isPin)
										}
										danger={data.isPin}
									/>
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
												onClickHideTopic(_id, false)
											}
											danger
										/>
									) : (
										<Button
											danger
											className="ml-2 btn-actions btn-hide"
											icon={<EyeOutlined />}
											onClick={() =>
												onClickHideTopic(_id, true)
											}
										/>
									)}

									<Button
										type="primary"
										className="ml-2 btn-actions btn-delete"
										icon={<DeleteOutlined />}
										onClick={() => onClickDeleteTopic(_id)}
										danger
									/>
								</>
							),
						},
					]}
					data={Array.isArray(topics?.data) ? topics.data : []}
					total={topics?.total || 0}
					currentPage={currentPage}
					loading={!topics?.data}
					scroll={{ x: 1300 }}
				/>
			</div>
			<TopicModal
				visible={isModalShow}
				onHidden={onHideModal}
				onCreate={onCreateTopic}
				onUpdate={onUpdateTopic}
				onHide={onClickHideTopic}
				onDelete={onClickHideTopic}
				defaultValue={topicDetail}
				mode={topicDetail ? 'update' : 'create'}
				setLoading={setLoadingOverLay}
				onRefetch={onRefetch}
			/>
		</section>
	);
};

TopicListContainer.propTypes = {
	topics: PropTypes.object,
	onGetListTopicPaging: PropTypes.func,
	onCreateTopic: PropTypes.func,
	onUpdateTopic: PropTypes.func,
	onUpdateActiveTopic: PropTypes.func,
	onUpdatePinTopic: PropTypes.func,
	onDeleteTopic: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	topics: selectTopicsData,
});

export const TopicList = connect(mapStateToProps, {
	onGetListTopicPaging,
	onCreateTopic,
	onUpdateTopic,
	onUpdateActiveTopic,
	onUpdatePinTopic,
	onDeleteTopic,
})(TopicListContainer);
