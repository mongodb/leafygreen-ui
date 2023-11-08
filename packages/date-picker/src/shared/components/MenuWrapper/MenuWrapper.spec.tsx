import React from 'react';
import { render, waitFor } from '@testing-library/react';

import Button from '@leafygreen-ui/button';
import { usePopoverContext } from '@leafygreen-ui/leafygreen-provider';

import { MenuWrapper } from '.';

describe('packages/date-picker/shared/menu-wrapper', () => {
  test('components inside MenuWrapper have access to PopoverContext', async () => {
    // Can't use `renderHook` since the `active` prop takes moment to render children
    const ChildComponent = () => {
      const { isPopoverOpen, setIsPopoverOpen } = usePopoverContext();
      return (
        <Button
          data-testid="toggle-btn"
          data-open={isPopoverOpen}
          onClick={() => setIsPopoverOpen(o => !o)}
        >
          Toggle
        </Button>
      );
    };

    const { findByTestId } = render(
      <MenuWrapper active>
        <ChildComponent />
      </MenuWrapper>,
    );

    const button = await findByTestId('toggle-btn');
    expect(button).toHaveAttribute('data-open', 'false');
    button.click();
    await waitFor(() => expect(button).toHaveAttribute('data-open', 'true'));
    button.click();
    await waitFor(() => expect(button).toHaveAttribute('data-open', 'false'));
  });
});
