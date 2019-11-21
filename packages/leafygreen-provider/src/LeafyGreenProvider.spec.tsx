import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LeafyGreenProvider from '.';

afterAll(cleanup);

describe('packages/leafygreen-provider/LeafyGreenProvider', () => {
  const childTestID = 'using-keyboard-provider';
  const TestContextComponent = () => <div data-testid={childTestID}>Test</div>;

  const { container, getByTestId } = render(
    <LeafyGreenProvider>
      <TestContextComponent />
    </LeafyGreenProvider>,
  );

  const testChild = getByTestId(childTestID);

  test('only renders children in the DOM', () => {
    expect(container.firstChild).toBe(testChild);
  });
});
