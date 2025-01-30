import React, { useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Drawer, DrawerProps } from '.';

const drawerContent = 'Drawer content';
const drawerTestId = 'drawer-test-id';

const DrawerWrapper = ({
  open: initialOpen = false,
  ...props
}: DrawerProps) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <Drawer data-testid={drawerTestId} {...props} open={open} setOpen={setOpen}>
      {drawerContent}
    </Drawer>
  );
};

function renderDrawer(props: Partial<DrawerProps> = {}) {
  return render(
    <DrawerWrapper title="Drawer title" {...props}>
      {drawerContent}
    </DrawerWrapper>,
  );
}

describe('packages/drawer', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderDrawer({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('when the "open" prop is true', () => {
    test('renders content as expected', async () => {
      const { getByTestId } = renderDrawer({ open: true });
      const drawer = getByTestId(drawerTestId);
      expect(drawer).toHaveAttribute('aria-hidden', 'false');
    });

    test('uses "id" prop when set', () => {
      const { getByTestId } = renderDrawer({ open: true, id: 'test-id' });
      const drawer = getByTestId(drawerTestId);
      expect(drawer).toHaveAttribute('id', 'test-id');
    });

    test('closes drawer when close button is clicked', async () => {
      const { getByRole, getByTestId } = renderDrawer({ open: true });
      const drawer = getByTestId(drawerTestId);
      const closeButton = getByRole('button');

      userEvent.click(closeButton);
      expect(drawer).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
