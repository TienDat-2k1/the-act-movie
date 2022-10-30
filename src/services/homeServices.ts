import httpRequest from '../utils/httpRequest';
import {
  Item,
  HomeMovie,
  IDetailMovie,
  HomeTv,
  IDetailTv,
} from '../utils/types';

export const getHomeMoviesData = async () => {
  const res = await Promise.all([
    httpRequest.get('/trending/movie/day'),
    httpRequest.get('/movie/now_playing'),
    httpRequest.get('/movie/popular'),
    httpRequest.get('/movie/top_rated'),
    httpRequest.get('/movie/upcoming'),
  ]);

  const data = res.reduce((acc, curr, i) => {
    switch (i) {
      case 0:
        acc.trending = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
      case 1:
        acc.now_Playing = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
      case 2:
        acc.popular = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
      case 3:
        acc.top_Rated = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
      case 4:
        acc.upcoming = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
    }

    return acc;
  }, {} as HomeMovie);

  return data;
};

export const getBannerMovieInfo = async (items: Item[]) => {
  const res = await Promise.all(
    items.map(item => httpRequest.get(`/movie/${item.id}`))
  );

  const data = res.map(r => {
    return { ...r.data, media_type: 'movie' } as IDetailMovie;
  });

  return data;
};

export const getHomeTvData = async () => {
  const res = await Promise.all([
    httpRequest.get('/trending/tv/day'),
    httpRequest.get('/tv/airing_today'),
    httpRequest.get('/tv/on_the_air'),
    httpRequest.get('/tv/popular'),
    httpRequest.get('/tv/top_rated'),
  ]);

  const data = res.reduce((acc, curr, i) => {
    switch (i) {
      case 0:
        acc.trending = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'tv',
        }));
        break;
      case 1:
        acc.airing_Today = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'tv',
        }));
        break;
      case 2:
        acc.on_The_Air = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'tv',
        }));
        break;
      case 3:
        acc.popular = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'tv',
        }));
        break;
      case 4:
        acc.top_Rated = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'tv',
        }));
        break;
    }
    return acc;
  }, {} as HomeTv);

  return data;
};

export const getBannerTvInfo = async (items: Item[]) => {
  const res = await Promise.all(
    items.map(item => httpRequest.get(`/tv/${item.id}`))
  );

  const data = res.map(r => {
    return { ...r.data, media_type: 'tv' } as IDetailTv;
  });

  return data;
};
