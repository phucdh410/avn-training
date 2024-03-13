import React from 'react';
import PropTypes from 'prop-types';

export const CFooterAdmin = ({ absolute, dark }) => {
	return (
		<footer
			className={
				(absolute
					? 'absolute w-full bottom-0 bg-blueGray-800'
					: 'relative') +
				' pb-6' +
				(dark ? ' text-gray-700' : '')
			}
		>
			<div className="container mx-auto px-4">
				<hr className="mb-6 border-b-1 border-blueGray-600" />
				<div
					className={`flex flex-wrap items-center md:justify-between justify-center ${
						dark ? 'text-gray-700' : 'text-white'
					}`}
				>
					<div className="w-full  px-4">
						<div className="text-sm font-semibold py-1 text-center md:text-left">
							Copyright © {new Date().getFullYear()}
							{'  '}
							<a
								href="https://www.ajinomoto.com.vn/vi"
								className="hover:text-blueGray-300 text-sm font-semibold py-1"
							>
								Ajinomoto Co., Inc.
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

CFooterAdmin.defaultProps = {
	dark: false,
};

CFooterAdmin.propTypes = {
	absolute: PropTypes.any,
	dark: PropTypes.bool,
};
