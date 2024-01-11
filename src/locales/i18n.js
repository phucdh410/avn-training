import i18n from 'i18next';
import moment from 'moment';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import LocalesEnum from 'src/enums/locales.enum';

import commonEn from './en/common.json';
import commonVi from './vi/common.json';

const resources = {
	vi: {
		common: commonVi,
	},
	en: {
		common: commonEn,
	},
};

// eslint-disable-next-line import/no-named-as-default-member
i18n
	// detect user language
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	.init({
		fallbackLng: LocalesEnum.En,
		lng: LocalesEnum.Vi, // default language
		// Set default namespace
		defaultNS: 'common',
		resources,
		interpolation: {
			format: function(value, format) {
				return moment(value).format(format);
			},
		},
	})
	.then(r => r);

export default i18n;
