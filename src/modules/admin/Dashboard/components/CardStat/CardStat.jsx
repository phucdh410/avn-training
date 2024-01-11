import React, { useState } from 'react';
import './CardStat.scss';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { formatNumber } from 'src/utils/function.util';

export const CardStat = ({
	title,
	number,
	arrow,
	percent,
	description,
	icon,
	iconColor,
	customPercentIcon,
	duration,
}) => {
	const [loading, setLoading] = useState(false);

	const onStart = () => {
		setLoading(true);
	};

	const onEnd = () => {
		setLoading(false);
	};

	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded-xl mb-6 xl:mb-0 shadow-lg">
				<div className="flex-auto p-4">
					<div className="flex flex-wrap">
						<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
							<h5 className="text-gray-400 uppercase font-bold text-base">
								{title}
							</h5>
							<span className="font-semibold text-xl text-blueGray-700">
								{number ? (
									<CountUp
										start={0}
										end={number}
										onStart={onStart}
										onEnd={onEnd}
										duration={duration}
										containerProps={{
											'aria-busy': loading,
										}}
										formattingFn={formatNumber}
									/>
								) : (
									0
								)}
							</span>
						</div>
						<div className="relative w-auto pl-4 flex-initial">
							<div
								className={
									'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
									iconColor
								}
							>
								<i className={icon}></i>
							</div>
						</div>
					</div>
					<p className="text-sm text-gray-400 mt-4">
						<span
							className={
								(arrow === 'up'
									? 'text-green-400'
									: arrow === 'down'
									? 'text-red-400'
									: '') + ' mr-2'
							}
						>
							<i
								className={
									arrow === 'up'
										? 'fas fa-arrow-up'
										: arrow === 'down'
										? 'fas fa-arrow-down'
										: ''
								}
							></i>{' '}
							{percent}
							{customPercentIcon}
						</span>
						<span className="whitespace-nowrap">{description}</span>
					</p>
				</div>
			</div>
		</>
	);
};

CardStat.defaultProps = {
	title: 'Tiêu đề',
	arrow: 'up',
	number: 0,
	percent: 1.23,
	description: 'So với 1 ngày trước',
	icon: 'far fa-chart-bar',
	iconColor: 'bg-red-500',
	customPercentIcon: '%',
	duration: 1,
};

CardStat.propTypes = {
	title: PropTypes.string,
	number: PropTypes.number,
	arrow: PropTypes.any,
	percent: PropTypes.number,
	description: PropTypes.string,
	icon: PropTypes.string,
	iconColor: PropTypes.string,
	customPercentIcon: PropTypes.string,
	duration: PropTypes.number,
};
