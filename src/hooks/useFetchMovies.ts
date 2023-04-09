import { DependencyList, useEffect, useState } from 'react';

export const useFetchMovies = <T>(
  url: string,
  page: number,
  deps: DependencyList
): [data: T | null, loading: boolean, totalPages: number, error: string] => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (url === 'movie/') {
      setData(null);
      return;
    }
    setLoading(true);
    setError('');
    setData(null);
    fetch(
      `https://api.themoviedb.org/3/${url}?page=${page}&api_key=e54a7f998181dcf932fafadbda9825fb`
    )
      .then((result) => result.json())
      .then((data) => {
        setData(data.results || data);
        setTotalPages(data.total_pages);
      })
      .catch(() => {
        setError('Data is not found');
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [data, loading, totalPages, error];
};
