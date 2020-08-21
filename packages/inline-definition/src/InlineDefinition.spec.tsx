import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { H2 } from '@leafygreen-ui/typography';
import InlineDefinition from '.';

const shardDefinition =
  'Sharding is a method for horizontally scaling across multiple replica sets by breaking up large datasets (e.g. partitioning) into smaller parts. Sharding is native to MongoDB.';

const renderInlineDefinition = () => {
  render(
    <H2>
      <InlineDefinition definition={shardDefinition}>Shard</InlineDefinition>{' '}
      your cluster
    </H2>,
  );
};

describe('packages/inline-definition', () => {
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

    fireEvent.mouseEnter(children);

    await waitFor(() => screen.getByText(shardDefinition), { timeout: 500 });

    expect(screen.getByText(shardDefinition)).toBeVisible();

    fireEvent.mouseLeave(children);

    await waitForElementToBeRemoved(screen.getByText(shardDefinition), {
      timeout: 500,
    });
  });
});
