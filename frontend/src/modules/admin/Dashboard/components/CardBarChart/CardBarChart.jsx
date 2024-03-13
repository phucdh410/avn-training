import React, { useEffect } from 'react';
import { Chart } from 'chart.js';
import PropTypes from 'prop-types';

const options = {
	responsive: true,
	maintainAspectRatio: false,
};

export const CardBarChart = ({ title, subTitle, labels, datasets }) => {
	useEffect(() => {
		const data = {
			labels: labels,
			datasets: datasets,
		};

		let config = {
			type: 'bar',
			data: data,
			options: options,
		};

		let ctx = document.getElementById('bar-chart').getContext('2d');

		if (window.myBar) {
			window.myBar.destroy();
		}

		window.myBar = new Chart(ctx, config);
	}, [labels, datasets]);
	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
				<div className="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full max-w-full flex-grow flex-1">
							<h6 className="uppercase text-gray-700 mb-1 text-base font-semibold">
								{title}
							</h6>
							<h2 className="text-gray-700 text-xl font-semibold">
								{subTitle}
							</h2>
						</div>
					</div>
				</div>
				<div className="p-4 flex-auto">
					{/* Chart */}
					<div className="bar-chart-wrapper h-80">
						<canvas id="bar-chart"></canvas>
					</div>
				</div>
			</div>
		</>
	);
};

CardBarChart.defaultProps = {
	title: 'Tiêu đề',
	subTitle: 'Tiêu đề phụ',
	labels: ['Label 1', 'Label 2'],
};

CardBarChart.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	labels: PropTypes.array,
	datasets: PropTypes.array,
};
