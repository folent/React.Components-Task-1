export interface ICard {
  id: number;
  name: string;
  description: string;
  price: number;
  createDate: string;
  category: string;
  addToSlider: boolean;
  image: string | null;
}
