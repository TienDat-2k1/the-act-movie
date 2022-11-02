import httpRequest from '../utils/httpRequest';
import { Item, PerPage } from '../utils/types';

export const getSearchWithKeyword = async (
  query: string
): Promise<string[]> => {
  const res = await httpRequest.get('/search/keyword', {
    params: { query },
  });

  const data = res.data.results
    .map((result: any) => result.name)
    .filter((_: any, i: number) => i < 5);

  return data;
};

export const getSearchResults: (
  type: 'movie' | 'multi' | 'tv',
  query: string,
  page: number,
  signal?: AbortSignal
) => Promise<PerPage> = async (type, query, page) => {
  const res = await httpRequest.get(`/search/${type}`, {
    params: {
      query,
      page,
    },
  });

  const data = res.data;

  const results = data.results
    .map((result: Item) => {
      return { ...result, ...(type !== 'multi' && { media_type: type }) };
    })
    .filter((result: Item) => result.media_type !== 'person')
    .filter((result: Item) => result.poster_path);

  return {
    ...data,
    results,
  };
};
