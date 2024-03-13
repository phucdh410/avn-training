import React from 'react';
import { CInputAdmin, CSelectAdmin, CEditor, CNumberInput } from 'src/commons';
import PropTypes from 'prop-types';
import { POST_TYPE } from 'src/configs/constant.config';
import { FORM_RULES } from 'src/utils/validator.util';
import './PostType.scss';

export const PostType = ({ postType, onChangePostType }) => {
	// const [isPostText, setIsPostText] = useState()

	// useEffect(() => {
	// 	if (isPostText)
	// }, [postType])

	return (
		<div className="post-type">
			<h1 className="form-title">Nội dung theo loại bài viết</h1>
			<div>
				<CSelectAdmin
					label="Loại bài viết*"
					placeholder="Chọn loại bài viết"
					name="type"
					value={postType}
					options={[
						{
							content: 'Chữ, hình ảnh',
							value: POST_TYPE.TEXT,
						},
						{
							content: 'Video',
							value: POST_TYPE.VIDEO,
						},
					]}
					defaultValue={postType}
					onChange={onChangePostType}
					rules={FORM_RULES.POST.TYPE}
				/>
				{postType === POST_TYPE.TEXT ? (
					<CEditor
						label="Nội dung*"
						placeholder="Nhập nội dung của bài viết"
						name="content"
						//rules={FORM_RULES.POST.DESCRIPTION}
						//disabled={pageMode !== POST_DETAIL_MODE.CREATE}
						rules={FORM_RULES.POST.CONTENT}
					/>
				) : (
					<>
						<CInputAdmin
							label="Nhập link của video youtube*"
							placeholder="VD: https://www.youtube.com/watch?v=abcdef ...."
							name="youtubeId"
							rules={FORM_RULES.POST.VIDEO_ID}
						/>
						<CNumberInput
							label="Thời lượng của video (giây) * "
							placeholder="VD: 120 ...."
							name="duration"
							rules={FORM_RULES.POST.VIDEO_ID}
						/>
					</>
				)}
			</div>
		</div>
	);
};

PostType.propTypes = {
	postType: PropTypes.number,
	onChangePostType: PropTypes.func,
};
