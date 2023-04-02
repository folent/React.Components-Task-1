import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SearchBox from './SearchBox';

const LAST_SEARCH_VALUE = 'last_search_value';

describe('SearchBox', () => {
  test('saving value to localstorage', () => {
    const testValue = Math.random().toString();
    const { unmount } = render(<SearchBox />);

    const search = screen.getByRole<HTMLInputElement>('searchbox');
    fireEvent.change(search, { target: { value: testValue } });
    unmount();
    expect(localStorage.getItem(LAST_SEARCH_VALUE)).toBe(testValue);

    render(<SearchBox />);
    const newSearch = screen.getByRole<HTMLInputElement>('searchbox');
    expect(newSearch.value).toBe(testValue);
  });
});
