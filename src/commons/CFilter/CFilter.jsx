import './CFilter.scss';

import React from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Vector from '../../assets/images/Vector.png';
import { useTranslation } from 'react-i18next';

// import { useLocation, useHistory } from 'react-router-dom';
// import { useQuery } from 'src/hooks/query.hook';
// import { stringify } from 'query-string';

const year = [
	{
		display: '2022',
	},
];

// const type = [
// 	{
// 		display: 'Video',
// 	},
// 	{
// 		display: 'Bài viết',
// 	},
// ];

export const CFilter = ({ isDisabled }) => {
	// const location = useLocation();
	// const history = useHistory();
	// const query = useQuery();

	// const onClickFilter = (key, value) => {
	// 	const currentSortObj = { ...query, [key]: value };

	// 	const currentQueryStr = '?' + stringify(currentSortObj);

	// 	const newUrl = location.pathname + currentQueryStr;

	// 	history.push(newUrl);
	// };
	const { t } = useTranslation();

	return (
		<div className={`filter-wrap ${isDisabled ? 'disabled' : ''}`}>
			<div className="filter">
				<h4 className="filter__title">{t('filter')}</h4>
				<div className="filter__wrap">
					<div className="filter__item">
						<div className="filter__item__heading">
							<div className="filter__item__heading--title">
								{t('by_year')}
							</div>
							<img
								src={Vector}
								alt=""
								className="filter__item__heading--img"
							/>
						</div>
						<div className="filter__item__body">
							{year.map((item, index) => (
								<div
									className="filter__item__body--year"
									key={index}
								>
									{item.display}
								</div>
							))}
						</div>
					</div>

					{/* <div className="filter__item">
						<div className="filter__item__heading">
							<div className="filter__item__heading--title">
								Hình thức trình bày
							</div>
							<img
								src={Vector}
								alt=""
								className="filter__item__heading--img"
							/>
						</div>
						<div className="filter__item__body">
							{type.map((item, index) => (
								<div
									className="filter__item__body--type"
									key={index}
								>
									{item.display}
								</div>
							))}
						</div>
					</div> */}

					{/* <div className="filter__item">
						<div className="filter__item__heading">
							<div className="filter__item__heading--title">
								Các chủ đề
							</div>
							<img
								src={Vector}
								alt=""
								className="filter__item__heading--img"
							/>
						</div>
						<div className="filter__item__body">
							{isRandom
								? topics &&
								  topics
										.sort(() => 0.5 - Math.random())
										.slice(0, 5)
										.map((topic, index) => (
											<button
												className="filter__item__body--topic"
												key={index}
											>
												<Link
													to={`/${type}/${topic?.slug}`}
												>
													{topic?.name}
												</Link>
											</button>
										))
								: topics?.map((topic, index) => (
										<button
											className="filter__item__body--topic"
											key={index}
										>
											<Link
												to={`/${type}/${topic?.slug}`}
											>
												{topic?.name}
											</Link>
										</button>
								  ))}
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

CFilter.propTypes = {
	topics: PropTypes.array,
	type: PropTypes.string,
	isRandom: PropTypes.bool,
	isDisabled: PropTypes.bool,
};
