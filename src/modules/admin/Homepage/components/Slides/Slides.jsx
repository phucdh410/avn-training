import './Slides.scss';
import { Tabs } from 'antd';
import { CInputAdmin, CUploadImage, CNumberInput } from 'src/commons';
import { FORM_RULES } from 'src/utils/validator.util';
import PropTypes from 'prop-types';
import { API_URL } from 'src/configs/constant.config';
import { getFileNameFromUrl, getLinkImage } from 'src/utils/function.util';

const { TabPane } = Tabs;

export const Slides = ({
	onChange,
	slides,
	onAddRemoveTab,
	onChangeTabContent,
	currentTab,
}) => {
	const renderImage = pane => {
		if (pane?.file?._id) {
			return [
				{
					uid: pane?.file?._id,
					name: getFileNameFromUrl(pane?.file?.path),
					status: 'done',
					url: getLinkImage(pane?.file?.path),
				},
			];
		} else {
			return pane?.file?.fileList;
		}
	};

	return (
		<div className="slider-config">
			<h1 className="form-title">Slides</h1>
			<div>
				<Tabs
					//key={Date.now()}
					type="editable-card"
					onEdit={onAddRemoveTab}
					onChange={onChange}
					activeKey={currentTab}
					destroyInactiveTabPane={true}
				>
					{slides &&
						slides.map((pane, index) => (
							<TabPane
								closable={!(slides.length === 1 && index === 0)}
								tab={`Slide ${index + 1}`}
								key={pane.key}
							>
								<CInputAdmin
									label="Tiêu đề"
									type="textarea"
									name="title"
									rules={
										FORM_RULES.HOMEPAGE.SLIDE_IMAGE_REQUIRED
									}
									onChange={e =>
										onChangeTabContent(
											'title',
											e.target.value,
										)
									}
								/>
								<CInputAdmin
									label="Mô tả"
									type="textarea"
									name="description"
									onChange={e =>
										onChangeTabContent(
											'description',
											e.target.value,
										)
									}
								/>
								<CNumberInput
									label="Thứ tự của ảnh nền"
									name="sortOrder"
									onChange={value =>
										onChangeTabContent('sortOrder', value)
									}
								/>
								<CUploadImage
									uploadUrl={`${API_URL}/api/files/upload`}
									label="Ảnh nền"
									name="file"
									rules={
										FORM_RULES.HOMEPAGE.SLIDE_IMAGE_REQUIRED
									}
									onChange={value =>
										onChangeTabContent('file', value)
									}
									data={{ sourceType: 3 }}
									defaultFiles={renderImage(pane)}
								/>
							</TabPane>
						))}
				</Tabs>
			</div>
		</div>
	);
};

Slides.propTypes = {
	onChange: PropTypes.func,
	slides: PropTypes.array,
	onAddRemoveTab: PropTypes.func,
	onChangeTabContent: PropTypes.func,
	currentTab: PropTypes.string,
	detail: PropTypes.any,
};
