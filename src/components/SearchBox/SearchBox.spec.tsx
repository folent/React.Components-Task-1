import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  test('saving value to localstorage', () => {
    const testValue = Math.random().toString();
    const { unmount } = render(<SearchBox />);

    const search = screen.getByRole<HTMLInputElement>('searchbox');
    fireEvent.change(search, { target: { value: testValue } });
    unmount();
    expect(localStorage.getItem('last_search')).toBe(testValue);

    render(<SearchBox />);
    const newSearch = screen.getByRole<HTMLInputElement>('searchbox');
    expect(newSearch.value).toBe(testValue);
  });
});
