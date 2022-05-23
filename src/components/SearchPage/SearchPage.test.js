import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SearchPage from './index';

afterEach(cleanup);

describe('SearchPage component', () => {
    it('renders correctly', () => {
      const { getByTestId, asFragment } = render(<SearchPage />);
      expect(getByTestId('search-page')).toBeTruthy();
      expect({ asFragment }).toMatchSnapshot();
    });

    it('header should load with page title as Search Page', () => {
        const { getByTestId } = render(<SearchPage />);
        expect(getByTestId('search-page-heading')).toBeTruthy();
      });

      it('should check the click of Search button', () => {
        const { getByTestId } =  render(<SearchPage />);
        const handleSearch = getByTestId('search-ref-button');
        fireEvent.click(handleSearch);
      });
      
    test("renders without crashing", () => {
        render(<SearchPage />);
      });
      
});