import './Introduce.scss';
import PropTypes from 'prop-types';

import React from 'react';

// import vision from 'src/assets/images_2/vision.png';
// import bgSmall from 'src/assets/images/homepage/bg_small.png';

// import homepage1 from 'src/assets/images_2/homepage_1.png';
// import homepage2 from 'src/assets/images_2/homepage_2.jpg';
import htmlParse from 'html-react-parser';

export const Introduce = ({ introduce, bigBanner, smallBanner }) => {
	return (
		<div className="introduce">
			<div className="introduce__text">{htmlParse(introduce)}</div>
			<div className="introduce__img">
				<div className="introduce__img__size">
					<div className="introduce__img__wrap__big">
						<img
							className="introduce__img__big"
							src={bigBanner}
							alt="bigBanner"
						/>
					</div>
					<div className="introduce__img__wrap__small">
						<img
							className="introduce__img__small"
							src={smallBanner}
							alt="smallBanner"
						/>
						<div className="introduce__img__group">
							<div className="introduce__img__blue"></div>
							<div className="introduce__img__green"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Introduce.propTypes = {
	introduce: PropTypes.string,
	bigBanner: PropTypes.any,
	smallBanner: PropTypes.any,
};

Introduce.defaultProps = {
	introduce: '',
	bigBanner: '',
	smallBanner: '',
};
