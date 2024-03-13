import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root_reducer';
import logger from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
	middlewares.push(logger);
}

const store = createStore(
	rootReducer,
	compose(applyMiddleware(...middlewares)),
);

export { store };
