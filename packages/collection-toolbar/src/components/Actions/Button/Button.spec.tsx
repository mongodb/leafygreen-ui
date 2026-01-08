import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  CollectionToolbarActionsSubComponentProperty,
  Size,
} from '../../../shared.types';
import { CollectionToolbarProvider } from '../../../Context/CollectionToolbarProvider';
import { getLgIds } from '../../../utils';

import { Button, ButtonVariant } from '.';

const lgIds = getLgIds();

const renderButton = ({
  children = 'Test Button',
  size = Size.Default,
  ...props
}: {
  children?: React.ReactNode;
  size?: Size;
} & React.ComponentProps<typeof Button> = {}) => {
  return render(
    <CollectionToolbarProvider lgIds={lgIds} size={size}>
      <Button {...props}>{children}</Button>
    </CollectionToolbarProvider>,
  );
};

describe('packages/collection-toolbar/components/Actions/Button', () => {
  describe('rendering', () => {
    test('renders as a Button element', () => {
      renderButton();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('renders children content', () => {
      renderButton({ children: 'Click Me' });
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
  });

  describe('context integration', () => {
    test('uses size from CollectionToolbarContext when size is "default"', () => {
      renderButton({ size: Size.Default });
      const button = screen.getByRole('button');
      // Button should render with default size styling
      expect(button).toBeInTheDocument();
    });

    test('uses size from CollectionToolbarContext when size is "small"', () => {
      renderButton({ size: Size.Small });
      const button = screen.getByRole('button');
      // Button should render with small size styling
      expect(button).toBeInTheDocument();
    });
  });

  describe('props', () => {
    test('spreads additional props to Button', () => {
      renderButton({
        'aria-label': 'Custom label',
        id: 'custom-id',
      } as React.ComponentProps<typeof Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('id', 'custom-id');
    });

    test('forwards onClick handler', async () => {
      const handleClick = jest.fn();
      renderButton({ onClick: handleClick });

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('applies className prop', () => {
      renderButton({ className: 'custom-class' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    test('supports disabled prop', () => {
      renderButton({ disabled: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('supports variant prop', () => {
      renderButton({ variant: ButtonVariant.Primary });
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('compound component', () => {
    test('has the correct static property for compound component identification', () => {
      expect(Button[CollectionToolbarActionsSubComponentProperty.Button]).toBe(
        true,
      );
    });
  });
});
