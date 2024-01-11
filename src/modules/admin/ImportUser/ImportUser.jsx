import { useContext } from 'react';
import { LoadingContext } from 'src/contexts/loading.context';
import { connect } from 'react-redux';
import { CUpload } from 'src/commons';
import { API_URL, API_VERSION } from 'src/configs/constant.config';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { alertSuccess, alertFail } from 'src/utils/alert.util';
import { MESSAGE_ERROR } from 'src/configs/error.config';

const ImportUserContainer = () => {
	const [, setLoadingOverlay] = useContext(LoadingContext);

	const onUploadFile = (status, response) => {
		setLoadingOverlay(true);

		let msgError = '';

		if (response?.message === MESSAGE_ERROR.DUPLICATED) {
			if (response?.errors[0]?.username) {
				msgError = `Đã tồn tại tài khoản nhân viên có mã số ${response?.errors[0]?.username}`;
			}
		}

		if (status) {
			setLoadingOverlay(false);

			alertSuccess(MESSAGE_FEEDBACK.USER.IMPORT_SUCCESS);
		} else {
			setLoadingOverlay(false);

			alertFail(MESSAGE_FEEDBACK.USER.IMPORT_FAIL, msgError);
		}
	};

	return (
		<section className="import-user">
			<div className="white-block-content">
				<h1 className="header-title">Import nhân viên</h1>
				<CUpload
					label="Import danh sách nhân viên từ file excel"
					note="File được chọn phải có định dạng .xls, .xlsx, .xlsb và dưới 25MB"
					fileExts=".xls, .xlsx, .xlsb"
					btnContent="Import nhân viên"
					actionUrl={`${API_URL}/api/${API_VERSION}/accounts/import`}
					onUploaded={onUploadFile}
				/>
			</div>
		</section>
	);
};

const mapStateToProps = null;

export const ImportUser = connect(mapStateToProps, {})(ImportUserContainer);
