import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const homeReducer = (state: RootState) => state.home;

export const homeMoviesSelector = createSelector([homeReducer], home => {
  const { trending, ...sections } = home.Movies;
  return sections;
});

export const homeTvSectionSelector = createSelector([homeReducer], home => {
  const { trending, ...sections } = home.Tv;
  return sections;
});

export const homeMovieBanner = createSelector(
  [homeReducer],
  home => home.MovieBanner
);

export const homeTvBanner = createSelector(
  [homeReducer],
  home => home.TvBanner
);
