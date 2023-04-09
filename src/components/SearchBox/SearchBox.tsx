import React, { useCallback, useEffect, useRef } from 'react';
import styles from './SearchBox.module.css';
import { ICard } from '../../Interfaces/ICard';

const LAST_SEARCH_VALUE = 'last_search_value';

type IProps = {
  setItems: (data: ICard[] | null) => void;
  setTotalPages: (count: number) => void;
  page: number;
  items: ICard[] | null;
  setIsLoading: (value: boolean) => void;
  setError: (value: string) => void;
};

const SearchBox: React.FC<IProps> = ({
  setItems,
  setTotalPages,
  page,
  items,
  setIsLoading,
  setError,
}): JSX.Element => {
  const search = useRef<HTMLInputElement>(null);
  const fetchData = useCallback(() => {
    setIsLoading(true);
    setItems(null);
    setError('');
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search?.current?.value}&page=${page}&api_key=e54a7f998181dcf932fafadbda9825fb`
    )
      .then((result) => result.json())
      .then((data) => {
        if (data.results.length) {
          setItems(data.results);
          setTotalPages(data.total_pages);
        } else {
          setTotalPages(0);
        }
      })
      .catch(() => setError('Data is not found'))
      .finally(() => setIsLoading(false));
  }, [page, setError, setIsLoading, setItems, setTotalPages]);

  useEffect(() => {
    const lastSearchValue = localStorage.getItem(LAST_SEARCH_VALUE);
    const searchRef: HTMLInputElement | null = search.current;

    if (lastSearchValue && search.current) {
      search.current.value = lastSearchValue;
    }
    return () => {
      setLocalStorageValue(LAST_SEARCH_VALUE, searchRef?.value || '');
    };
  }, []);
  useEffect(() => {
    if (items) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  const setLocalStorageValue = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  };

  return (
    <div className={styles.searchForm}>
      <form onSubmit={onSubmit}>
        <input type="search" className={styles.search} ref={search} placeholder={'Search'} />
      </form>
    </div>
  );
};

export default SearchBox;
