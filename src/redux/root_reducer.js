import { combineReducers } from 'redux';
import UserReducer from './user/user.reducer';
import TopicReducer from './topic/topic.reducer';
import CategoryReducer from './category/category.reducer';
import PostReducer from './post/post.reducer';

const rootReducer = combineReducers({
	users: UserReducer,
	topics: TopicReducer,
	categories: CategoryReducer,
	posts: PostReducer,
});

export default rootReducer;
