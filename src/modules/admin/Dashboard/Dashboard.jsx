import React, { useEffect, useState } from 'react';
import { CardStat, CardLineChart, CardBarChart } from './components';
import { DASHBOARD_CHART_LABELS } from 'src/configs/layout.config';
import { connect } from 'react-redux';
import api from 'src/api';
import './Dashboard.scss';
import { calculatorValueChange } from 'src/utils/function.util';

const DashBoardContainer = () => {
	const [report, setReport] = useState();

	useEffect(() => {
		const getReport = async () => {
			const result = await api.postUser.getUserViewdReport();
			console.log('🚀 ~ getReport ~ result:', result);

			setReport(result?.data);
		};

		getReport();
	}, []);

	return (
		<main className="dashboard">
			<section className="dashboard-top">
				<h1 className="header-title">Số liệu thống kê</h1>
				{/* <div
					style={{
						aspectRatio: '16/9',
						position: 'relative',
						maxWidth: '500px',
					}}
				>
					<iframe
						src="https://www.youtube.com/embed/E0aK6CKsSNg?si=GnZfDvvZNS2mOviV"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
						}}
					></iframe>
				</div> */}

				<div className="card-lists grid gap-8 md:grid-cols-2 xl:grid-cols-2">
					<CardStat
						title="Tổng số lượt xem"
						description="So với 1 ngày trước"
						number={report?.countToday}
						percent={
							report &&
							calculatorValueChange(
								report.countYesterday,
								report.countToday,
							)
						}
						arrow={
							report && report.countYesterday > report.countToday
								? 'down'
								: 'up'
						}
					/>
					<CardStat
						title="Tổng số lượt đã xem hết bài viết"
						description="So với 1 ngày trước"
						number={report?.countDoneToday}
						icon="fas fa-network-wired"
						iconColor="bg-pink-500"
						percent={
							report &&
							calculatorValueChange(
								report.countDoneYesterday,
								report.countDoneToday,
							)
						}
						arrow={
							report &&
							report.countDoneYesterday > report.countDoneToday
								? 'down'
								: 'up'
						}
					/>
				</div>
			</section>
			<section className="dashboard-bot">
				<div className="chart-list grid grid-cols-3 gap-8">
					<CardLineChart
						title="Lượt xem"
						subTitle="Tổng số lượt xem"
						className="col-span-2"
						labels={DASHBOARD_CHART_LABELS}
						datasets={[
							{
								label: 'Tuần này',
								backgroundColor: '#4c51bf',
								borderColor: '#4c51bf',
								data: report?.countThisWeek,
								fill: false,
							},
							{
								label: 'Tuần trước',
								backgroundColor: '#fff',
								borderColor: '#fff',
								data: report?.countLastWeek,
								fill: false,
							},
						]}
					/>
					<CardBarChart
						title="Lượt đã xem hết bài viết "
						subTitle="Tổng số lượt đã xem hết bài viết"
						labels={DASHBOARD_CHART_LABELS}
						datasets={[
							{
								label: 'Tuần trước',
								fill: false,
								backgroundColor: '#4c51bf',
								borderColor: '#4c51bf',
								data: report?.countDoneLastWeek,
								barThickness: 8,
							},
							{
								label: 'Tuần này',
								backgroundColor: '#ed64a6',
								borderColor: '#ed64a6',
								data: report?.countDoneThisWeek,
								fill: false,
								barThickness: 8,
							},
						]}
					/>
				</div>
			</section>
		</main>
	);
};

DashBoardContainer.propTypes = {};

//const mapStateToProps = {};

export const Dashboard = connect()(DashBoardContainer);
