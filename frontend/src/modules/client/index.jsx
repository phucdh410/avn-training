import React, { useState, useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';

import { CHeader, CMenu, CFooter } from 'src/commons';

const Client = ({ children, className }) => {
	const [isMenuShow, setIsMenuShow] = useState(false);

	const toggleMenu = useCallback(() => setIsMenuShow(!isMenuShow), [
		isMenuShow,
		setIsMenuShow,
	]);

	useEffect(() => {
		if (isMenuShow) {
			document.querySelector('body').style.overflow = 'hidden';
		} else {
			document.querySelector('body').style.overflow = 'overlay';
		}
	}, [isMenuShow]);

	return (
		<section className={className}>
			<CHeader onMenuShow={toggleMenu} />
			<CMenu isShow={isMenuShow} onClose={toggleMenu} />
			<main className="fade">{children}</main>
			<CFooter />
		</section>
	);
};

Client.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Client;
