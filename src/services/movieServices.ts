import httpRequest from '../utils/httpRequest';
import { DetailInfo, IDetailMovie, Item, Video, Watch } from '../utils/types';

export const getFullMovieDetail = async (id: string) => {
  const res = await Promise.all([
    httpRequest.get(`movie/${id}`),
    httpRequest.get(`movie/${id}/similar`),
    httpRequest.get(`movie/${id}/credits`),
    httpRequest.get(`movie/${id}/videos`),
  ]);

  const data = res.reduce((acc, curr, i) => {
    switch (i) {
      case 0:
        acc.detail = { ...curr.data, media_type: 'movie' };
        break;
      case 1:
        acc.similar = curr.data.results
          .filter((_: any, i: number) => i < 8)
          .map((item: Item) => ({ ...item, media_type: 'movie' }));
        break;
      case 2:
        acc.cast = curr.data.cast.filter((_: any, i: number) => i < 10);
        break;
      case 3:
        acc.videos = curr.data.results.filter(
          (video: Video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        break;
    }
    return acc;
  }, {} as DetailInfo<IDetailMovie>);

  return data as DetailInfo<IDetailMovie>;
};

export const getMovieWatch = async (id: string): Promise<Watch> => {
  const data = (
    await Promise.all([
      httpRequest.get(`/movie/${id}`),
      httpRequest.get(`/movie/${id}/recommendations`),
    ])
  ).map(res => res.data);

  return {
    detail: { ...data[0], media_type: 'movie' },
    recommendations: data[1].results.filter(
      (result: Item) => result.poster_path
    ),
  };
};
