import React from 'react';
import { render } from '@testing-library/react';

import Button from '@leafygreen-ui/button';
import { Theme } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import { thumbnails } from '../example-graphics';

import { MAX_NUM_FEATURES, MIN_NUM_FEATURES } from './FeaturesEmptyState';
import { FeaturesEmptyState } from '.';

const testThumbnails = Object.keys(thumbnails).reduce((acc, theme) => {
  acc[theme] = thumbnails[theme].map((thumbnail, index) => (
    // jest will not process SVGs, so render them as <img /> elements
    <img key={index} src={thumbnail} alt="" />
  ));
  return acc;
}, {});

const testFeatures = [
  {
    thumbnail: testThumbnails[Theme.Light][0],
    title: 'Multi-region, multi-cloud',
    description:
      'Run powerful and resilient apps that span multiple regions or clouds at once.',
  },
  {
    thumbnail: testThumbnails[Theme.Light][1],
    title: 'Serverless and elastic',
    description:
      'Run powerful and resilient apps that span multiple regions or clouds at once.',
  },
  {
    thumbnail: testThumbnails[Theme.Light][2],
    title: 'Always-on security',
    description:
      'Secure data with built-in defaults for access and end-toend encryption.',
  },
];

beforeEach(() => {
  // silence all console errors
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('packages/empty-state/features', () => {
  test('renders title', () => {
    const { getByText } = render(
      <FeaturesEmptyState title="test title" features={testFeatures} />,
    );
    expect(getByText('test title')).toBeInTheDocument();
  });

  test("console errors when there's only one feature", () => {
    expect(MIN_NUM_FEATURES === 2).toBe(true);
    const consoleSpy = jest.spyOn(console, 'error');
    render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures.slice(0, 1)}
      />,
    );
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("doesn't console error when there's two features", () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures.slice(0, 2)}
      />,
    );
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("doesn't console error when there's three features", () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(<FeaturesEmptyState title="test title" features={testFeatures} />);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("console error when there's four features", () => {
    expect(MAX_NUM_FEATURES === 3).toBe(true);
    const consoleSpy = jest.spyOn(console, 'error');
    render(
      <FeaturesEmptyState
        title="test title"
        features={[
          ...testFeatures,
          {
            title: 'test',
            description: 'test',
            thumbnail: testThumbnails[Theme.Light][0],
          },
        ]}
      />,
    );
    expect(consoleSpy).toHaveBeenCalled();
  });

  test('renders primary button', () => {
    const { getByText } = render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures}
        PrimaryButton={<Button>test button</Button>}
      />,
    );
    expect(getByText('test button')).toBeInTheDocument();
  });

  test('renders secondary button', () => {
    const { getByText } = render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures}
        PrimaryButton={<Button>test button</Button>}
        SecondaryButton={<Button>test button 2</Button>}
      />,
    );
    expect(getByText('test button 2')).toBeInTheDocument();
  });
  test('errors when secondary button is passed without primary', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures}
        SecondaryButton={<Button>test button 2</Button>}
      />,
    );
    expect(consoleSpy).toHaveBeenCalled();
  });
  test('renders external link', () => {
    const { getByText } = render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures}
        PrimaryButton={<Button>test button</Button>}
        SecondaryButton={<Button>test button 2</Button>}
        ExternalLink={<Link>test external link</Link>}
      />,
    );
    expect(getByText('test external link')).toBeInTheDocument();
  });
  test('rendered link is external by default', () => {
    const { getByTestId } = render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures}
        PrimaryButton={<Button>test button</Button>}
        SecondaryButton={<Button>test button 2</Button>}
        ExternalLink={<Link>test external link</Link>}
      />,
    );
    // test that the link renders the external icon
    expect(
      getByTestId('features-empty-states-link').getElementsByTagName('svg')[0],
    ).toBeInTheDocument();
  });
});
