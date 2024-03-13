import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CInputAdmin, CSelectAdmin } from 'src/commons';
import { FORM_RULES } from 'src/utils/validator.util';
import { TEST_TYPE } from 'src/configs/constant.config';
import PropTypes from 'prop-types';

export const PostTestComponent = ({ testDetail, mode }) => {
	const getDisableStatus = () => {
		console.log(testDetail);
		console.log(mode);
		return false;
		// if (mode === 'create') {
		// 	return testDetail?.isExist;
		// } else {
		// 	return testDetail?.isExist && testDetail?.data?.totalPost > 1;
		// }
	};

	return (
		<div className="post-test">
			<h1 className="form-title">Thông tin kiểm tra</h1>
			<div>
				<CSelectAdmin
					label="Loại kiểm tra*"
					placeholder="Chọn loại bài kiểm tra"
					name="testType"
					rules={FORM_RULES.POST.TEST_TYPE}
					options={[
						{
							content: 'Kiểm tra theo từng bài',
							value: TEST_TYPE.POST,
						},
						{
							content: 'Kiểm tra theo loại chủ đề',
							value: TEST_TYPE.CATEGORY,
						},
					]}
					disabled={getDisableStatus()}
				/>
				<CInputAdmin
					label="Nhập link test*"
					placeholder="Nhập link test từ google form"
					name="linkTest"
					rules={FORM_RULES.POST.TEST_LINK}
					// disabled={
					// 	testDetail?.isExist &&
					// 	//testDetail?.type === TEST_TYPE.CATEGORY
					// }
				/>
			</div>
		</div>
	);
};

PostTestComponent.propTypes = {
	testDetail: PropTypes.any,
	mode: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({});

export const PostTest = connect(mapStateToProps, {})(PostTestComponent);
