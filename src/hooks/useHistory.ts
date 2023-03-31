import { useEffect, useState } from 'react';
import { getMovie } from '../services/movieServices';
import { getTv } from '../services/tvServices';
import { History, Item } from '../utils/types';

const useHistory = (history: History[]) => {
  const [results, setResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    Promise.all(
      history.map(bookmark => {
        if (bookmark.type === 'movie') {
          return getMovie(bookmark.id);
        } else {
          return getTv(bookmark.id);
        }
      })
    )
      .then(data => {
        setResults(data);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError(e);
      });

    return () => controller.abort();
  }, [history]);

  return { results, isLoading, isError, error };
};
export default useHistory;
