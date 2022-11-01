import { useState, useEffect } from 'react';
import { getDiscoveryTv } from '../services/discoveryServices';
import { IConfig, Item } from '../utils/types';

const useDataTv = (page: number, config: IConfig) => {
  const [results, setResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setResults([]);
  }, [config]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getDiscoveryTv(page, config, signal)
      .then(data => {
        setResults(prev => [...prev, ...data.results]);
        setHasNextPage(Boolean(data.page < data.total_pages));
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError(e);
      });

    return () => controller.abort();
  }, [page, config]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useDataTv;
