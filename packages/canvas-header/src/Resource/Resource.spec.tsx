import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Icon from '@leafygreen-ui/icon';

import { ResourceProps } from './Resource.types';
import { Resource } from '.';

const renderResource = (props: ResourceProps) => {
  const utils = render(<Resource {...props} />);

  const resourceName = utils.getByTestId('lg-canvas_header-resource_name');

  return { resourceName, ...utils };
};

describe('packages/canvas-header/resource', () => {
  // https://stackoverflow.com/a/69574825/13156339
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      // Provide mock implementation
      writeText: jest.fn().mockReturnValueOnce(Promise.resolve()),
    },
  });
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container, resourceName } = renderResource({
        resourceName: 'resource name',
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void userEvent.click(resourceName));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });

  describe('render', () => {
    test('name and icon', () => {
      const { container, getByLabelText } = renderResource({
        resourceName: 'resource name',
        resourceIcon: <Icon glyph={'ShardedCluster'} />,
      });

      const icon = getByLabelText('Sharded Cluster Icon');
      expect(icon).toBeInTheDocument();
      expect(container.textContent).toBe('resource name');
    });
  });

  describe('copy', () => {
    describe('resource name is copied to clipboard', () => {
      test('onClick', () => {
        const { resourceName } = renderResource({
          resourceName: 'onClick',
        });

        userEvent.click(resourceName);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('onClick');
      });

      test('on enter', () => {
        const { resourceName } = renderResource({
          resourceName: 'on Enter',
        });

        resourceName.focus();
        expect(resourceName).toHaveFocus();
        userEvent.keyboard('[Enter]');
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('on Enter');
      });

      test('on space', () => {
        const { resourceName } = renderResource({
          resourceName: 'on Space',
        });

        resourceName.focus();
        expect(resourceName).toHaveFocus();
        userEvent.keyboard('[Space]');
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('on Space');
      });
    });
    describe('tooltip renders', () => {
      test('onClick', async () => {
        const { resourceName, getByText } = renderResource({
          resourceName: 'onClick',
        });

        userEvent.click(resourceName);
        await waitFor(() => expect(getByText('Copied!')).toBeVisible());
      });

      test('on enter', async () => {
        const { resourceName, getByText } = renderResource({
          resourceName: 'on Enter',
        });

        resourceName.focus();
        expect(resourceName).toHaveFocus();
        userEvent.keyboard('[Enter]');
        await waitFor(() => expect(getByText('Copied!')).toBeVisible());
      });

      test('on space', async () => {
        const { resourceName, getByText } = renderResource({
          resourceName: 'on Space',
        });

        resourceName.focus();
        expect(resourceName).toHaveFocus();
        userEvent.keyboard('[Space]');
        await waitFor(() => expect(getByText('Copied!')).toBeVisible());
      });
    });
  });
});
