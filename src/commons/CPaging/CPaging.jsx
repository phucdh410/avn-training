import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
//import { PrevIcon, NextIcon } from './components';
import './CPaging.scss';
import { useTranslation } from 'react-i18next';

export const CPaging = ({ total, current, limit, className, onChangePage }) => {
	const { t } = useTranslation();

	const onClickHead = value => onChangePage(value);

	const getEndHead = () =>
		total % limit === 0 ? total / limit : parseInt(total / limit) + 1;

	return (
		<div className="paging-common-wrap flex justify-end">
			<div
				className="first-page"
				onClick={() => (total > 0 ? onClickHead(1) : '')}
				role="button"
				tabIndex={-1}
				onKeyDown={() => (total > 0 ? onClickHead(1) : '')}
			>
				<p>{t('first_page')}</p>
			</div>

			<Pagination
				className={`paging-common ${className}`}
				total={total}
				current={current}
				pageSize={limit}
				showSizeChanger={false}
				onChange={onChangePage}

				// prevIcon={<PrevIcon />}
				// nextIcon={<NextIcon />}
			/>
			<div
				className="last-page"
				onClick={() => (total > 0 ? onClickHead(getEndHead()) : '')}
				role="button"
				tabIndex={-1}
				onKeyDown={() => (total > 0 ? onClickHead(getEndHead()) : '')}
			>
				<p>{t('last_page')}</p>
			</div>
		</div>
	);
};

CPaging.propTypes = {
	total: PropTypes.number,
	current: PropTypes.current,
	limit: PropTypes.number,
	onChangeCurrent: PropTypes.func,
	className: PropTypes.string,
	onChangePage: PropTypes.func,
};
