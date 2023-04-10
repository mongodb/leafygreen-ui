import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

import Button from '@leafygreen-ui/button';
import { Theme } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import { graphics } from '../example-graphics';

import { MAX_NUM_FEATURES, MIN_NUM_FEATURES } from './FeaturesEmptyState';
import { FeaturesEmptyState } from '.';

type TestGraphics = Record<Theme, Array<ReactElement>>;
const testGraphics = Object.keys(graphics).reduce((acc, theme) => {
  acc[theme as Theme] = graphics[theme as Theme].map(
    (graphic: any, index: number) => (
      // jest will not process SVGs, so render them as <img /> elements
      <img key={index} src={graphic} alt="" />
    ),
  );
  return acc;
}, {} as TestGraphics);

const testFeatures = Array.from({ length: MAX_NUM_FEATURES }, (_, i) => ({
  graphic: testGraphics[Theme.Light][0],
  title: `feature-${i}`,
  description:
    'Run powerful and resilient apps that span multiple regions or clouds at once.',
}));

const defaultProps = {
  title: 'test title',
  primaryButton: <Button>test button</Button>,
  features: testFeatures,
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('packages/empty-state/features', () => {
  test('renders title', () => {
    const { getByText } = render(<FeaturesEmptyState {...defaultProps} />);
    expect(getByText('test title')).toBeInTheDocument();
  });

  test("console errors when there's less than the minimum number of features", () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <FeaturesEmptyState
        {...defaultProps}
        features={testFeatures.slice(0, MIN_NUM_FEATURES - 1)}
      />,
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      `The \`FeaturesEmptyState\` component should only render ${MIN_NUM_FEATURES}-${MAX_NUM_FEATURES} features.`,
    );
  });

  test("doesn't console error when there's the minimum number of features", () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <FeaturesEmptyState
        {...defaultProps}
        features={testFeatures.slice(0, MIN_NUM_FEATURES)}
      />,
    );
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("doesn't console error when there's the maximum number of features", () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <FeaturesEmptyState
        {...defaultProps}
        features={testFeatures.slice(0, MAX_NUM_FEATURES)}
      />,
    );
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("console error when there's four features", () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <FeaturesEmptyState
        {...defaultProps}
        features={[
          ...testFeatures,
          {
            title: 'test',
            description: 'test',
            graphic: testGraphics[Theme.Light][0],
          },
        ]}
      />,
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      `The \`FeaturesEmptyState\` component should only render ${MIN_NUM_FEATURES}-${MAX_NUM_FEATURES} features.`,
    );
  });

  test('renders primary button', () => {
    const { getByText } = render(<FeaturesEmptyState {...defaultProps} />);
    expect(getByText('test button')).toBeInTheDocument();
  });

  test('renders secondary button', () => {
    const { getByText } = render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures}
        primaryButton={<Button>test button</Button>}
        secondaryButton={<Button>test button 2</Button>}
      />,
    );
    expect(getByText('test button 2')).toBeInTheDocument();
  });
  test('renders external link', () => {
    const { getByText } = render(
      <FeaturesEmptyState
        {...defaultProps}
        secondaryButton={<Button>test button 2</Button>}
        externalLink={<Link>test external link</Link>}
      />,
    );
    expect(getByText('test external link')).toBeInTheDocument();
  });
  test('rendered link is external by default', () => {
    const { getByTestId } = render(
      <FeaturesEmptyState
        {...defaultProps}
        secondaryButton={<Button>test button 2</Button>}
        externalLink={<Link>test external link</Link>}
      />,
    );
    // test that the link renders the external icon
    expect(
      getByTestId('features-empty-states-link').getElementsByTagName('svg')[0],
    ).toBeInTheDocument();
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('errors when secondary button is passed without primary', () => {
    const { primaryButton, ...propsWithoutPrimaryButton } = defaultProps;
    // @ts-expect-error primaryButton is required when secondaryButton is passed
    <FeaturesEmptyState
      {...propsWithoutPrimaryButton}
      secondaryButton={<Button>test button 2</Button>}
    />;
  });
});
