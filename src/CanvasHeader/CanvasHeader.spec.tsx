import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { Link } from '@leafygreen-ui/typography';

import { CanvasHeader, CanvasHeaderProps } from '.';

const resourceNameString =
  'ac_iqttxwn_shard-00-01.hvcuthh.mongodbnet:27017_324892384903284902384903284903284902384903284832908_long_name';

type PartialCanvasHeaderProps = Partial<CanvasHeaderProps>;

const renderCanvasHeader = ({ ...props }: PartialCanvasHeaderProps) => {
  const utils = render(
    <CanvasHeader
      pageTitle="page title"
      backLink={
        <Link
          data-testid="lg-canvas_header-back_link"
          href="https://www.mongodb.design/"
        >
          Back to Cluster
        </Link>
      }
      resourceName={resourceNameString}
      resourceIcon={<Icon glyph={'ShardedCluster'} />}
      actions={
        <Button
          data-testid="lg-canvas_header-button"
          variant="primary"
          leftGlyph={<Icon glyph={'InviteUser'} />}
        >
          Invite user
        </Button>
      }
      {...props}
    />,
  );

  const pageTitle = utils.getByTestId('lg-canvas_header-page_title');
  const backLink = utils.getByTestId('lg-canvas_header-back_link');
  const resourceName = utils.getByTestId('lg-canvas_header-resource_name');
  const actionBtn = utils.getByTestId('lg-canvas_header-button');
  const resourceIcon = utils.getByLabelText('Sharded Cluster Icon');

  return {
    ...utils,
    pageTitle,
    backLink,
    resourceIcon,
    resourceName,
    actionBtn,
  };
};

describe('packages/canvas-header', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderCanvasHeader({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('render', () => {
    test('page title', () => {
      const { pageTitle } = renderCanvasHeader({});
      expect(pageTitle.textContent).toBe('page title');
    });

    test('back link', () => {
      const { backLink } = renderCanvasHeader({});
      expect(backLink.textContent).toBe('Back to Cluster');
    });

    test('resource name', () => {
      const { resourceName } = renderCanvasHeader({});
      expect(resourceName.textContent).toBe(resourceNameString);
    });

    test('resource icon', () => {
      const { resourceIcon } = renderCanvasHeader({});
      expect(resourceIcon).toBeInTheDocument();
    });

    test('action button', () => {
      const { actionBtn } = renderCanvasHeader({});
      expect(actionBtn.textContent).toBe('Invite user');
    });

    test('does not render resourceIcon without a resourceName', () => {
      const { queryByText } = render(
        <CanvasHeader
          pageTitle="page title"
          resourceIcon={<Icon glyph={'ShardedCluster'} />}
        />,
      );

      const resourceName = queryByText(resourceNameString);
      expect(resourceName).not.toBeInTheDocument();
    });
  });

  describe('TypeScript types are correct', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('CanvasHeader component types', () => {
      <>
        {/* @ts-expect-error Property 'pageTitle' is missing */}
        <CanvasHeader />
        <CanvasHeader pageTitle="quack" />
        <CanvasHeader
          pageTitle="page title"
          backLink={
            <Link
              data-testid="lg-canvas_header-back_link"
              href="https://www.mongodb.design/"
            >
              Back to Cluster
            </Link>
          }
          resourceName={resourceNameString}
          resourceIcon={<Icon glyph={'ShardedCluster'} />}
          actions={
            <Button
              data-testid="lg-canvas_header-button"
              variant="primary"
              leftGlyph={<Icon glyph={'InviteUser'} />}
            >
              Invite user
            </Button>
          }
        />
        {/* @ts-expect-error Property 'children' does not exist */}
        <CanvasHeader pageTitle="quack">hi</CanvasHeader>
      </>;
    });
  });
});
