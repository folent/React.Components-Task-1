import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import NewCardPage from '../../pages/NewCardPage/NewCardPage';
import userEvent from '@testing-library/user-event';

describe('NewCardPage', () => {
  test('render page', () => {
    render(<NewCardPage />);

    expect(screen.getByText('Add new card').textContent).toBe('Add new card');
    const cards = screen.getByRole<HTMLInputElement>('card-list');
    expect(cards.children.length).toBe(0);
    const form = screen.getByRole<HTMLFormElement>('Add-card-form');
    expect(form).toBeDefined();
  });

  test('click on submit button', () => {
    render(<NewCardPage />);

    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeDefined();
    fireEvent.click(submitBtn);
  });

  test('check validators', async () => {
    render(<NewCardPage />);

    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeDefined();
    await userEvent.click(submitBtn);
    expect(await screen.getByText('Name field should not empty').textContent).toBe(
      'Name field should not empty'
    );
    expect(screen.getByText('Description field should not empty').textContent).toBe(
      'Description field should not empty'
    );
    expect(screen.getByText('Date field should not empty').textContent).toBe(
      'Date field should not empty'
    );
  });

  test('add new card', async () => {
    const card = {
      id: 6,
      name: 'jhkjkjkjkjkjkj',
      description: 'rtrttttttttttttttttrtrttttttttttttttttrtrtttttttttttttttt',
      price: '109.99',
      createDate: '02/05/2021',
      category: '2',
      addToSlider: true,
      image: null,
    };
    render(<NewCardPage />);

    const nameInput = screen.getByTestId('name-input');
    const descTextarea = screen.getByTestId('desc-textarea');
    const priceInput = screen.getByTestId('price-input');
    const dateInput = screen.getByTestId('date-input');
    const rulesCheckbox = screen.getByTestId('rules-checkbox');
    const submitBtn = screen.getByTestId('submit-btn');
    await userEvent.type(nameInput, card.name);
    await userEvent.type(descTextarea, card.description);
    await userEvent.type(priceInput, card.price);
    await userEvent.type(dateInput, '2025-03-24');
    await userEvent.click(rulesCheckbox);
    await userEvent.click(submitBtn);
    expect(screen.getByText('New card has added!').textContent).toBe('New card has added!');
  });
});
