import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { alertFail, alertSuccess } from 'src/utils/alert.util';

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 18,
	},
	style: {
		marginTop: '50px',
		maxWidth: 600,
	},
};

export const AzureConfig = () => {
	//#region Data
	const [form] = Form.useForm();
	//#endregion

	//#region Event
	const getAzureData = async () => {
		const token = localStorage.getItem('token');

		const res = await axios.get('/azure-configs', {
			headers: { Authorization: `Bearer ${token}` },
			baseURL: `${process.env.REACT_APP_API_URL}/api`,
		});

		if (res?.data?.data && Array.isArray(res.data.data)) {
			res.data.data.forEach(item => {
				if (item?.key === 'tenant_id') {
					form.setFieldValue('tenant_id', item?.value || '');
				}
				if (item?.key === 'client_secret') {
					form.setFieldValue('client_secret', item?.value || '');
				}
				if (item?.key === 'client_id') {
					form.setFieldValue('client_id', item?.value || '');
				}
			});
			form.setFieldsValue({ ...res.data });
		}
	};

	const onSubmit = async () => {
		const isValid = await form.validateFields();

		if (!isValid) {
			alertFail('Cập nhật không thành công!');
		}

		const values = await form.getFieldValue();

		// const token = localStorage.getItem('token');
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThiN2E1MDEzZjFhYTlhZTBmYjEyZTUiLCJ0b2tlbl9pZCI6IjE0MTVjNGJiLWVjYTMtNGZjOS1iZGJkLWU5MmU5YWM2NTU2MCIsIm5hbWUiOiJGb3IgR3VtaSB2ZW5kb3IgLSBUcmFpbmluZyBXZWJzaXRlIiwiYXZhdGFyIjoiIiwibGFuZyI6WyJ2aSIsImVuIl0sImdyb3VwIjoiYWRtaW4iLCJpYXQiOjE3MDQyNjkwNTksImV4cCI6MTcwNDM1NTQ1OX0.R8lkLsLaQVUba-ghD1JWK076PI8yOgrteGDiDFGYGPg';
		const res = await axios.put('/azure-configs', values, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			baseURL: `${process.env.REACT_APP_API_URL}/api`,
		});

		if (res.status === 200) {
			alertSuccess('Cập nhật thông tin Azure thành công!');
		} else {
			alertFail('Cập nhật không thành công!');
		}
	};
	//#endregion

	useEffect(() => {
		getAzureData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//#region Render
	return (
		<Form {...layout} form={form} name="azure-config" onFinish={onSubmit}>
			<Form.Item
				name="tenant_id"
				label="Tenant ID"
				rules={[{ required: true, message: 'Vui lòng nhập tenant id' }]}
				initialValue={''}
			>
				<Input placeholder="Nhập tenant id..." />
			</Form.Item>
			<Form.Item
				name="client_secret"
				label="Client Secret"
				rules={[
					{ required: true, message: 'Vui lòng nhập client secret' },
				]}
				initialValue={''}
			>
				<Input placeholder="Nhập client secret..." />
			</Form.Item>
			<Form.Item
				name="client_id"
				label="Client ID"
				rules={[{ required: true, message: 'Vui lòng nhập client id' }]}
				initialValue={''}
			>
				<Input placeholder="Nhập client id..." />
			</Form.Item>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button type="primary" htmlType="submit">
					Cập nhật
				</Button>
			</div>
		</Form>
	);
	//#endregion
};
