import React from 'react';
import Card from '../Card/Card';
import styles from './cardList.module.css';
import { ICardListProps } from './ICardListProps';

class CardList extends React.Component<ICardListProps> {
  constructor(props: ICardListProps) {
    super(props);
  }

  render() {
    return (
      <div role="card-list" className={styles.wrapper}>
        {this.props.cards.map((item) => (
          <Card key={item.id.toString()} item={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
