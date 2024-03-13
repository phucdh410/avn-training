import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import PropTypes from 'prop-types';

Chart.register(...registerables);

const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			labels: {
				color: 'white',
			},
		},
	},
	scales: {
		xAxes: {
			ticks: {
				color: 'white',
			},
			grid: {
				color: 'rgba(229, 231, 235, 0.25)',
			},
			label: {
				color: 'white',
			},
		},
		yAxes: {
			ticks: {
				color: 'white',
			},
			grid: {
				color: 'rgba(229, 231, 235, 0.25)',
			},
			label: {
				color: 'white',
			},
		},
	},
};

export const CardLineChart = ({
	className,
	title,
	subTitle,
	labels,
	datasets,
}) => {
	useEffect(() => {
		const data = {
			labels: labels,
			datasets: datasets,
		};

		const config = {
			type: 'line',
			data: data,
			options: options,
		};

		const ctx = document.getElementById(`line-chart`);

		if (window.myLine) {
			window.myLine.destroy();
		}

		window.myLine = new Chart(ctx, config);
	}, [datasets, labels]);
	return (
		<>
			<div
				className={`relative min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-700 ${className}`}
			>
				<div className="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full max-w-full flex-grow flex-1">
							<h6 className="uppercase text-white mb-1 text-base font-semibold">
								{title}
							</h6>
							<h2 className="text-white text-xl font-semibold">
								{subTitle}
							</h2>
						</div>
					</div>
				</div>
				<div className="p-4">
					{/* Chart */}
					<div className="relative h-80">
						<canvas id="line-chart"></canvas>
					</div>
				</div>
			</div>
		</>
	);
};

CardLineChart.defaultProps = {
	title: 'Tiêu đề',
	subTitle: 'Tiêu đề phụ',
	labels: ['Label 1', 'Label 2'],
};

CardLineChart.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	labels: PropTypes.array,
	datasets: PropTypes.array,
};
