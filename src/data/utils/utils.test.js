import { cleanup } from '@testing-library/react';
import { getSafe } from './utils';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('getSafe util', () => {
    it('should call getSafe util', () => {
      getSafe(() => 'demo');
    });
    it('should throw error on getSafe util', async () => {
      const resolvedSample = {};
      const defaultVal = '0';
      try {
        getSafe(resolvedSample, defaultVal);
      } catch (e) {
        expect(e).toMatch(defaultVal);
      }
    });
  });
