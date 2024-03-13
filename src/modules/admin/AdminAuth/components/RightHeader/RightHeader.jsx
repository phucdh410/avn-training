import React from 'react';
import { Avatar, Layout, Menu, Dropdown } from 'antd';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	LogoutOutlined,
	// KeyOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './RightHeader.scss';
// import { ROUTE_ADMIN } from 'src/configs/route.config';
import axios from 'axios';

const RightHeaderComponent = ({ toogleSidebar, isSidebarCollapsed }) => {
	// const history = useHistory();

	const handleLogout = async () => {
		const token = localStorage.getItem('token');

		const res = await axios.get(
			`${process.env.REACT_APP_API_URL}/api/auth/azure/logout`,
			{ headers: { Authorization: `Bearer ${token}` } },
		);

		if (res?.status === 200) {
			localStorage.removeItem('token');
			window.location.href = res?.data?.data?.uri;
		}
	};

	// const handleChangePassword = async () => {
	// 	history.push(
	// 		`${ROUTE_ADMIN.ACCOUNT.BASE}${ROUTE_ADMIN.ACCOUNT.CHANGE_PASSWORD}`,
	// 	);
	// };

	const menuItems = [
		// {
		// 	key: '1',
		// 	label: <button onClick={handleChangePassword}>Đổi mật khẩu</button>,
		// 	icon: <KeyOutlined />,
		// },
		{
			key: '2',
			label: <button onClick={handleLogout}>Đăng xuất</button>,
			icon: <LogoutOutlined />,
		},
	];
	// const menuSetting = (
	// 	<Menu>
	// 		<Menu.Item
	// 			key={1}
	// 			icon={<KeyOutlined />}
	// 			onClick={handleChangePassword}
	// 		>
	// 			Đổi mật khẩu
	// 		</Menu.Item>
	// 		<Menu.Item key={2} icon={<LogoutOutlined />} onClick={handleLogout}>
	// 			Đăng xuất
	// 		</Menu.Item>
	// 	</Menu>
	// );

	return (
		<header>
			<Layout.Header className="header-right">
				<Menu mode="horizontal">
					<Menu.Item key={3} onClick={toogleSidebar}>
						{isSidebarCollapsed ? (
							<MenuUnfoldOutlined />
						) : (
							<MenuFoldOutlined />
						)}
					</Menu.Item>
					<Menu.Item key={4}>Trang chủ</Menu.Item>
					<Menu.Item key={5} style={{ marginLeft: 'auto' }}>
						<Dropdown
							menu={{ items: menuItems }}
							placement="bottomRight"
						>
							<Avatar size="large" icon={<UserOutlined />} />
						</Dropdown>
					</Menu.Item>
				</Menu>
			</Layout.Header>
		</header>
	);
};

RightHeaderComponent.propTypes = {
	toogleSidebar: PropTypes.func,
	isSidebarCollapsed: PropTypes.bool,
	history: PropTypes.object,
};

export const RightHeader = withRouter(RightHeaderComponent);
