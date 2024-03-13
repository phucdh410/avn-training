import React from 'react';

import arrLeft from '../../assets/img/arr-left.png';
import arrRight from '../../assets/img/arr-right.png';

import arrdou_left from '../../assets/img/arrdou_left.png';
import arrdou_right from '../../assets/img/arrdou_right.png';

const numberPage = [
	{
		display: '1',
	},
	{
		display: '2',
	},
	{
		display: '3',
	},
	{
		display: '...',
	},
	{
		display: '9',
	},
];

export const Paging = () => {
	return (
		<div className="list__topic__category__footer">
			<div className="list__topic__category__footer__item">
				<img
					src={arrdou_left}
					alt=""
					className="list__topic__category__footer__last-left"
				/>
			</div>
			<div className="list__topic__category__footer__item">
				<p className="list__topic__category__footer__first-page">
					Trang đầu
				</p>
			</div>
			<div className="list__topic__category__footer__item">
				<img
					src={arrLeft}
					alt=""
					className="list__topic__category__footer__prev"
				/>
			</div>

			<div className="list__topic__category__footer__item">
				{numberPage.map((item, index) => (
					<div
						className="list__topic__category__footer__item--number"
						key={index}
					>
						{item.display}
					</div>
				))}
			</div>

			<div className="list__topic__category__footer__item">
				<img
					src={arrRight}
					alt=""
					className="list__topic__category__footer__next"
				/>
			</div>

			<div className="list__topic__category__footer__item">
				<p className="list__topic__category__footer__last-page">
					Trang cuối
				</p>
			</div>

			<div className="list__topic__category__footer__item">
				<img
					src={arrdou_right}
					alt=""
					className="list__topic__category__footer__last-right"
				/>
			</div>
		</div>
	);
};
