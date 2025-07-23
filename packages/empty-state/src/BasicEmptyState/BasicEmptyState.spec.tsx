import React from 'react';
import { render } from '@testing-library/react';

import Button from '@leafygreen-ui/button';
import { Link } from '@leafygreen-ui/typography';

import { BasicEmptyState } from '.';

beforeEach(() => {
  // silence all expected console errors for cleaner test output
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('packages/empty-state/basic', () => {
  test('renders title and description', () => {
    const { getByText } = render(
      <BasicEmptyState title="test title" description="test description" />,
    );
    expect(getByText('test title')).toBeInTheDocument();
    expect(getByText('test description')).toBeInTheDocument();
  });
  test('renders primary button', () => {
    const { getByText } = render(
      <BasicEmptyState
        title="test title"
        description="test description"
        primaryButton={<Button>test button</Button>}
      />,
    );
    expect(getByText('test button')).toBeInTheDocument();
  });

  test('renders secondary button', () => {
    const { getByText } = render(
      <BasicEmptyState
        title="test title"
        description="test description"
        primaryButton={<Button>test button</Button>}
        secondaryButton={<Button>test button 2</Button>}
      />,
    );
    expect(getByText('test button 2')).toBeInTheDocument();
  });
  test('errors when secondary button is passed without primary', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(
      // @ts-expect-error primaryButton is required when secondaryButton is passed
      <BasicEmptyState
        title="test title"
        description="test description"
        secondaryButton={<Button>test button 2</Button>}
      />,
    );
    expect(consoleSpy).toHaveBeenCalled();
  });
  test('renders external link', () => {
    const { getByText } = render(
      <BasicEmptyState
        title="test title"
        description="test description"
        primaryButton={<Button>test button</Button>}
        secondaryButton={<Button>test button 2</Button>}
        externalLink={<Link>test external link</Link>}
      />,
    );
    expect(getByText('test external link')).toBeInTheDocument();
  });
  test('rendered link is external by default', () => {
    const { getByTestId } = render(
      <BasicEmptyState
        title="test title"
        description="test description"
        primaryButton={<Button>test button</Button>}
        secondaryButton={<Button>test button 2</Button>}
        externalLink={<Link>test external link</Link>}
      />,
    );
    // test that the link renders the external icon
    expect(
      getByTestId('basic-empty-states-link').getElementsByTagName('svg')[0],
    ).toBeInTheDocument();
  });
});
