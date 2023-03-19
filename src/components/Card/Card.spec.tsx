import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from './Card';
import data from '../../db/data.json';

describe('Card', () => {
  test('render card with data', () => {
    render(<Card item={data[0]} />);

    const cardName = screen.getByRole<HTMLInputElement>('name');
    const cardDesc = screen.getByRole<HTMLInputElement>('desc');
    expect(cardName.textContent).toBe(data[0].name);
    expect(cardDesc.textContent).toBe(data[0].description);
  });
});
