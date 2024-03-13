import React, { useEffect, createRef, useCallback } from 'react';

import './CFooter.scss';
import { useTranslation } from 'react-i18next';

export const CFooter = () => {
	const scrollBtn = createRef(null);

	const { t } = useTranslation();

	const scrollToTop = useCallback(() => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}, []);

	useEffect(() => {
		const onWindowScroll = () => {
			if (
				document.scrollTop > 70 ||
				document.documentElement.scrollTop > 70
			) {
				scrollBtn.current.classList.add('active');
			} else {
				scrollBtn.current.classList.remove('active');
			}
		};

		window.addEventListener('scroll', onWindowScroll);
		return () => window.removeEventListener('scroll', onWindowScroll);
	}, [scrollBtn]);

	return (
		<div className="footer">
			<img
				src="/assets/images/footer/Ex_black.png"
				className="footer__Ex-black"
				alt=""
			/>
			<img
				src="/assets/images/Exclude.png"
				className="footer__Ex-left"
				alt=""
			/>
			<div className="footer__wrap">
				<div className="license">
					<a href="https://www.ajinomoto.com.vn/">
						<img
							src="/assets/images/logo2.png"
							className="logo"
							alt=""
						/>
					</a>

					<div className="footer__left__content">
						{/* <span>
							<Link to="/">Sơ đồ website</Link> /{' '}
							<Link to="/">Chính sách bảo mật</Link> /{' '}
							<Link to="/">Liên hệ</Link>
						</span> */}
						<p>
							Copyright © 2022 © 2019 - 2020 Ajinomoto Co., Inc.
						</p>
					</div>
				</div>

				<div className="infomation">
					<div className="infomation__item">
						<div className="title">
							<img src="/assets/images/phone.png" alt="" />
							<p>{t('internal_support')}</p>
						</div>
						<p className="footer__contact__desc">
							truyenthong_noibo@ajinomoto.com.vn
							<br />
							gam_pt@ajinomoto.com.vn
							<br />
							loan_vtk@ajinomoto.com.vn
							<br />
							(028) 39301929, Ext: 710
						</p>
					</div>

					<div className="infomation__item">
						<div className="title">
							<img src="/assets/images/brief.png" alt="" />
							<p>{t('office')}</p>
						</div>
						<span className="footer__address__desc">
							<p>{t('5th_floor')}, Golden Tower</p>
							<p>{t('office_address')}</p>
						</span>
						{/* <div className="footer__address__map">
							Xem trên Google Map
							<GoogleMapIcon />

						</div> */}
					</div>

					<div className="infomation__item">
						<div className="title">
							<img src="/assets/images/brief.png" alt="" />
							<p>{t('connection')}</p>
						</div>
						<div className="footer__connect__icon">
							<a href="https://www.avn-live.com/">
								<img
									src="/assets/images/logo4.jpg"
									className="footer__connect__icon__fb"
									alt=""
								/>
							</a>
							{/* <img
								src="/assets/images/twitter.png"
								className="footer__connect__icon__twitter"
								alt=""
							/> */}
						</div>
					</div>
				</div>
			</div>
			<button
				className="scroll-btn"
				ref={scrollBtn}
				onClick={scrollToTop}
			>
				<img src="/assets/images/top_blue.png" alt="" />
			</button>
		</div>
	);
};
