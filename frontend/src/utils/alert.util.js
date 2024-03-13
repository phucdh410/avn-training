import Swal from 'sweetalert2';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { t } from 'i18next';

export const alertSuccess = (title, text) =>
	Swal.fire({
		title: title,
		text: text,
		icon: 'success',
	});

export const alertFail = (title, text) =>
	Swal.fire({
		title: title,
		text: text,
		icon: 'error',
	});

export const alertWarningDelete = onConfirm => {
	Swal.fire({
		title: MESSAGE_FEEDBACK.COMMON.DELETE_WARNING,
		showCancelButton: true,
		icon: 'warning',
		reverseButtons: true,
		confirmButtonText: MESSAGE_FEEDBACK.COMMON.BUTTON_OK,
		cancelButtonText: MESSAGE_FEEDBACK.COMMON.BUTTON_CANCEL,
	}).then(result => {
		if (result.isConfirmed) {
			onConfirm();
		}
	});
};

export const alertWarningHide = onConfirm => {
	Swal.fire({
		title: MESSAGE_FEEDBACK.COMMON.HIDE_WARNING,
		showCancelButton: true,
		icon: 'warning',
		reverseButtons: true,
		confirmButtonText: MESSAGE_FEEDBACK.COMMON.BUTTON_OK,
		cancelButtonText: MESSAGE_FEEDBACK.COMMON.BUTTON_CANCEL,
	}).then(result => {
		if (result.isConfirmed) {
			onConfirm();
		}
	});
};

export const alertWarning = (title, text, onConfirm, onReject) => {
	Swal.fire({
		title: title,
		text: text,
		showCancelButton: true,
		icon: 'warning',
		reverseButtons: true,
		confirmButtonText: t('ok'),
		cancelButtonText: t('cancel'),
	})
		.then(result => {
			if (result.isConfirmed) {
				onConfirm();
			}
		})
		.catch(() => {
			onReject && onReject();
		});
};
