import React from 'react';
import PropTypes from 'prop-types';
import './CNumberInput.scss';
import { Form, InputNumber } from 'antd';
import { formatNumber, removeDot } from 'src/utils/function.util';

export const CNumberInput = ({
	label,
	id,
	className,
	placeholder,
	name,
	rules,
	min,
	max,
	onChange,
	disabled,
	hasFeedback,
}) => {
	return (
		<div className={`input-number-common ${className || ''}`}>
			{label ? (
				<label className="label-input" htmlFor={id}>
					{label}
				</label>
			) : (
				''
			)}
			<Form.Item name={name} rules={rules} hasFeedback={hasFeedback}>
				<InputNumber
					id={id || ''}
					placeholder={placeholder}
					min={min}
					max={max}
					onChange={onChange}
					formatter={value => formatNumber(value)}
					parser={value => removeDot(value)}
					disabled={disabled}
				/>
			</Form.Item>
		</div>
	);
};

CNumberInput.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	rules: PropTypes.array,
	required: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	hasFeedback: PropTypes.bool,
};

CNumberInput.defaultProps = {
	hasFeedback: true,
};
