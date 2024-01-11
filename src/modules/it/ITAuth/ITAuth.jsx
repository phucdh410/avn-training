import { useContext } from 'react';
import { withRouter } from 'react-router';
import { UserContext } from 'src/contexts/user.context';
import { Redirect } from 'react-router-dom';
import { ROUTE_IT } from 'src/configs/route.config';
import PropTypes from 'prop-types';
import { LayoutAdmin } from '../../admin/AdminAuth/components';

const ITAuthComponent = ({ children }) => {
	const [userContext] = useContext(UserContext);

	if (userContext && userContext?.group === 'it') {
		return <LayoutAdmin isIt>{children}</LayoutAdmin>;
	} else {
		return <Redirect to={ROUTE_IT.AUTH.LOGIN} />;
	}
};

ITAuthComponent.propTypes = {
	children: PropTypes.any,
};

export const ITAuth = withRouter(ITAuthComponent);
