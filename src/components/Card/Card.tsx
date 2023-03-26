import React from 'react';
import { ICard } from '../../Interfaces/ICard';
import './card.css';
import noImage from '../../assets/no-image.svg';
import categories from '../../db/categories.json';

interface IProps {
  item: ICard;
}

class Card extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  getNameCategory(id: string | undefined) {
    if (!id) return;
    return categories.find((c) => c.id.toString() === id)?.name;
  }

  render() {
    const card = this.props.item;
    return (
      <div className="card">
        <div>
          <img src={card.image ?? noImage} alt="No image" />
        </div>
        <div role="name">{card.name}</div>
        <p role="desc">{card.description}</p>
        <div>{this.getNameCategory(card.category)}</div>
        <div>{card.createDate}</div>
        <strong>{card.price}</strong>
      </div>
    );
  }
}
export default Card;
