import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'src/hooks/query.hook';
import { stringify } from 'query-string';
import './CTable.scss';

export const CTable = ({
	columns,
	data,
	total = 0,
	pageSize = 10,
	currentPage = 1,
	loading,
	selectConfig,
	rowKey = '_id',
	bordered,
	scroll,
}) => {
	const history = useHistory();
	const query = useQuery();

	const onChangePageCommon = page => {
		const currentPath = history.location.pathname;
		const queryPage = { ...query, page };
		const newQueryStr = '?' + stringify(queryPage);

		history.push(currentPath + newQueryStr);
	};

	return (
		<Table
			className="table-common"
			dataSource={data}
			columns={columns}
			bordered={bordered}
			pagination={{
				total,
				pageSize,
				onChange: onChangePageCommon,
				current: currentPage,
				showSizeChanger: false,
			}}
			loading={loading}
			tableLayout="auto"
			rowSelection={
				selectConfig
					? {
							...selectConfig,
					  }
					: false
			}
			rowKey={rowKey}
			scroll={scroll}
		/>
	);
};

CTable.defaultProps = {
	total: 0,
	pageSize: 10,
	currentPage: 1,
	rowKey: '_id',
	bordered: true,
};

CTable.propTypes = {
	columns: PropTypes.array,
	data: PropTypes.array,
	total: PropTypes.number,
	pageSize: PropTypes.number,
	onChangePage: PropTypes.func,
	currentPage: PropTypes.number,
	loading: PropTypes.bool,
	checkList: PropTypes.array,
	selectConfig: PropTypes.object,
	rowKey: PropTypes.string,
	bordered: PropTypes.bool,
	scroll: PropTypes.object,
};
