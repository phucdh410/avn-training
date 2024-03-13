import React, { useState, useEffect } from 'react';
import { Select, Form } from 'antd';
import PropTypes from 'prop-types';
import './CSelectAdmin.scss';

const { Option } = Select;

export const CSelectAdmin = ({
	label,
	id,
	className,
	placeholder,
	options,
	onChange,
	defaultValue,
	showSearch,
	filterOption,
	rules,
	name,
	disabled,
	hasFeedback,
	dropdownMatchSelectWidth,
	value,
}) => {
	const [currentSelect, setCurrentSelect] = useState();

	useEffect(() => {
		if (defaultValue) {
			setCurrentSelect(defaultValue);
		} else {
			setCurrentSelect(null);
		}
	}, [defaultValue]);

	useEffect(() => {
		if (options && currentSelect) {
			const currentSelectedIndex = options.findIndex(
				item => item.value === currentSelect,
			);

			if (currentSelectedIndex === -1) {
				setCurrentSelect(undefined);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options]);

	const handleChange = value => {
		if (onChange) {
			onChange(value);
		}

		setCurrentSelect(value);
	};

	return (
		<div className={`select-admin-common ${className || ''}`}>
			{label ? (
				<label className="label-input" htmlFor={id}>
					{label}
				</label>
			) : (
				''
			)}
			<Form.Item
				rules={rules}
				name={name}
				valuePropName="value"
				initialValue={defaultValue}
				hasFeedback={hasFeedback}
			>
				<Select
					defaultValue={defaultValue}
					placeholder={placeholder}
					value={value || currentSelect}
					onChange={handleChange}
					showSearch={showSearch}
					filterOption={filterOption}
					disabled={disabled}
					dropdownMatchSelectWidth={dropdownMatchSelectWidth}
				>
					{options &&
						options.map((option, index) => (
							<Option key={index} value={option.value}>
								{option.content}
							</Option>
						))}
				</Select>
			</Form.Item>
		</div>
	);
};

CSelectAdmin.propTypes = {
	label: PropTypes.string,
	id: PropTypes.any,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.any,
	value: PropTypes.any,
	onChange: PropTypes.func,
	defaultValue: PropTypes.any,
	showSearch: PropTypes.bool,
	filterOption: PropTypes.any,
	rules: PropTypes.array,
	name: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	hasFeedback: PropTypes.bool,
	dropdownMatchSelectWidth: PropTypes.bool,
};

CSelectAdmin.defaultProps = {
	hasFeedback: true,
	dropdownMatchSelectWidth: false,
};
