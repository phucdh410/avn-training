import {
	BarChartOutlined,
	FileTextOutlined,
	FileSearchOutlined,
	FileAddOutlined,
	UserOutlined,
	// EditOutlined,
	PropertySafetyOutlined,
	MoneyCollectOutlined,
	AccountBookOutlined,
	SettingOutlined,
	HomeOutlined,
	SafetyOutlined,
} from '@ant-design/icons';
import { ROUTE_ADMIN } from 'src/configs/route.config';

export const SIDEBAR_MENU = [
	{
		title: 'Quản lý số liệu',
		icon: <BarChartOutlined />,
		href: '/admin',
	},
	{
		title: 'Quản lý tài khoản',
		icon: <UserOutlined />,
		href: ROUTE_ADMIN.ACCOUNT.BASE,
		sub: [
			{
				title: 'Danh sách tài khoản',
				href: ROUTE_ADMIN.ACCOUNT.LIST,
				icon: <UserOutlined />,
			},
			// {
			// 	title: 'Import tài khoản',
			// 	href: ROUTE_ADMIN.ACCOUNT.IMPORT,
			// 	icon: <EditOutlined />,
			// },
			// {
			// 	title: 'Thông tin tài khoản',
			// 	href: ROUTE_ADMIN.ACCOUNT.PROFILE,
			// 	icon: <UserOutlined />,
			// },
			// {
			// 	title: 'Đổi mật khẩu',
			// 	href: ROUTE_ADMIN.ACCOUNT.CHANGE_PASSWORD,
			// 	icon: <EditOutlined />,
			// },
		],
	},
	{
		title: 'Quản lý chủ đề',
		icon: <FileTextOutlined />,
		href: ROUTE_ADMIN.TOPIC.BASE,
		sub: [
			{
				title: 'Danh sách chủ đề',
				href: ROUTE_ADMIN.TOPIC.LIST,
				icon: <FileSearchOutlined />,
			},
			{
				title: 'Danh sách loại chủ đề',
				href: ROUTE_ADMIN.TOPIC.CATEGORY,
				icon: <FileAddOutlined />,
			},
		],
	},
	{
		title: 'Quản lý bài viết',
		icon: <AccountBookOutlined />,
		href: ROUTE_ADMIN.POST.BASE,
		sub: [
			{
				title: 'Danh sách bài viết',
				href: ROUTE_ADMIN.POST.LIST,
				icon: <PropertySafetyOutlined />,
			},
			{
				title: 'Thêm bài viết mới',
				href: ROUTE_ADMIN.POST.CREATE,
				icon: <MoneyCollectOutlined />,
			},
		],
	},
	{
		title: 'Cấu hình trang web',
		icon: <SettingOutlined />,
		href: ROUTE_ADMIN.PAGE_CONFIG.BASE,
		sub: [
			{
				title: 'Trang chủ',
				href: ROUTE_ADMIN.PAGE_CONFIG.HOMEPAGE,
				icon: <HomeOutlined />,
			},
		],
	},
];

export const SIDEBAR_IT = [
	{
		title: 'Cấu hình Azure',
		icon: <SafetyOutlined />,
		href: '/it/azure-config',
	},
];

export const DASHBOARD_CHART_LABELS = [
	'Thứ 2',
	'Thứ 3',
	'Thứ 4',
	'Thứ 5',
	'Thứ 6',
	'Thứ 7',
	'Chủ Nhật',
];

export const DASHBOARD_CARD = [
	{
		title: 'Truy cập',
		number: 321,
		description: 'So với 1 ngày trước',
		percent: 21,
		arrow: 'down',
		icon: 'fas fa-network-wired',
		iconColor: 'bg-pink-500',
	},
	{
		title: 'Lợi nhuận',
		number: 120.123,
		description: 'So với 1 ngày trước',
		percent: 5,
		icon: 'fas fa-dollar-sign',
		iconColor: 'bg-yellow-500',
	},
	{
		title: 'Người dùng mới',
		number: 2,
		description: 'So với 1 ngày trước',
		percent: 50,
		icon: 'fas fa-user-plus',
		iconColor: 'bg-blue-500',
	},
];

export const POST_STATUS = {
	UNVERIFIED: 'unverified',
	VERIFIED: 'verified',
	ACTIVE: 'active',
	EXPIRED: 'expired',
	CLOSED: 'closed',
	REJECT: 'reject',
	COMPLETE: 'complete',
	PENDING: 'pending',
};

export const POST_DETAIL_MODE = {
	CREATE: 'create',
	VIEW: 'view',
	UPDATE: 'update',
};

export const SLICK_SETTING = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 2,
	slidesToScroll: 2,
	mobileFirst: true,
	responsive: [
		{
			breakpoint: 1500,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 800,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};
