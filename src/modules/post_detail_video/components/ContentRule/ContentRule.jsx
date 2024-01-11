import React from 'react';

import play from '../../../post_detail/assets/img/play.png';
import check from '../../../post_detail/assets/img/check.png';
import pluse from '../../../post_detail/assets/img/pluse.png';

import green from '../../../post_detail/assets/img/green.png';
import blue from '../../../post_detail/assets/img/blue.png';
import orange from '../../../post_detail/assets/img/orange.png';
import halfgreen from '../../../post_detail/assets/img/halfgreen.png';
import halfblue from '../../../post_detail/assets/img/halfblue.png';

import Frame_color from '../../../post_detail/assets/img/Frame_color.png';

const noteItem = [
	{
		name:
			'Lưu ý 1: Nội dung lưu ý được update sau bởi AVN, Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		img: play,
	},
	{
		name:
			'Lưu ý 2: Nội dung lưu ý được update sau bởi AVN, Lorem ipsum dolor sit amet.',
		img: check,
	},
	{
		name: 'Lưu ý 3: Nội dung lưu ý được update sau bởi AVN.',
		img: pluse,
	},
];

export const ContentRule = () => {
	return (
		<div className="header-post__rule">
			<div className="header-post__rule__text">
				<span className="header-post__rule__text__title">Lưu ý:</span>
				<div className="header-post__rule__text__list">
					{noteItem.map((item, index) => (
						<div
							className="header-post__rule__text__item"
							key={index}
						>
							<img
								src={item.img}
								className="header-post__rule__text__item__img"
								alt=""
							/>
							<p className="header-post__rule__text__item__desc">
								{item.name}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="header-post__rule__image">
				<div className="header-post__rule__image__green">
					<img
						src={halfgreen}
						className="header-post__rule__image__green--half"
						alt=""
					/>
					<img
						src={green}
						className="header-post__rule__image__green--one"
						alt=""
					/>
				</div>
				<div className="header-post__rule__image__blue">
					<img
						src={halfblue}
						className="header-post__rule__image__blue--half"
						alt=""
					/>
					<img
						src={blue}
						className="header-post__rule__image__blue--one"
						alt=""
					/>
					<img
						src={orange}
						className="header-post__rule__image__blue--orange"
						alt=""
					/>
				</div>
			</div>
			<img src={Frame_color} className="header-post__frame" alt="" />
		</div>
	);
};
