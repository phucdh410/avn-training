import { createSelector } from 'reselect';

export const selectUsers = state => state.users;

export const selectUsersData = createSelector([selectUsers], rs => rs.users);
