import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const userReducer = (state: RootState) => state.user;

export const isLoggedSelector = createSelector(
  [userReducer],
  user => user.isLogged
);

export const userSelector = createSelector([userReducer], user => user.user);

export const bookmarksSelector = createSelector(
  [userReducer],
  user => user.user.bookmarks
);

export const historySelector = createSelector(
  [userReducer],
  user => user.user.history
);
