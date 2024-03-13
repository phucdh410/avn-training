import { Link } from 'react-router-dom';
import arr_left from '../../../post_detail/assets/img/arr_left.png';
import Frame_color from '../../../post_detail/assets/img/Frame_color.png';
import PropTypes from 'prop-types';

export const HeaderPost = ({ postDetail }) => {
	return (
		<div className="header-post">
			<img src={arr_left} className="header-post__prev" alt="" />
			<div className="header-post__wrap">
				<div className="header-post__breadcumb">
					<Link to="/" className="header-post__breadcumb--back">
						Trang chủ / &nbsp;
					</Link>
					<Link to="/topic" className="header-post__breadcumb--back">
						Chủ đề / &nbsp;
					</Link>
					<Link
						to={`/category/${postDetail?.categoryId?.slug}`}
						className="header-post__breadcumb--back"
					>
						{postDetail?.categoryId?.name} / &nbsp;
					</Link>
					<div className="header-post__breadcumb--end">
						{postDetail?.title}
					</div>
				</div>
			</div>
			<img src={Frame_color} className="header-post__frame" alt="" />
		</div>
	);
};

HeaderPost.propTypes = {
	postDetail: PropTypes.any,
};
