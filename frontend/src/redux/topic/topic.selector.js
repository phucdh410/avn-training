import { createSelector } from 'reselect';

export const selectTopics = state => state.topics;

export const selectTopicsData = createSelector([selectTopics], rs => rs.topics);

export const selectNormalTopicsData = createSelector(
	[selectTopics],
	rs => rs.normalTopics,
);
