import httpRequest from '../utils/httpRequest';
import { IGenre, Item, PerPage } from '../utils/types';

export const getDiscoveryMovie: (
  page: number,
  config?: { [key: string]: string | number },
  signal?: AbortSignal
) => Promise<PerPage> = async (page, config = {}, signal = undefined) => {
  const res = await httpRequest.get('/discover/movie', {
    params: { ...config, page },
    signal,
  });

  const modifyItems = res.data.results
    .filter((item: Item) => item.poster_path)
    .map((item: Item) => ({ ...item, media_type: 'movie' }));

  return { ...res.data, results: modifyItems };
};

export const getDiscoveryTv: (
  page: number,
  config?: { [key: string]: string | number },
  signal?: AbortSignal
) => Promise<PerPage> = async (page, config = {}, signal = undefined) => {
  const res = await httpRequest.get('/discover/tv', {
    params: { ...config, page },
    signal,
  });

  const modifyItems = res.data.results
    .filter((item: Item) => item.poster_path)
    .map((item: Item) => ({ ...item, media_type: 'tv' }));

  return { ...res.data, results: modifyItems };
};

export const getGenres = async (type: string) => {
  const res = await httpRequest.get(`/genre/${type}/list`);

  return res.data.genres as IGenre[];
};
