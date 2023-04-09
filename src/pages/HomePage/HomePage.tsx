import React, { useState } from 'react';
import CardList from '../../components/CardList/CardList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { ICard } from '../../Interfaces/ICard';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import Card from '../../components/Card/Card';
import Sorting from '../../components/Sorting/Sorting';
import Loader from '../../components/Loader/Loader';

const HomePage = (): JSX.Element => {
  const [items, setItems] = useState<ICard[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [activeCard, setActiveCard] = useState<string>('');
  const [searchError, setSearchError] = useState<boolean>(false);
  const [searchTotalPages, setSearchTotalPages] = useState<number>(0);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  const [cards, loading, totalPages] = useFetchMovies<ICard[]>(`movie/${sortBy}`, page, [
    page,
    sortBy,
  ]);
  const [detailedMovie, isLoading] = useFetchMovies<ICard>(`movie/${activeCard}`, 1, [activeCard]);
  const sortItems = (value: string) => {
    setPage(1);
    setSortBy(value);
    setItems(null);
  };
  const totalCount = () => {
    const pages = items ? searchTotalPages : totalPages;
    return pages > 500 ? 500 : pages;
  };

  return (
    <div className="wrapper">
      <h2>Home page</h2>
      {searchPage} {searchTotalPages}
      <SearchBox
        items={items}
        setItems={setItems}
        setTotalPages={setSearchTotalPages}
        setError={() => setSearchError}
        page={searchPage}
        setIsLoading={setIsSearchLoading}
      />
      {(loading || isSearchLoading) && <Loader />}
      {searchError}
      <Sorting setSortBy={sortItems} sortBy={sortBy} />
      {(items || cards) && <CardList cards={items || cards} setActiveCard={setActiveCard} />}
      <Pagination
        currentPage={items ? searchPage : page}
        totalCount={totalCount()}
        onChange={items ? setSearchPage : setPage}
      />
      {activeCard && (
        <Modal onClose={() => setActiveCard('')}>
          {isLoading && <Loader />}
          {detailedMovie && <Card item={detailedMovie} isDetailed={true} />}
        </Modal>
      )}
    </div>
  );
};
export default HomePage;
