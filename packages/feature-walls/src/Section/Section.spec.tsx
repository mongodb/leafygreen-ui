import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { LGIDS_SECTION } from './constants';
import { SectionProps } from './Section.types';
import { Section } from '.';

const defaultProps = {
  renderInCard: false,
  title: 'Test title',
} as const;

const renderSection = (props?: Partial<SectionProps>) => {
  return render(<Section {...defaultProps} {...props} />);
};

describe('packages/feature-walls/section', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderSection();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders the title', () => {
    const { getByText } = renderSection();

    expect(getByText(defaultProps.title)).toBeInTheDocument();
  });

  test('renders in card UI if `renderInCard` is true', () => {
    const { getByTestId } = renderSection({ renderInCard: true });
    expect(getByTestId(LGIDS_SECTION.card)).toBeInTheDocument();
  });

  test('does not render in card UI if `renderInCard` is false', () => {
    const { queryByTestId } = renderSection({ renderInCard: false });
    expect(queryByTestId(LGIDS_SECTION.card)).not.toBeInTheDocument();
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - requires `title` */}
      <Section />

      <Section {...defaultProps} />
    </>;
  });
});
