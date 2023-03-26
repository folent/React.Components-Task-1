import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import NewCardPage from '../../pages/NewCardPage/NewCardPage';

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

  test('check validators', () => {
    render(<NewCardPage />);

    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeDefined();
    fireEvent.click(submitBtn);
    expect(screen.getByText('Name field should not empty').textContent).toBe(
      'Name field should not empty'
    );
    expect(screen.getByText('Description field should not empty').textContent).toBe(
      'Description field should not empty'
    );
    expect(screen.getByText('Date field should not empty').textContent).toBe(
      'Date field should not empty'
    );
  });

  test('add new card', () => {
    const card = {
      id: 6,
      name: 'jhkjkjkjkjkjkj',
      description: 'rtrttttttttttttttttrtrttttttttttttttttrtrtttttttttttttttt',
      price: 109.99,
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
    fireEvent.change(nameInput, { target: { value: card.name } });
    fireEvent.change(descTextarea, { target: { value: card.description } });
    fireEvent.change(priceInput, { target: { value: card.price } });
    fireEvent.change(dateInput, { target: { value: '2025-03-24' } });
    fireEvent.change(rulesCheckbox, { target: { checked: true } });
    fireEvent.click(submitBtn);
    expect(screen.getByText('New card has added!').textContent).toBe('New card has added!');
  });
});
