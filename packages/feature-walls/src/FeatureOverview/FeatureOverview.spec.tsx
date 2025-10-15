import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { FeatureOverviewProps } from './FeatureOverview.types';
import {
  generateMockFeatures,
  MOCK_SECTION_TITLE,
} from './FeatureOverview.utils';
import { FeatureOverview } from '.';

const mockFeatures = generateMockFeatures(3);

const renderFeatureOverview = (props?: Partial<FeatureOverviewProps>) => {
  return render(
    <FeatureOverview
      title={props?.title ?? MOCK_SECTION_TITLE}
      features={props?.features ?? mockFeatures}
      {...props}
    />,
  );
};

describe('packages/feature-walls/FeatureOverview', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderFeatureOverview();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders title', () => {
    const { getByText } = renderFeatureOverview();

    expect(getByText(MOCK_SECTION_TITLE)).toBeInTheDocument();
  });

  test('renders each of the provided features', () => {
    const { getByText } = renderFeatureOverview();

    mockFeatures.forEach(feature => {
      expect(getByText(feature.title)).toBeInTheDocument();
      expect(getByText(feature.description)).toBeInTheDocument();
    });
  });

  test('displays the correct media based on the selected accordion item', async () => {
    const { getAllByRole, getByAltText } = renderFeatureOverview();
    const [_, button2, button3] = getAllByRole('button');

    // Media 1 visible by default
    expect(getByAltText('Media 1')).toBeVisible();
    expect(getByAltText('Media 2')).not.toBeVisible();
    expect(getByAltText('Media 3')).not.toBeVisible();

    // Click second accordion button
    userEvent.click(button2);

    // Media 2 now visible
    await waitFor(() => {
      expect(getByAltText('Media 1')).not.toBeVisible();
      expect(getByAltText('Media 2')).toBeVisible();
      expect(getByAltText('Media 3')).not.toBeVisible();
    });

    // Click third accordion button
    userEvent.click(button3);

    // Media 3 now visible
    await waitFor(() => {
      expect(getByAltText('Media 1')).not.toBeVisible();
      expect(getByAltText('Media 2')).not.toBeVisible();
      expect(getByAltText('Media 3')).toBeVisible();
    });
  });

  test('invokes onExpand for a feature when clicked if feature is not expanded', () => {
    const mockOnExpand = jest.fn();
    const mockFeaturesWithOnClick = mockFeatures.map(feature => ({
      ...feature,
      onExpand: () => mockOnExpand(feature.title),
    }));

    const { getByText } = renderFeatureOverview({
      features: mockFeaturesWithOnClick,
    });

    userEvent.click(getByText('Feature 2'));
    expect(mockOnExpand).toHaveBeenCalledTimes(1);
    expect(mockOnExpand).toHaveBeenCalledWith('Feature 2');
  });

  test('does not invoke onExpand for a feature when clicked if feature is expanded', () => {
    const mockOnExpand = jest.fn();
    const mockFeaturesWithOnClick = mockFeatures.map(feature => ({
      ...feature,
      onExpand: () => mockOnExpand(feature.title),
    }));

    const { getByText } = renderFeatureOverview({
      features: mockFeaturesWithOnClick,
    });

    userEvent.click(getByText('Feature 1'));
    expect(mockOnExpand).toHaveBeenCalledTimes(0);
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - requires `features` */}
      <FeatureOverview title={MOCK_SECTION_TITLE} />

      {/* @ts-expect-error - requires `title` */}
      <FeatureOverview features={mockFeatures} />

      <FeatureOverview
        title={MOCK_SECTION_TITLE}
        // @ts-expect-error - `features` elements must be type `Feature`
        features={['test1', 'test2', 'test3']}
      />

      <FeatureOverview title={MOCK_SECTION_TITLE} features={mockFeatures} />
    </>;
  });
});
