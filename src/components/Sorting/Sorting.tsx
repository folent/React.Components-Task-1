import React, { FC } from 'react';
import styles from './Sorting.module.css';

const sorts = [
  {
    name: 'Get Popular',
    value: 'popular',
  },
  {
    name: 'Get Now Playing',
    value: 'now_playing',
  },
  {
    name: 'Get Top Rated',
    value: 'top_rated',
  },
  {
    name: 'Get Upcoming',
    value: 'upcoming',
  },
];

type IProps = {
  setSortBy: (value: string) => void;
  sortBy: string;
};

const Sorting: FC<IProps> = ({ setSortBy, sortBy }) => {
  const options = sorts.map((item) => {
    return (
      <option key={item.value} value={item.value}>
        {item.name}
      </option>
    );
  });
  return (
    <div className={styles.sorting}>
      <label>
        Sort by:{' '}
        <select onChange={(e) => setSortBy(e.target.value)} defaultValue={sortBy}>
          {options}
        </select>
      </label>
    </div>
  );
};

export default Sorting;
