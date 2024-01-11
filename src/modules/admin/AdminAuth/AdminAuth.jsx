import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import { UserContext } from 'src/contexts/user.context';

import { Redirect } from 'react-router-dom';
import { ROUTE_ADMIN } from 'src/configs/route.config';
import PropTypes from 'prop-types';
import { LayoutAdmin } from './components';
import { ACCOUNT_TYPE } from 'src/configs/constant.config';

const AdminAuthComponent = ({ children }) => {
	const [userContext] = useContext(UserContext);

	if (userContext && userContext?.group === ACCOUNT_TYPE.ADMIN) {
		return <LayoutAdmin>{children}</LayoutAdmin>;
	} else {
		return <Redirect to={ROUTE_ADMIN.AUTH.LOGIN} />;
	}
};

AdminAuthComponent.propTypes = {
	children: PropTypes.any,
};

export const AdminAuth = withRouter(AdminAuthComponent);
