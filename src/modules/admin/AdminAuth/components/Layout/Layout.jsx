import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { LoadingContext } from 'src/contexts/loading.context';
import LoadingOverlay from 'react-loading-overlay';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { useWindowDimension } from 'src/hooks/window_demision.hook';
import { RESPONSIVE_SIZE } from 'src/configs/responsive.config';
import { CFooterAdmin } from 'src/commons';
import { RightHeader, Sidebar } from '..';
import './Layout.scss';

const { Sider, Content } = Layout;

export const LayoutAdmin = ({ children, isIt }) => {
	const [sideBarCollapse, setSideBarCollapse] = useState(true);
	const [isBlockContext, setIsBlockContext] = useState(false);
	const [width] = useWindowDimension();

	useEffect(() => {
		if (width && width >= RESPONSIVE_SIZE.LG) {
			setSideBarCollapse(false);
		}
	}, [width]);

	const toogleSidebar = () => setSideBarCollapse(!sideBarCollapse);

	return (
		<LoadingContext.Provider value={[isBlockContext, setIsBlockContext]}>
			<LoadingOverlay
				active={isBlockContext}
				spinner
				text={MESSAGE_FEEDBACK.COMMON.BLOCK_ACTION}
				className="loading-overlay"
			>
				<Layout className="layout-common">
					<Sider
						className="layout-sider"
						width={280}
						collapsed={sideBarCollapse}
					>
						<Sidebar
							isSidebarCollapsed={sideBarCollapse}
							isIt={isIt}
						/>
					</Sider>
					<Layout>
						<RightHeader
							isSidebarCollapsed={sideBarCollapse}
							toogleSidebar={toogleSidebar}
						/>
						<Content>
							<div className="content">{children}</div>
						</Content>
						<CFooterAdmin dark />
					</Layout>
				</Layout>
			</LoadingOverlay>
		</LoadingContext.Provider>
	);
};

LayoutAdmin.propTypes = {
	children: PropTypes.any,
	isIt: PropTypes.bool,
};

LayoutAdmin.defaultProps = {
	isIt: false,
};
