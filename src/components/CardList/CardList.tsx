import React from 'react';
import Card from '../Card/Card';
import styles from './cardList.module.css';
import { ICardListProps } from './ICardListProps';

const CardList = ({ cards }: ICardListProps) => {
  return (
    <div role="card-list" className={styles.wrapper}>
      {cards.map((item) => (
        <Card key={item.id.toString()} item={item} />
      ))}
    </div>
  );
};

export default CardList;
