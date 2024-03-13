import './CTest.scss';

import React from 'react';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const CTest = ({ href, canTest, disabledText }) => {
	const { t } = useTranslation();
	return (
		<div className="test">
			<div className="wrapper">
				<div className="content">
					{canTest ? (
						<>
							{t('process_now')}{' '}
							<a
								className="link"
								href={href}
								target="_blank"
								rel="noreferrer"
							>
								{t('test')}
							</a>{' '}
							{t('here')}
						</>
					) : (
						<span style={{ whiteSpace: 'pre-line' }}>
							{t(disabledText)}
						</span>
					)}
				</div>
				<div className="testing">
					{canTest ? (
						<a href={href} target="_blank" rel="noreferrer">
							<button className="button">
								{t('take_a_test')} <i className="icon goto"></i>
							</button>
						</a>
					) : (
						<button className="button" disabled>
							{t('take_a_test')} <i className="icon goto"></i>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

CTest.propTypes = {
	canTest: PropTypes.bool,
	href: PropTypes.string,
	disabledText: PropTypes.string.isRequired,
};

CTest.defaultProps = {
	canTest: true,
	disabledText: 'you_can_view_the_remain_content',
};
