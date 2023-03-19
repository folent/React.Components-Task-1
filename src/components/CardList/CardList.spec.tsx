import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import data from '../../db/data.json';
import CardList from './CardList';

describe('CardList', () => {
  test('render cards', () => {
    render(<CardList cards={data} />);

    const cards = screen.getByRole<HTMLInputElement>('card-list');
    expect(cards.children.length).toBe(data.length);
  });
});
