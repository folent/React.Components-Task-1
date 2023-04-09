import React from 'react';
import Card from '../Card/Card';
import styles from './CardList.module.css';
import { ICardListProps } from './ICardListProps';

const CardList = ({ cards, setActiveCard }: ICardListProps) => {
  return (
    <div className={styles.wrapper}>
      <div role="card-list" className={styles.cardList}>
        {cards &&
          cards.map((item) => (
            <Card key={item.id.toString()} item={item} setActiveCard={setActiveCard} />
          ))}
      </div>
    </div>
  );
};

export default CardList;
