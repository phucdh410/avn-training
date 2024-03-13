import React, { useEffect, useState } from 'react';
import { Upload, Form, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { UploadOutlined } from '@ant-design/icons';
import { REQUEST_HEADER } from 'src/configs/header.config';
import { getBase64 } from 'src/utils/function.util';

export const CUploadImage = ({
	label,
	id,
	className,
	placeholder,
	name,
	rules,
	hasFeedback,
	normalize,
	onChange,
	defaultFiles,
	triggerClear,
	uploadUrl,
	data,
	onRemove,
	hasChangedTab,
}) => {
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		setFileList([]);
	}, [triggerClear]);

	useEffect(() => {
		if (defaultFiles?.length) {
			if (!hasChangedTab) {
				setFileList(defaultFiles);
			}
		} else {
			setFileList([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultFiles]);

	const handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setPreviewVisible(true);
		setPreviewImage(file.url || file.preview);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		);
	};

	const handleCloseModal = () => setPreviewVisible(false);

	const beforeUpload = file => {
		switch (file.type) {
			case 'image/png':
				return true;
			case 'image/jpg':
				return true;
			case 'image/jpeg':
				return true;
		}

		return false;
	};

	const onChangeUpload = values => {
		let { file, fileList } = values;

		if (file) {
			let isValid = false;

			switch (file.type) {
				case 'image/png':
					isValid = true;
					break;
				case 'image/jpg':
					isValid = true;
					break;
				case 'image/jpeg':
					isValid = true;
					break;
			}

			if (isValid) {
				setFileList(fileList);
			} else {
				fileList = fileList.filter(item => item.uid !== file.uid);

				setFileList(fileList);
			}

			setFileList(fileList);

			onChange && onChange({ file, fileList });
		}
	};

	return (
		<div className={`upload-common ${className || ''}`}>
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
				<Upload
					id={id || ''}
					placeholder={placeholder}
					action={uploadUrl}
					listType="picture"
					maxCount={1}
					headers={{
						...REQUEST_HEADER,
						Authorization: `Bearer ${localStorage.getItem(
							'token',
						)}`,
					}}
					name="file"
					onPreview={handlePreview}
					onChange={onChangeUpload}
					accept=".png, .jpg, .jpeg"
					beforeUpload={beforeUpload}
					fileList={fileList}
					data={data}
					onRemove={onRemove}
				>
					<Button icon={<UploadOutlined />}>
						Tải ảnh (Tối đa: 1)
					</Button>
				</Upload>
			</Form.Item>
			<Modal
				open={previewVisible}
				title={previewTitle}
				footer={null}
				onCancel={handleCloseModal}
			>
				<img
					alt="example"
					style={{ width: '100%' }}
					src={previewImage}
				/>
			</Modal>
		</div>
	);
};

CUploadImage.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string,
	rules: PropTypes.array,
	required: PropTypes.bool,
	hasFeedback: PropTypes.bool,
	transform: PropTypes.func,
	normalize: PropTypes.func,
	onChange: PropTypes.func,
	defaultFiles: PropTypes.array,
	triggerClear: PropTypes.bool,
	uploadUrl: PropTypes.string,
	data: PropTypes.any,
	onRemove: PropTypes.func,
	hasChangedTab: PropTypes.bool,
};

CUploadImage.defaultProps = {
	hasFeedback: false,
	hasChangedTab: false,
};
