import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import moment from 'moment';
import LangEnum from 'src/enums/lang.enum';

export const USER_FILTER = [
	{
		name: 'Tất cả',
		value: '',
	},
	{
		name: 'Đang hoạt động',
		value: true,
	},
	{
		name: 'Đã ẩn',
		value: false,
	},
];

export const USER_SORT = {
	SORT_BY: [
		{
			content: 'Sắp xếp theo ngày tạo',
			value: 'createdAt',
		},
	],
	SORT_TYPE: [
		{
			content: 'Giảm dần',
			value: 'desc',
		},
		{
			content: 'Tăng dần',
			value: 'asc',
		},
	],
};

export const USER_COLUMS = [
	{
		title: 'Mã nhân viên',
		dataIndex: 'username',
		key: 'username',
		align: 'center',
		ellipsis: true,
		fixed: 'left',
	},
	{
		title: 'Tên',
		dataIndex: 'name',
		key: 'name',
		align: 'center',
		ellipsis: true,
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		align: 'center',
		ellipsis: true,
	},
	{
		title: 'Giới tính',
		dataIndex: 'gender',
		key: 'gender',
		align: 'center',
		render: gender => (gender ? 'Nam' : 'Nữ'),
		ellipsis: true,
	},
	// {
	// 	title: 'Loại tài khoản',
	// 	dataIndex: 'isAdmin',
	// 	key: 'isAdmin',
	// 	align: 'center',
	// 	render: isAdmin =>
	// 		isAdmin === 0
	// 			? 'Nhân viên'
	// 			: isAdmin === 1
	// 			? 'Quản trị viên'
	// 			: 'IT',
	// 	ellipsis: true,
	// },
	{
		title: 'Phòng ban',
		dataIndex: 'userId',
		key: 'userId',
		align: 'center',
		render: userInfo => userInfo?.department || '',
		ellipsis: true,
	},
	{
		title: 'Bộ phận làm việc',
		dataIndex: 'userId',
		key: 'userId',
		align: 'center',
		render: userInfo => userInfo?.section || '',
		ellipsis: true,
	},
	{
		title: 'Đơn vị',
		dataIndex: 'userId',
		key: 'userId',
		align: 'center',
		render: userInfo => userInfo?.unit || '',
		ellipsis: true,
	},
	{
		title: 'Vị trí',
		dataIndex: 'userId',
		key: 'userId',
		align: 'center',
		render: userInfo => userInfo?.position || '',
		ellipsis: true,
	},
	{
		title: 'Tình trạng',
		dataIndex: 'active',
		key: 'active',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: text =>
			text === true ? (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Đang hoạt động
				</Tag>
			) : (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Đã ẩn
				</Tag>
			),
	},
	{
		title: 'Ngôn ngữ',
		dataIndex: 'lang',
		key: 'lang',
		align: 'center',
		render: text => LangEnum[text] || LangEnum.vi,
		ellipsis: true,
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'createdAt',
		key: 'createdAt',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: text => <span>{moment(text).format('DD/MM/YYYY')}</span>,
	},
];

export const TOPIC_COLUMNS = [
	{
		title: 'Số thứ tự',
		dataIndex: 'sortOrder',
		key: 'sortOrder',
		align: 'center',
		//ellipsis: true,
		fixed: 'left',
	},
	{
		title: 'Tiêu đề',
		dataIndex: 'name',
		key: 'name',
		align: 'center',
		//ellipsis: true,
		fixed: 'left',
	},
	{
		title: 'Mô tả',
		dataIndex: 'description',
		key: 'description',
		align: 'center',
		//ellipsis: true,
	},
	{
		title: 'Tình trạng hoạt động',
		dataIndex: 'active',
		key: 'active',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: text =>
			text === true ? (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Đang hoạt động
				</Tag>
			) : (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Đã ẩn
				</Tag>
			),
	},
	{
		title: 'Tình trạng ghim',
		dataIndex: 'isPin',
		key: 'isPin',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: text =>
			text === true ? (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Đang ghim
				</Tag>
			) : (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Không ghim
				</Tag>
			),
	},
	{
		title: 'Ngôn ngữ',
		dataIndex: 'lang',
		key: 'lang',
		align: 'center',
		render: text => LangEnum[text] || LangEnum.vi,
		ellipsis: true,
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'createdAt',
		key: 'createdAt',
		align: 'center',
		ellipsis: true,
		render: text => <span>{moment(text).format('DD/MM/YYYY')}</span>,
	},
];

export const TOPIC_FILTER = [
	{
		name: 'Tất cả',
		value: '',
	},
	{
		name: 'Đang hoạt động',
		value: true,
	},
	{
		name: 'Đã ẩn',
		value: false,
	},
	{
		name: 'Đang ghim',
		value: 'isPin',
	},
];

export const TOPIC_SORT = {
	SORT_BY: [
		{
			content: 'Sắp xếp theo ngày tạo',
			value: 'createdAt',
		},
	],
	SORT_TYPE: [
		{
			content: 'Giảm dần',
			value: 'desc',
		},
		{
			content: 'Tăng dần',
			value: 'asc',
		},
	],
};

export const CATEGORY_COLUMNS = [
	{
		title: 'Số thứ tự',
		dataIndex: 'sortOrder',
		key: 'sortOrder',
		align: 'center',
		//ellipsis: true,
		fixed: 'left',
	},
	{
		title: 'Tiêu đề',
		dataIndex: 'name',
		key: 'name',
		//align: 'center',
		//ellipsis: true,
		fixed: 'left',
	},
	{
		title: 'Mô tả',
		dataIndex: 'description',
		key: 'description',
		align: 'center',
		//ellipsis: true,
	},
	{
		title: 'Tình trạng hoạt động',
		dataIndex: 'active',
		key: 'active',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: text =>
			text === true ? (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Đang hoạt động
				</Tag>
			) : (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Đã ẩn
				</Tag>
			),
	},
	{
		title: 'Ngôn ngữ',
		dataIndex: 'lang',
		key: 'lang',
		align: 'center',
		render: text => LangEnum[text] || LangEnum.vi,
		ellipsis: true,
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'createdAt',
		key: 'createdAt',
		align: 'center',
		ellipsis: true,
		render: text => <span>{moment(text).format('DD/MM/YYYY')}</span>,
	},
];

export const CATEGORY_FILTER = [
	{
		name: 'Tất cả',
		value: '',
	},
	{
		name: 'Đang hoạt động',
		value: true,
	},
	{
		name: 'Đã ẩn',
		value: false,
	},
];

export const CATEGORY_SORT = {
	SORT_BY: [
		{
			content: 'Sắp xếp theo ngày tạo',
			value: 'createdAt',
		},
	],
	SORT_TYPE: [
		{
			content: 'Giảm dần',
			value: 'desc',
		},
		{
			content: 'Tăng dần',
			value: 'asc',
		},
	],
};

export const POST_COLUMNS = [
	{
		title: 'Số thứ tự',
		dataIndex: 'sortOrder',
		key: 'sortOrder',
		align: 'center',
		//ellipsis: true,
		fixed: 'left',
	},
	{
		title: 'Tiêu đề',
		dataIndex: 'title',
		key: 'title',
		//align: 'center',
		//ellipsis: true,
		fixed: 'left',
	},
	{
		title: 'Mô tả',
		dataIndex: 'description',
		key: 'description',
		align: 'center',
		//ellipsis: true,
	},
	{
		title: 'Loại bài viết',
		dataIndex: 'type',
		key: 'type',
		align: 'center',
		ellipsis: true,
		render: text => {
			switch (text) {
				case 0:
					return 'Hình ảnh, chữ';
				case 1:
					return 'Video';
			}
		},
	},
	{
		title: 'Tình trạng hoạt động',
		dataIndex: 'active',
		key: 'active',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: text =>
			text === true ? (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Đang hoạt động
				</Tag>
			) : (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Đã ẩn
				</Tag>
			),
	},
	{
		title: 'Ngôn ngữ',
		dataIndex: 'lang',
		key: 'lang',
		align: 'center',
		render: text => LangEnum[text] || LangEnum.vi,
		ellipsis: true,
	},
	{
		title: 'Ngày tạo',
		dataIndex: 'createdAt',
		key: 'createdAt',
		align: 'center',
		ellipsis: true,
		render: text => <span>{moment(text).format('DD/MM/YYYY')}</span>,
	},
];

export const POST_FILTER = [
	{
		name: 'Tất cả',
		value: '',
	},
	{
		name: 'Đang hoạt động',
		value: true,
	},
	{
		name: 'Đã ẩn',
		value: false,
	},
];

export const POST_SORT = {
	SORT_BY: [
		{
			content: 'Sắp xếp theo ngày tạo',
			value: 'createdAt',
		},
	],
	SORT_TYPE: [
		{
			content: 'Giảm dần',
			value: 'desc',
		},
		{
			content: 'Tăng dần',
			value: 'asc',
		},
	],
};

export const USER_VIEWED_COLUMS = [
	{
		title: 'Mã nhân viên',
		dataIndex: 'account',
		key: 'account',
		align: 'center',
		ellipsis: true,
		fixed: 'left',
		render: account => account?.username,
	},
	{
		title: 'Tên',
		dataIndex: 'account',
		key: 'account',
		align: 'center',
		ellipsis: true,
		render: account => account?.name,
	},
	{
		title: 'Phòng ban',
		dataIndex: 'account',
		key: 'account',
		align: 'center',
		render: account => account?.department || '',
		ellipsis: true,
	},
	{
		title: 'Bộ phận làm việc',
		dataIndex: 'account',
		key: 'account',
		align: 'center',
		render: account => account?.section || '',
		ellipsis: true,
	},
	{
		title: 'Đơn vị',
		dataIndex: 'account',
		key: 'account',
		align: 'center',
		render: account => account?.unit || '',
		ellipsis: true,
	},
	{
		title: 'Vị trí',
		dataIndex: 'account',
		key: 'account',
		align: 'center',
		render: account => account?.position || '',
		ellipsis: true,
	},
	{
		title: 'Tình trạng xem',
		dataIndex: 'done',
		key: 'done',
		align: 'center',
		ellipsis: true,
		render: text =>
			text === true ? (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Đã xem hết
				</Tag>
			) : (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Chưa xem hết
				</Tag>
			),
	},
	{
		title: 'Tình trạng',
		dataIndex: 'account',
		key: 'account',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: account =>
			account?.active === true ? (
				<Tag icon={<CheckCircleOutlined />} color="success">
					Đang hoạt động
				</Tag>
			) : (
				<Tag icon={<CloseCircleOutlined />} color="error">
					Đã ẩn
				</Tag>
			),
	},
	{
		title: 'Ngày bắt đầu xem',
		dataIndex: 'createdAt',
		key: 'createdAt',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: text => <span>{moment(text).format('DD/MM/YYYY HH:mm')}</span>,
	},
	{
		title: 'Ngày xem hết',
		dataIndex: 'doneAt',
		key: 'doneAt',
		align: 'center',
		ellipsis: true,
		// eslint-disable-next-line react/display-name
		render: text =>
			text ? (
				<span>{moment(text).format('DD/MM/YYYY HH:mm')}</span>
			) : (
				' - '
			),
	},
];

export const USER_VIEWED_FILTER = [
	{
		name: 'Tất cả',
		value: '',
	},
	{
		name: 'Đã xem hết',
		value: true,
	},
	{
		name: 'Đã xem 1 phần ',
		value: false,
	},
];

export const USER_VIEWED_SORT = {
	SORT_BY: [
		{
			content: 'Sắp xếp theo ngày xem',
			value: 'createdAt',
		},
	],
	SORT_TYPE: [
		{
			content: 'Giảm dần',
			value: 'desc',
		},
		{
			content: 'Tăng dần',
			value: 'asc',
		},
	],
};
