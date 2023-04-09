import React, { FC } from 'react';
import { ICard } from '../../Interfaces/ICard';
import styles from './Card.module.css';
import noImage from '../../assets/no-image.svg';

type IProps = {
  card: ICard;
};

const CardDescription: FC<IProps> = ({ card }) => {
  const prodCompanies = card.production_companies.map((company) => {
    return (
      <div key={company?.id} className={styles.prodCompany}>
        <img
          src={company.logo_path ? `https://image.tmdb.org/t/p/w200/${company.logo_path}` : noImage}
          alt={company.name}
          title={company.name}
        />
      </div>
    );
  });
  return (
    <>
      <p>{card.overview}</p>
      <div>
        <strong>Production companies: </strong>
        <div className={styles.prodCompanies}>{prodCompanies}</div>
      </div>
      <strong>Budget: {card.budget}$</strong>
    </>
  );
};

export default CardDescription;
