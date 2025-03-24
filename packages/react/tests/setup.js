import { afterEach } from 'vitest';
import { cleanup, configure } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

configure({
  testIdAttribute: 'data-test',
});

afterEach(() => {
  cleanup();
});
