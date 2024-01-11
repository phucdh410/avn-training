import './Homepage.scss';
import { GeneralHome } from './components/GeneralHome/GeneralHome';
import LocalesEnum from 'src/enums/locales.enum';

export const HomepageConfig = () => {
	return (
		<main className="homepage-config">
			<div className="white-block-content">
				<h1 className="header-title">
					Cấu hình trang chủ (Nhập đầy đủ bài viết cho hai ngôn ngữ)
				</h1>
				<section className="form-wrapper">
					<GeneralHome language={LocalesEnum.Vi} />
					<GeneralHome language={LocalesEnum.En} />
				</section>
			</div>
		</main>
	);
};
