import { ICard } from '../../Interfaces/ICard';

export type IProps = {
  onSubmit: (data: ICard) => void;
};

export type IState = {
  addToSlider: boolean;
  showMessage: boolean;
  nameEmpty: boolean;
  descEmpty: boolean;
  priceNotNumber: boolean;
  dateEmpty: boolean;
  disagreeWithRules: boolean;
};
