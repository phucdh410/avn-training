import React from 'react';
import './RuleDetail.scss';

import look from '../../assets/img/look.png';
import girl from '../../assets/img/girl.png';

import rec_blue from '../../assets/img/rec_blue.png';

import play from '../../assets/img/play.png';
import pluse from '../../assets/img/pluse.png';
import check from '../../assets/img/check.png';

import Blur_orange from '../../assets/img/Blur_orange.png';
import Blur_purple from '../../assets/img/Blur_purple.png';
import { useTranslation } from 'react-i18next';

export const RuleDetail = () => {
	const { t } = useTranslation();
	return (
		<div className="rule-detail">
			<div className="rule-detail__blur">
				<div className="rule-detail__left">
					<img
						src={girl}
						alt=""
						className="rule-detail__left__girl"
					/>
					<img
						src={look}
						alt=""
						className="rule-detail__left__look"
					/>
					<img
						src={rec_blue}
						alt=""
						className="rule-detail__left__rec-bot"
					/>
					<img
						src={rec_blue}
						alt=""
						className="rule-detail__left__rec-top"
					/>
					<img
						src={Blur_orange}
						className="rule-detail__left__blur-oran"
						alt=""
					/>
					<img
						src={Blur_purple}
						className="rule-detail__left__blur-pur"
						alt=""
					/>
				</div>
				<div className="rule-detail__right">
					<h4 className="rule-detail__right__title font-bold">
						{t('guideline')}
					</h4>
					<div className="rule-detail__right__list">
						<div className="rule-detail__right__item">
							<div className="rule-detail__right__item__icon">
								<img
									src={play}
									className="rule-detail__right__item__img"
									alt=""
								/>
							</div>
							<span className="rule-detail__right__item__txt">
								{t('step_1')}
							</span>
						</div>
						<div className="rule-detail__right__item">
							<div className="rule-detail__right__item__icon">
								<img
									src={check}
									className="rule-detail__right__item__img"
									alt=""
								/>
							</div>
							<span className="rule-detail__right__item__txt">
								{t('step_2')}
							</span>
						</div>
						<div className="rule-detail__right__item">
							<div className="rule-detail__right__item__icon">
								<img
									src={pluse}
									className="rule-detail__right__item__img"
									alt=""
								/>
							</div>
							<span className="rule-detail__right__item__txt">
								{t('step_3')}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
