import './Hero.scss';
import { CInputAdmin, CUploadImage } from 'src/commons';
import { FORM_RULES } from 'src/utils/validator.util';
import { API_URL } from 'src/configs/constant.config';
import PropTypes from 'prop-types';
import { getFileNameFromUrl, getLinkImage } from 'src/utils/function.util';

export const Hero = ({ detail, hasChangedTab }) => {
	return (
		<div className="hero-config">
			<h1 className="form-title">Giới thiệu</h1>
			<div>
				<CInputAdmin
					label="Nội dung"
					type="textarea"
					name="introduce"
					rules={FORM_RULES.HOMEPAGE.INTRODUCE}
					rows={5}
				/>
				<CUploadImage
					label="Hình ảnh trái"
					name="bigBanner"
					rules={FORM_RULES.HOMEPAGE.BIG_BANNER}
					uploadUrl={`${API_URL}/api/files/upload`}
					data={{ sourceType: 3 }}
					hasChangedTab={hasChangedTab}
					defaultFiles={
						detail?.bigBanner && [
							{
								uid: Date.now(),
								name: getFileNameFromUrl(
									detail?.bigBanner?.path,
								),
								status: 'done',
								url: getLinkImage(detail?.bigBanner?.path),
							},
						]
					}
				/>
				<CUploadImage
					label="Hình ảnh phải"
					name="smallBanner"
					rules={FORM_RULES.HOMEPAGE.SMALL_BANNER}
					uploadUrl={`${API_URL}/api/files/upload`}
					data={{ sourceType: 3 }}
					hasChangedTab={hasChangedTab}
					defaultFiles={
						detail?.smallBanner && [
							{
								uid: Date.now(),
								name: getFileNameFromUrl(
									detail?.smallBanner?.path,
								),
								status: 'done',
								url: getLinkImage(detail?.smallBanner?.path),
							},
						]
					}
				/>
			</div>
		</div>
	);
};

Hero.propTypes = {
	detail: PropTypes.any,
	hasChangedTab: PropTypes.bool,
};
