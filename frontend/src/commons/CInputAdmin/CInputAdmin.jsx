import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './CInputAdmin.scss';

export const CInputAdmin = ({
	label,
	id,
	className,
	placeholder,
	type,
	name,
	rules,
	minLength,
	maxLength,
	disabled,
	hasFeedback,
	normalize,
	onChange,
	showCount,
	showIconSearch,
	cols,
	rows,
}) => {
	return (
		<div className={`input-admin-common ${className || ''}`}>
			{label ? (
				<label className="label-input" htmlFor={id}>
					{label}
				</label>
			) : (
				''
			)}
			<Form.Item
				name={name}
				rules={rules}
				hasFeedback={hasFeedback}
				normalize={normalize}
			>
				{type == 'textarea' ? (
					<Input.TextArea
						id={id || ''}
						type={type || 'text'}
						placeholder={placeholder}
						minLength={0 || minLength}
						maxLength={maxLength}
						disabled={disabled}
						onChange={onChange}
						showCount={showCount}
						cols={cols}
						rows={rows}
					/>
				) : (
					<Input
						id={id || ''}
						type={type || 'text'}
						placeholder={placeholder}
						minLength={0 || minLength}
						maxLength={maxLength}
						disabled={disabled}
						onChange={onChange}
						showCount={showCount}
						suffix={showIconSearch ? <SearchOutlined /> : ''}
					/>
				)}
			</Form.Item>
		</div>
	);
};

CInputAdmin.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	rules: PropTypes.array,
	required: PropTypes.bool,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	disabled: PropTypes.bool,
	hasFeedback: PropTypes.bool,
	transform: PropTypes.func,
	normalize: PropTypes.func,
	onChange: PropTypes.func,
	showCount: PropTypes.bool,
	showIconSearch: PropTypes.bool,
	cols: PropTypes.number,
	rows: PropTypes.number,
};

CInputAdmin.defaultProps = {
	hasFeedback: true,
};
