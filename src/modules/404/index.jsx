import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export const Page404 = () => {
	return (
		<main>
			<div id="notfound">
				<div className="notfound">
					<div className="notfound-404">
						<h1>Oops!</h1>
					</div>
					<h2>404 - Không tìm được trang</h2>
					<p>
						Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc
						tạm thời không có sẵn.{' '}
					</p>
					<Link to="/">Trở về trang chủ</Link>
				</div>
			</div>
		</main>
	);
};
