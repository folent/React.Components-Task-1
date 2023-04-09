import { ICard } from '../../Interfaces/ICard';

export interface ICardListProps {
  cards: ICard[] | null;
  setActiveCard?: (id: string) => void;
}
