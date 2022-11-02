import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchResults } from '../services/searchSevices';
import { Item } from '../utils/types';

const useSearch = (type: 'movie' | 'multi' | 'tv', page: number) => {
  const location = useLocation();
  const [results, setResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setResults([]);
  }, [location.search, type]);

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) return;

    const controller = new AbortController();
    const { signal } = controller;

    setIsLoading(true);
    setIsError(false);
    getSearchResults(type, query, page, signal)
      .then(data => {
        setResults(prev => [...prev, ...data.results]);
        setHasNextPage(data.page < data.total_pages);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError(e);
        console.log('Error search');
      });
  }, [type, page, location.search]);

  return { isLoading, results, isError, error, hasNextPage };
};

export default useSearch;
