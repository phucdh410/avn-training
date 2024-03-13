import Swal from 'sweetalert2';
import { validatePhoneNumber } from 'src/utils/validator.util';
import { API_URL } from 'src/configs/constant.config';
import { parse } from 'query-string';

export const clearHTMLTag = str => str.replace(/(<([^>]+)>)/gi, '');

export const goTop = () => window.scrollTo(0, 0);

export const formatPhone = phoneNumber => {
	if (phoneNumber) {
		if (validatePhoneNumber(phoneNumber)) {
			if (phoneNumber[0] === '8') {
				return '+' + phoneNumber;
			}
			if (phoneNumber[0] === '0') {
				phoneNumber = phoneNumber.substring(1);
				return '+84' + phoneNumber;
			}
		}
	}
};

export const formatNumber = number => {
	return `${number}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const removeDot = string => string.split('.').join('');

export const objectFlat = obj => {
	const flattened = {};

	Object.keys(obj).forEach(key => {
		const value = obj[key];

		if (
			typeof value === 'object' &&
			value !== null &&
			!Array.isArray(value)
		) {
			Object.assign(flattened, objectFlat(value));
		} else {
			flattened[key] = value;
		}
	});

	return flattened;
};

export const convertPriceToString = price => {
	if (price === 0) {
		return 'Thỏa thuận';
	} else {
		let strPrice = price + '';
		if (strPrice.length > 6 && strPrice.length < 10) {
			const newPrice = price / 1000000;
			return newPrice + ' triệu ';
		} else if (strPrice.length > 9) {
			const newPrice = price / 1000000000;
			return newPrice + ' tỉ ';
		} else {
			return formatNumber(price);
		}
	}
};

export const getNameImage = url => {
	if (url) {
		const slashSplit = url.split('/');
		const underscore = slashSplit[slashSplit.length - 1].split('_');

		return underscore[underscore.length - 1];
	}
};

export const alertDelete = handleDelete => {
	Swal.fire({
		title: 'Bạn có chắc chắn xóa không?',
		text: 'Bạn sẽ không thể hoàn tác lại hành động này!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Có, xóa nó!',
		cancelButtonText: 'Trở lại',
	}).then(async result => {
		if (result.isConfirmed) {
			handleDelete()
				.then(res => {
					if (res) {
						Swal.fire(
							'Đã xóa!',
							'Thao tác xóa đã thành công',
							'success',
						);
					} else {
						Swal.fire(
							'Lỗi!',
							'Có vẻ như có gì đó không đúng, thử reload lại trang và thực hiện lại nhé',
							'error',
						);
					}
				})
				.catch(() =>
					Swal.fire(
						'Lỗi!',
						'Có vẻ như có gì đó không đúng, thử reload lại trang và thực hiện lại nhé',
						'error',
					),
				);
		}
	});
};

export const calculatorTotal = (day, price, monthPrice) => {
	const TOTAL_DAY_IN_A_MONTH = 30;

	if (day && price) {
		if (day >= TOTAL_DAY_IN_A_MONTH && monthPrice) {
			let total = 0;

			while (day >= 30) {
				total += monthPrice;
				const newDay = day - 30;

				if (newDay < 30) {
					total += newDay * price;
				}

				day = newDay;
			}

			return total;
		} else {
			return day * price;
		}
	} else {
		return 0;
	}
};

export const convertStrToNumber = (str, valueFail) => {
	if (str) {
		if (!isNaN(Number(str))) {
			return Number(str);
		} else {
			return valueFail && 0;
		}
	}
};

export const calculatorValueChange = (
	prevVal,
	currentVal,
	isReturnPercent = true,
) => {
	if (isReturnPercent) {
		if (prevVal === 0 || currentVal === 0) {
			return (currentVal - prevVal) * 100;
		}

		if (prevVal === currentVal) {
			return 0;
		}

		return (parseFloat((currentVal - prevVal) / prevVal) * 100).toFixed(2);
	} else {
		return parseInt(currentVal - prevVal);
	}
};

export const calculatorPercent = (value, total) =>
	parseFloat((value / total) * 100).toFixed(2);

export const genrateRandomNumber = (from = 0, to) =>
	Math.floor(Math.random() * to) + from;

export const generateMessageDuplicate = field => `Key ${field} duplicate`;

export const handleSearchBasic = (input, option) =>
	option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

export const sortArrayAlphabet = (arr, key) => {
	if (!key) {
		return arr.sort((a, b) => a.localeCompare(b));
	}

	return arr.sort((a, b) => a[key].localeCompare(b[key]));
};

export const convertArrObjToArrSelect = (arr, keyContent, keyValue) => {
	if (arr && keyContent && keyValue) {
		return arr.map(item => {
			return {
				content: item[keyContent],
				value: item[keyValue],
			};
		});
	}

	return [];
};

export const dataURItoBlob = dataURI => {
	// convert base64/URLEncoded data component to raw binary data held in a string
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0)
		byteString = atob(dataURI.split(',')[1]);
	else byteString = unescape(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI
		.split(',')[0]
		.split(':')[1]
		.split(';')[0];

	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ia], { type: mimeString });
};

export const getBase64 = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
};

export const countWordInStr = (string, word) => string.split(word).length - 1;

// export const getLinkImage = path => `${API_URL}${path}`;
export const getLinkImage = path => `${path}`;

export const mapContent = content => {
	const imgTags = content.match(/<img[^>]+src="([^">]+)"/g);

	const srcRegex = /<img.*?src="(.*?)"/;

	if (imgTags) {
		imgTags.forEach(img => {
			const src = srcRegex.exec(img)[1];

			content = content?.replace(src, `${API_URL}${src}`);
		});
	}

	return content;
};

export const getYoutubeID = link => {
	if (link) {
		let videoId = link.split('v=')[1];

		if (!videoId) {
			videoId = link.split('/')[3];
		}

		var ampersandPosition = videoId.indexOf('&');
		if (ampersandPosition != -1) {
			videoId = videoId.substring(0, ampersandPosition);
		}

		return videoId;
	}
};

export const getFileNameFromUrl = link => {
	if (link) {
		const arr = link.split('/');

		return arr[arr.length - 1];
	}

	return '';
};

export const goToTop = () => {
	window.scrollTo(0, 0);
};

export const objRemovePropertyEmpty = obj => {
	const keys = Object.keys(obj);

	keys.forEach(key => (!obj[key] ? delete obj[key] : ''));

	return obj;
};

export const queryStringToObject = input => {
	return parse(input.startsWith('?') ? input.substring(1) : input);
};
