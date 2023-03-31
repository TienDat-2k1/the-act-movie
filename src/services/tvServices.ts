import httpRequest from '../utils/httpRequest';
import { DetailInfo, IDetailTv, Item, Video, Watch } from '../utils/types';

export const getFullTvDetail = async (id: string) => {
  const res = await Promise.all([
    httpRequest.get(`/tv/${id}`),
    httpRequest.get(`/tv/${id}/similar`),
    httpRequest.get(`/tv/${id}/credits`),
    httpRequest.get(`/tv/${id}/videos`),
  ]);

  const data = res.reduce((acc, curr, i) => {
    switch (i) {
      case 0:
        acc.detail = { ...curr.data, media_type: 'tv' };
        break;
      case 1:
        acc.similar = curr.data.results
          .filter((_: any, i: number) => i < 8)
          .map((item: Item) => ({ ...item, media_type: 'tv' }));
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
  }, {} as DetailInfo<IDetailTv>);

  return data;
};

export const getTv = async (id: number) => {
  const res = await httpRequest.get(`/tv/${id}`);

  const data = { ...res.data, media_type: 'tv' } as Item;

  return data;
};

export const getWatchTv = async (id: number): Promise<Watch> => {
  const res = await Promise.all([
    httpRequest.get(`/tv/${id}`),
    httpRequest.get(`/tv/${id}/recommendations`),
  ]);

  const data = {
    detail: { ...res[0].data, media_type: 'tv' },
    recommendations: res[1].data,
  };

  const detailSeasons = (
    await Promise.all(
      (data.detail as IDetailTv).seasons.map(season =>
        httpRequest.get(`/tv/${id}/season/${season.season_number}`)
      )
    )
  ).map(res => res.data);

  return { ...data, detailSeasons };
};
