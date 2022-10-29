import httpRequest from '../utils/httpRequest';
import { Item, HomeMovie } from '../utils/types';
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
      case 1:
        acc.trending = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
      case 2:
        acc.nowPlaying = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
      case 3:
        acc.popular = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
      case 4:
        acc.topRated = curr.data.results.map((result: Item) => ({
          ...result,
          media_type: 'movie',
        }));
        break;
      case 5:
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
