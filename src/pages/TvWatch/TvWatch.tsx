import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Watch from '../../components/Watch/Watch';
import { getWatchTv } from '../../services/tvServices';
import { Watch as WatchType } from '../../utils/types';

const TvWatch = () => {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<WatchType>();
  const [watch, setWatch] = useState<{
    season: number | string;
    episode: number | string;
  }>({
    season: 0,
    episode: 1,
  });

  useEffect(() => {
    if (!id) return;
    getWatchTv(+id)
      .then(data => {
        setData(data);
      })
      .catch(e => console.log(e));
  }, [id]);

  useEffect(() => {
    const season = searchParams.get('season') || 0;
    const episode = searchParams.get('episode') || 1;

    setWatch({ season, episode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <>
      <Watch data={data} watch={watch} />
    </>
  );
};
export default TvWatch;
