import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { PreloadContext } from 'src/contexts/preload.context';
import { LoadingContext } from 'src/contexts/loading.context';
import { UserContext } from 'src/contexts/user.context';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { ROUTE_ADMIN, ROUTE_CLIENT, ROUTE_IT } from 'src/configs/route.config';
import { CPreload } from 'src/commons';
import {
	AdminAuth,
	Login,
	Dashboard,
	UserList,
	ImportUser,
	ChangePassword,
	TopicList,
	CategoryList,
	ListTopic,
	Homepage,
	ListCategory,
	CategoryDetail,
	PostList,
	PinTopicPage,
	PostDetail,
	UserViewedList,
	PostDetailClient,
	PostDetailVideo,
	Page404,
	HomepageConfig,
	ITAuth,
	AzureConfig,
} from 'src/modules';
import { UserAuth } from 'src/modules/login/components';
import { ACCOUNT_TYPE } from './configs/constant.config';
import { LoginAzurePage } from './modules/login/LoginAzurePage';

LoadingOverlay.propTypes = undefined;

export default function App() {
	const [userContext, setUserContext] = useState('');
	const [preLoadingContext, setPreLoadingContext] = useState(false);
	const [loadingOverlay, setLoadingOverlay] = useState(false);
	const location = useLocation();

	return (
		<div className="_app">
			{preLoadingContext ? (
				<CPreload />
			) : (
				<PreloadContext.Provider
					value={[preLoadingContext, setPreLoadingContext]}
				>
					<LoadingContext.Provider
						value={[loadingOverlay, setLoadingOverlay]}
					>
						<LoadingOverlay
							active={loadingOverlay}
							spinner
							text={MESSAGE_FEEDBACK.COMMON.BLOCK_ACTION}
						>
							<UserContext.Provider
								value={[userContext, setUserContext]}
							>
								<Switch>
									<Route
										exact
										path={ROUTE_ADMIN.AUTH.LOGIN}
										component={Login}
									/>
									<Route
										exact
										path={ROUTE_ADMIN.AUTH.LOGIN_AZURE}
										component={LoginAzurePage}
									/>
									<UserAuth>
										<Switch>
											<Route
												exact
												path={ROUTE_CLIENT.HOMEPAGE}
												component={Homepage}
											/>
											<Route
												exact
												path={ROUTE_CLIENT.TOPIC.BASE}
												component={ListTopic}
											/>
											<Route
												exact
												path={ROUTE_CLIENT.TOPIC.PIN}
												component={PinTopicPage}
											/>
											<Route
												exact
												path={`${ROUTE_CLIENT.TOPIC.BASE}/:slug`}
												component={ListCategory}
											/>
											<Route
												exact
												path={`${ROUTE_CLIENT.CATEGORY.BASE}/:slug`}
												component={CategoryDetail}
											/>
											<Route
												exact
												path={`${ROUTE_CLIENT.POST.BASE}/text/:slug`}
												component={PostDetailClient}
											/>
											<Route
												exact
												path={`${ROUTE_CLIENT.POST.BASE}/video/:slug`}
												component={PostDetailVideo}
											/>

											{userContext?.group ===
												ACCOUNT_TYPE.ADMIN &&
											location?.pathname.startsWith(
												ROUTE_ADMIN.DASHBOARD,
											) ? (
												<AdminAuth>
													<Route
														exact
														path={
															ROUTE_ADMIN.DASHBOARD
														}
														component={Dashboard}
													/>
													<Route
														exact
														path={`${ROUTE_ADMIN.ACCOUNT.BASE}${ROUTE_ADMIN.ACCOUNT.LIST}`}
														component={UserList}
													/>
													<Route
														exact
														path={`${ROUTE_ADMIN.ACCOUNT.BASE}${ROUTE_ADMIN.ACCOUNT.IMPORT}`}
														component={ImportUser}
													/>
													<Route
														path={`${ROUTE_ADMIN.ACCOUNT.BASE}${ROUTE_ADMIN.ACCOUNT.CHANGE_PASSWORD}`}
														component={
															ChangePassword
														}
													/>
													<Route
														path={`${ROUTE_ADMIN.TOPIC.BASE}${ROUTE_ADMIN.TOPIC.LIST}`}
														component={TopicList}
													/>
													<Route
														path={`${ROUTE_ADMIN.TOPIC.BASE}${ROUTE_ADMIN.TOPIC.CATEGORY}`}
														component={CategoryList}
													/>
													<Route
														path={`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.LIST}`}
														component={PostList}
													/>
													<Route
														path={`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.CREATE}`}
														component={PostDetail}
													/>
													<Route
														path={`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.EDIT}/:id`}
														component={PostDetail}
													/>
													<Route
														path={`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.USER_VIEWED}/:id`}
														component={
															UserViewedList
														}
													/>
													<Route
														path={`${ROUTE_ADMIN.PAGE_CONFIG.BASE}${ROUTE_ADMIN.PAGE_CONFIG.HOMEPAGE}`}
														component={
															HomepageConfig
														}
													/>
												</AdminAuth>
											) : (
												''
											)}
											{userContext?.group === 'it' &&
											location?.pathname.startsWith(
												'/it',
											) ? (
												<ITAuth>
													<Route
														exact
														path={`${ROUTE_IT.BASE}${ROUTE_IT.AZURE_CONFIG}`}
														component={AzureConfig}
													/>
												</ITAuth>
											) : (
												''
											)}
											<Route component={Page404} />
										</Switch>
									</UserAuth>
									<Route component={Page404} />
								</Switch>
							</UserContext.Provider>
						</LoadingOverlay>
					</LoadingContext.Provider>
				</PreloadContext.Provider>
			)}
		</div>
	);
}
