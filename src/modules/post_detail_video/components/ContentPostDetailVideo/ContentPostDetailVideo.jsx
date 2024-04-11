import React, { useState, useEffect, useRef, useContext } from 'react';
import './ContentPostDetailVideo.scss';
import PropTypes from 'prop-types';
import playbtn from '../../../post_detail/assets/img/playbtn.png';
import ReactPlayer from 'react-player/youtube';
import { YOUTUBE_PLAY_URL } from 'src/configs/constant.config';
import api from 'src/api';
import { alertWarning } from 'src/utils/alert.util';
import { UserContext } from 'src/contexts/user.context';
import { useTranslation } from 'react-i18next';

export const ContentPostDetailVideo = ({
	_id,
	description,
	duration,
	statusView,
	title,
	youtubeId,
	setDone,
}) => {
	const [userContext] = useContext(UserContext);
	const [isShowControl, setIsShowControl] = useState(false);

	const [autoPlay, setAutoPlay] = useState(false);
	const playerRef = useRef();

	const { t } = useTranslation();

	useEffect(() => {
		const disableNextPrevKeyboard = e => {
			const { keyCode } = e;

			if (
				keyCode === 37 &&
				keyCode === 39 &&
				keyCode === 74 &&
				keyCode === 76
			) {
				e.preventDefault();
				return false;
			} else {
				return true;
			}
		};

		document.addEventListener('keydown', disableNextPrevKeyboard);

		return () => {
			document.removeEventListener('keyup', disableNextPrevKeyboard);
		};
	}, []);

	useEffect(() => {
		if (statusView !== undefined) {
			if (statusView?.done) {
				setIsShowControl(true);
			}

			if (!statusView?.done && statusView?.duration > 0) {
				alertWarning(
					t('keep_watching'),
					t('watching_early'),
					() => {
						playerRef.current.seekTo(statusView?.duration);
						setAutoPlay(true);
					},
					() => {
						playerRef.current.seekTo(0);
						setAutoPlay(true);
					},
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusView]);

	const onEnd = async () => {
		if (!statusView?.done) {
			const result = await api.postUser.updateStatusViewed({
				postId: _id,
				duration,
				done: true,
			});

			setDone(true);

			return result;
		}
	};

	const onChange = async duration => {
		if (statusView?.done) return; //Đã done thì không gọi onChange nữa

		if (userContext?.name || userContext?.username) {
			if (parseInt(duration.playedSeconds) > 3) {
				await api.postUser.updateStatusViewed({
					postId: _id,
					duration: parseInt(duration?.playedSeconds),
					done: false,
				});
			}
		}
	};

	return (
		<div className="content-post__video">
			<span className="content-post__video__title">{title}</span>

			<div className="aspect-ratio-video">
				<ReactPlayer
					key={isShowControl}
					url={`${YOUTUBE_PLAY_URL}${youtubeId}`}
					className="content-post__video__content"
					onEnded={onEnd}
					onProgress={onChange}
					progressInterval={3000}
					width="100%"
					height="100%"
					controls={isShowControl}
					playIcon={playbtn}
					ref={playerRef}
					playing={autoPlay}
					config={{
						playerVars: {
							modestbranding: 0,
							showinfo: 0,
							disablekb: 1,
							rel: 0,
						},
					}}
				/>
			</div>

			{description ? (
				<p className="content-post__video__desc">{description}</p>
			) : (
				''
			)}
		</div>
	);
};

ContentPostDetailVideo.propTypes = {
	_id: PropTypes.string,
	autoPlay: PropTypes.bool,
	description: PropTypes.string,
	duration: PropTypes.string,
	statusView: PropTypes.object,
	title: PropTypes.string,
	youtubeId: PropTypes.string,
	setDone: PropTypes.func,
};
