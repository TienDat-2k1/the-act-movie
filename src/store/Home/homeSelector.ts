import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const homeReducer = (state: RootState) => state.home;

export const homeMoviesSelector = createSelector(
  [homeReducer],
  home => home.Movies
);

export const homeMovieBanner = createSelector(
  [homeReducer],
  home => home.MovieBanner
);

export const homeTvBanner = createSelector(
  [homeReducer],
  home => home.TvBanner
);
