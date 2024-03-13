import { createSelector } from 'reselect';

export const selectPosts = state => state.posts;

export const selectPostsData = createSelector([selectPosts], rs => rs.posts);
