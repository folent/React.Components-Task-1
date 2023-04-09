import React from 'react';
import { ICard } from '../../Interfaces/ICard';
import styles from './Card.module.css';
import noImage from '../../assets/no-image.svg';
import CardDescription from './CardDescription';

interface IProps {
  item: ICard;
  setActiveCard?: (id: string) => void;
  isDetailed?: boolean;
}

class Card extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const card = this.props.item;
    const isDetailed = this.props.isDetailed;
    const setActiveCard = this.props.setActiveCard;
    return (
      <div
        className={styles.card}
        onClick={() => (setActiveCard ? setActiveCard(String(card.id)) : null)}
      >
        <div>
          <img
            src={card.poster_path ? `https://image.tmdb.org/t/p/w500/${card.poster_path}` : noImage}
            alt="No image"
          />
        </div>
        <div role="name">{card.title}</div>
        <div>Release Date: {card.release_date}</div>
        <strong>Rating: {card.vote_average} &#9733;</strong>
        {isDetailed && <CardDescription card={card} />}
      </div>
    );
  }
}
export default Card;
