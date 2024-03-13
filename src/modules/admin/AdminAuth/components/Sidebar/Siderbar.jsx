import React from 'react';
import { Menu } from 'antd';
import './Sidebar.scss';
import { useHistory } from 'react-router-dom';
import { SIDEBAR_IT, SIDEBAR_MENU } from 'src/configs/layout.config';
import { bool } from 'prop-types';

const SidebarComponent = ({ isIt }) => {
	const history = useHistory();

	const linkToPage = href => history.push(href);

	return (
		<div className="side-bar">
			<Menu
				mode="inline"
				theme="light"
				selectedKeys={[history.location.pathname]}
				defaultOpenKeys={SIDEBAR_MENU.map(item => item.href)}
				// items={menuItems}
			>
				<Menu.Item key="Ajinomoto CMS" className="sidebar-logo">
					Ajinomoto CMS
				</Menu.Item>
				{(isIt ? SIDEBAR_IT : SIDEBAR_MENU).map(item => {
					return item.sub ? (
						<Menu.SubMenu
							key={`${item.href}`}
							icon={item.icon}
							title={item.title}
						>
							{item.sub &&
								item.sub.map(subItem => (
									<Menu.Item
										key={`${item.href}${subItem.href}`}
										onClick={() =>
											linkToPage(
												`${item.href}${subItem.href}`,
											)
										}
										icon={subItem.icon}
									>
										{subItem.title}
									</Menu.Item>
								))}
						</Menu.SubMenu>
					) : (
						<Menu.Item
							key={`${item.href}`}
							onClick={() => linkToPage(`${item.href}`)}
							icon={item.icon}
						>
							{item.title}
						</Menu.Item>
					);
				})}
			</Menu>
		</div>
	);
};

export const Sidebar = SidebarComponent;

SidebarComponent.propTypes = {
	isSidebarCollapsed: bool,
	isIt: bool,
};
