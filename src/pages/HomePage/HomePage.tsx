import React, { useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import cards from '../../db/data.json';
import SearchBox from '../../components/SearchBox/SearchBox';
import { ICard } from '../../Interfaces/ICard';

const HomePage = (): JSX.Element => {
  const [items, setItems] = useState<ICard[]>([]);
  useEffect(() => {
    setItems(cards);
  }, []);

  return (
    <>
      <h2>Home page</h2>
      <SearchBox />
      <CardList cards={items} />
    </>
  );
};
export default HomePage;
