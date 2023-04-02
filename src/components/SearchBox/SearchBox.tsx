import React, { useEffect, useRef, useState } from 'react';
import './SearchBox.css';

const LAST_SEARCH_VALUE = 'last_search_value';

const SearchBox: React.FC = (): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const lastSearchValue = localStorage.getItem(LAST_SEARCH_VALUE);
    const searchRef: HTMLInputElement | null = search.current;

    if (lastSearchValue) {
      setQuery(lastSearchValue);
    }
    return () => {
      setLocalStorageValue(LAST_SEARCH_VALUE, searchRef?.value || '');
    };
  }, []);

  const setLocalStorageValue = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  };

  return (
    <>
      <input
        type="search"
        className="search"
        value={query}
        ref={search}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default SearchBox;
