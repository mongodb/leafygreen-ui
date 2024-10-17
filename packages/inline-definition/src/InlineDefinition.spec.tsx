import React from 'react';
import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { H2 } from '@leafygreen-ui/typography';

import InlineDefinition from '.';

const shardDefinition =
  'Sharding is a method for horizontally scaling across multiple replica sets by breaking up large datasets (e.g. partitioning) into smaller parts. Sharding is native to MongoDB.';

const renderInlineDefinition = () => {
  return render(
    <H2>
      <InlineDefinition definition={shardDefinition}>Shard</InlineDefinition>{' '}
      your cluster
    </H2>,
  );
};

describe('packages/inline-definition', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container, getByText } = renderInlineDefinition();
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void userEvent.hover(getByText('Shard')));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });
  test('renders children to the DOM', () => {
    renderInlineDefinition();
    expect(screen.getByText('Shard')).toBeVisible();
  });

  test('does not render definition to the DOM', () => {
    renderInlineDefinition();
    expect(screen.queryByText(shardDefinition)).not.toBeInTheDocument();
  });

  test('definition appears on hover', async () => {
    renderInlineDefinition();
    const children = screen.getByText('Shard');

    userEvent.hover(children);

    await waitFor(() =>
      expect(screen.getByText(shardDefinition)).toBeVisible(),
    );

    userEvent.unhover(children);

    await waitForElementToBeRemoved(screen.getByText(shardDefinition));
  });

  /* eslint-disable jest/no-disabled-tests, jest/expect-expect */
  describe.skip('Tests behave as expected', () => {
    test('Requires a definition prop and children', () => {
      /// @ts-expect-error
      <InlineDefinition />;
      /// @ts-expect-error
      <InlineDefinition definition="lorem ipsum" />;
      <InlineDefinition definition="lorem ipsum">Lorem Ipsum</InlineDefinition>;
    });
    test('Allows any subset of TooltipProps', () => {
      <InlineDefinition definition="lorem ipsum" triggerEvent="hover">
        Lorem Ipsum
      </InlineDefinition>;
    });
  });
});
