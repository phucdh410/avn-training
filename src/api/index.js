import { AuthApi } from './auth.api';
import { UserApi } from './user.api';
import { TopicApi } from './topic.api';
import { CategoryApi } from './category.api';
import { PostApi } from './post.api';
import { PostUserApi } from './post_user.api';
import { ExamApi } from './exam.api';
import { FileApi } from './file.api';
import { HomepageApi } from './homepage.api';

class api {
	static auth = new AuthApi();
	static user = new UserApi();
	static topic = new TopicApi();
	static category = new CategoryApi();
	static post = new PostApi();
	static postUser = new PostUserApi();
	static exam = new ExamApi();
	static file = new FileApi();
	static homepage = new HomepageApi();
}

export default api;
