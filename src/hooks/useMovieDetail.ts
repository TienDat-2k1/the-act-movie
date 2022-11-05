import { useState, useEffect } from 'react';
import { getFullMovieDetail } from '../services/movieServices';
import { DetailInfo, IDetailMovie } from '../utils/types';

const useMovieDetail = (id: string | undefined) => {
  const [data, setData] = useState<DetailInfo<IDetailMovie>>(
    {} as DetailInfo<IDetailMovie>
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getFullMovieDetail(id)
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        setIsError(true);
        setError(e);
      });
  }, [id]);

  return { data, isError, isLoading, error };
};

export default useMovieDetail;
