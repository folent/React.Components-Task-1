export interface ICard {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  production_companies: ProdCompany[];
  budget: number;
}

interface ProdCompany {
  id: number;
  logo_path: string;
  name: string;
}
