import { useState, useEffect } from 'react';
import { getFullTvDetail } from '../services/tvServices';
import { DetailInfo, IDetailTv } from '../utils/types';

const useTvDetail = (id: string | undefined) => {
  const [data, setData] = useState<DetailInfo<IDetailTv>>(
    {} as DetailInfo<IDetailTv>
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getFullTvDetail(id)
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

export default useTvDetail;
