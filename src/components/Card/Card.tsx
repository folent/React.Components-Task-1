import React from 'react';
import { ICard } from '../../Interfaces/ICard';
import './card.css';
import noImage from '../../assets/no-image.svg';

interface IProps {
  item: ICard;
}

class Card extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div>
          <img src={noImage} alt="No image" />
        </div>
        <div role="name">{this.props.item.name}</div>
        <p role="desc">{this.props.item.description}</p>
        <div>{this.props.item.count}</div>
        <strong>{this.props.item.price}</strong>
      </div>
    );
  }
}
export default Card;
