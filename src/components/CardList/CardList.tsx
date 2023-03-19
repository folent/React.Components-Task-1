import React from 'react';
import Card from '../Card/Card';
import './cardList.css';
import { ICardListProps } from './ICardListProps';

class CardList extends React.Component<ICardListProps> {
  constructor(props: ICardListProps) {
    super(props);
  }

  render() {
    return (
      <div role="card-list" className="wrapper">
        {this.props.cards.map((item) => (
          <Card key={item.id.toString()} item={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
