import React from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { MigrationProvider, useMigrationContext } from './MigrationContext';

const childTestId = 'test-child';

describe('packages/leafygreen-provider/MigrationContext', () => {
  test('only renders children in the DOM', () => {
    const { container, getByTestId } = render(
      <MigrationProvider>
        <div data-testid={childTestId}>Child element</div>
      </MigrationProvider>,
    );
    const testChild = getByTestId(childTestId);

    expect(container.firstChild).toBe(testChild);
  });
});

describe('useMigrationContext', () => {
  test('passes provider props correctly', () => {
    const customProps = { forceUseTopLayer: true };
    const { result } = renderHook(useMigrationContext, {
      wrapper: ({ children }) => (
        <MigrationProvider {...customProps}>{children}</MigrationProvider>
      ),
    });

    expect(result.current).toHaveProperty('forceUseTopLayer', true);
  });
});
