import React, { useState, useEffect, useContext } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Upload, Form, Button } from 'antd';
import { REQUEST_HEADER } from 'src/configs/header.config';
import axios from 'axios';
import './CUpload.scss';
import { LoadingContext } from 'src/contexts/loading.context';

const { Dragger } = Upload;

export const CUpload = ({
	label,
	placeholder,
	note,
	name,
	maxCount,
	rules,
	multiple,
	fileExts,
	btnContent,
	actionUrl,
	//maxSize,
	onUploaded,
	autoUpload,
	data,
	triggerClear,
	defaultFiles,
}) => {
	const [, setLoadingOverlay] = useContext(LoadingContext);
	//const [uploading, setUploading] = useState(false);
	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		if (defaultFiles?.length) {
			setFileList(defaultFiles);
		} else {
			setFileList([]);
		}
	}, [defaultFiles]);

	useEffect(() => {
		setFileList([]);
	}, [triggerClear]);

	// useEffect(() => {
	// 	if (uploading) {
	// 		//setUploading(false);
	// 		setFileList([]);

	// 		const status = !fileList[0]?.response?.errors?.length
	// 			? true
	// 			: false;

	// 		onUploaded && onUploaded(status, fileList[0]?.response);
	// 	}
	// }, [fileList, onUploaded, uploading]);

	const onUpload = () => {
		const formData = new FormData();
		const token = localStorage.getItem('token');

		setLoadingOverlay(true);

		fileList.forEach(file => {
			formData.append('file', file?.originFileObj);
		});

		if (data) {
			const dataKeys = Object.keys(data);

			dataKeys.forEach(key => {
				formData.append(key, data[key]);
			});
		}

		axios
			.post(`${actionUrl}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setLoadingOverlay(false);
				setFileList([]);
				onUploaded && onUploaded(true);
			})
			.catch(err => {
				setLoadingOverlay(false);
				onUploaded && onUploaded(false, err.response?.data);
			});
	};

	const onChangeFile = file => setFileList(file?.fileList);

	const beforeUpload = file => {
		if (autoUpload) {
			return true;
		} else {
			setFileList([...fileList, file]);

			return false;
		}
	};

	return (
		<div className="upload-common">
			<label className="label-input" htmlFor="Something">
				{label || 'Upload file'}
			</label>
			<div className="uploader">
				<Form.Item name={name} rules={rules}>
					<Dragger
						action={actionUrl}
						name={name}
						multiple={multiple}
						headers={{
							...REQUEST_HEADER,
							Authorization: `Bearer ${localStorage.getItem(
								'token',
							)}`,
						}}
						showUploadList={false}
						maxCount={maxCount || 1}
						accept={fileExts}
						beforeUpload={beforeUpload}
						fileList={fileList}
						onChange={onChangeFile}
						data={data}
					>
						<CloudUploadOutlined className="icon-upload" />
						<h5>
							{placeholder ||
								'Chọn hoặc thả file vào đây để tải file lên'}
						</h5>
						<p className="description">{note}</p>
					</Dragger>
				</Form.Item>
			</div>
			{fileList.length ? (
				<div className="preview mt-5">
					<p>File đã chọn: </p>
					{fileList.map((file, index) => (
						<span key={index}>{file?.name}</span>
					))}
				</div>
			) : (
				''
			)}

			{!autoUpload ? (
				<div className="btn-wrapper w-full text-right mt-5">
					<Button className="" type="primary" onClick={onUpload}>
						{btnContent || 'Tải lên'}
					</Button>
				</div>
			) : (
				''
			)}
		</div>
	);
};

CUpload.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	note: PropTypes.any,
	name: PropTypes.string,
	maxCount: PropTypes.number,
	rules: PropTypes.array,
	multiple: PropTypes.bool,
	fileExts: PropTypes.string,
	btnContent: PropTypes.string,
	actionUrl: PropTypes.string,
	maxSize: PropTypes.number,
	onUploaded: PropTypes.func,
	autoUpload: PropTypes.bool,
	data: PropTypes.any,
	triggerClear: PropTypes.bool,
	defaultFiles: PropTypes.any,
};

CUpload.defaultProps = {
	multiple: false,
	autoUpload: false,
};
