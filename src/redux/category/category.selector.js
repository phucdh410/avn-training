import { createSelector } from 'reselect';

export const selectCategories = state => state.categories;

export const selectCategoriesData = createSelector(
	[selectCategories],
	rs => rs.categories,
);
