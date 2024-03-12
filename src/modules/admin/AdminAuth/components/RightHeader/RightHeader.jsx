import React, { useContext } from 'react';
import { Avatar, Layout, Menu, Dropdown } from 'antd';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	LogoutOutlined,
	// KeyOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router';
import { UserContext } from 'src/contexts/user.context';
import './RightHeader.scss';
// import { ROUTE_ADMIN } from 'src/configs/route.config';

const RightHeaderComponent = ({ toogleSidebar, isSidebarCollapsed }) => {
	const history = useHistory();
	const [, setUserInfo] = useContext(UserContext);

	const handleLogout = async () => {
		localStorage.removeItem('token');
		setUserInfo(undefined);

		history.push('/login');
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
