import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import './CEditor.scss';

export const CEditor = ({ label, placeholder, name, rules, disabled }) => {
	//const [text, setText] = useState('');

	//const handleChangeText = value => setText(value);

	return (
		<div className="editor-common">
			<label className="label-input" htmlFor="Something">
				{label || 'Label'}
			</label>
			<Form.Item name={name} initialValue="" rules={rules}>
				<ReactQuill
					// onChange={handleChangeText}
					// value={text}
					placeholder={placeholder}
					readOnly={disabled}
					modules={{
						toolbar: [
							[{ header: '1' }, { header: '2' }, { font: [] }],
							[{ size: [] }],
							[
								'bold',
								'italic',
								'underline',
								'strike',
								'blockquote',
							],
							[
								{ list: 'ordered' },
								{ list: 'bullet' },
								{ indent: '-1' },
								{ indent: '+1' },
							],
							['link', 'image'],
							['clean'],
						],
						clipboard: {
							// toggle to add extra line breaks when pasting HTML:
							matchVisual: false,
						},
					}}
				/>
			</Form.Item>
		</div>
	);
};

CEditor.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string,
	rules: PropTypes.array,
	disabled: PropTypes.bool,
};
