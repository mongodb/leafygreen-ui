import React from 'react';
import { render } from '@testing-library/react';

import Button from '@leafygreen-ui/button';
import { Theme } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import { thumbnails } from '../example-graphics';

import { FeaturesEmptyState } from '.';

const testThumbnails = {};
Object.keys(thumbnails).forEach(theme => {
  testThumbnails[theme] = thumbnails[theme].map((thumbnail, index) => (
    <img key={index} src={thumbnail} alt="" />
  ));
});

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

describe('packages/empty-state/features', () => {
  test('renders title', () => {
    const { getByText } = render(
      <FeaturesEmptyState title="test title" features={testFeatures} />,
    );
    expect(getByText('test title')).toBeInTheDocument();
  });
  // todo: test error when there's one feature
  // todo: renders both features when two features
  // todo: renders all three features when three features
  // todo: test error when there's four features
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
    const { getByText } = render(
      <FeaturesEmptyState
        title="test title"
        features={testFeatures}
        PrimaryButton={<Button>test button</Button>}
        SecondaryButton={<Button>test button 2</Button>}
        ExternalLink={<Link>test external link</Link>}
      />,
    );
    expect(
      getByText('test external link').getElementsByTagName('svg'),
    ).toBeInTheDocument();
  });
  // test('fails when required props are not passed', () => {

  // });
});
