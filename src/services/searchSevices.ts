import httpRequest from '../utils/httpRequest';

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
