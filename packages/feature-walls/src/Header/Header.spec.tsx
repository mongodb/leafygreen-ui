import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Variant } from '@leafygreen-ui/button';

import { HeaderProps } from './Header.types';
import { Header } from '.';

const defaultProps: HeaderProps = {
  title: 'Test title',
  subtitle: 'Test subtitle',
  description: 'Test description',
  primaryButtonProps: { children: 'Primary CTA' },
  secondaryButtonProps: { children: 'Secondary CTA' },
};

const renderHeader = (props?: Partial<HeaderProps>) => {
  return render(<Header {...defaultProps} {...props} />);
};

describe('packages/feature-walls/header', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderHeader();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders the title, subtitle, and description correctly', () => {
    const { getByText } = renderHeader();

    expect(getByText('Test title')).toBeInTheDocument();
    expect(getByText('Test subtitle')).toBeInTheDocument();
    expect(getByText('Test description')).toBeInTheDocument();
  });

  test('renders primary and secondary buttons', () => {
    const { getByText } = renderHeader();

    expect(getByText('Primary CTA')).toBeInTheDocument();
    expect(getByText('Secondary CTA')).toBeInTheDocument();
  });

  test('does not render subtitle and description if they are not provided', () => {
    const { queryByText } = renderHeader({
      subtitle: undefined,
      description: undefined,
    });

    expect(queryByText('Test subtitle')).not.toBeInTheDocument();
    expect(queryByText('Test description')).not.toBeInTheDocument();
  });

  test('does not render secondary button if secondaryButtonProps is not provided', () => {
    const { getByText, queryByText } = renderHeader({
      secondaryButtonProps: undefined,
    });

    expect(getByText('Primary CTA')).toBeInTheDocument();
    expect(queryByText('Secondary CTA')).not.toBeInTheDocument();
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      <Header
        title={defaultProps.title}
        primaryButtonProps={defaultProps.primaryButtonProps}
      />
      <Header
        title={defaultProps.title}
        // @ts-expect-error - Missing children
        primaryButtonProps={{ onClick: () => {} }}
      />
      <Header
        title={defaultProps.title}
        primaryButtonProps={{
          ...defaultProps.primaryButtonProps,
          // @ts-expect-error - Cannot specify variant
          variant: Variant.Danger,
        }}
      />

      <Header {...defaultProps} />
    </>;
  });
});
