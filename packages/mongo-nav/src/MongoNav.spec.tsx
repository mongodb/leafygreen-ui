import React from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MongoNav from './MongoNav';

afterAll(cleanup);

describe('packages/MongoNav', () => {
  const onOrganizationChange = jest.fn();
  const onProjectChange = jest.fn();
  const cloudHost = 'https://cloud-dev.mongodb.com';

  const { getByText, getByTestId } = render(
    <MongoNav
      activeProduct="stitch"
      mode="dev"
      onOrganizationChange={onOrganizationChange}
      onProjectChange={onProjectChange}
      urls={{
        orgNav: {
          accessManager: 'https://cloud.mongodb.com/access-manager-test',
        },
      }}
      hosts={{ cloud: cloudHost }}
    />,
  );

  describe('by default', () => {
    test('it renders the ProjectNav', async () => {
      await wait(() => getByTestId('project-nav'), {
        timeout: 1500,
      });
      const projectNav = getByTestId('project-nav');
      expect(projectNav).toBeInTheDocument();
    });

    test('it renders admin as false', async () => {
      await wait(() => getByTestId('project-nav'), {
        timeout: 1500,
      });
      const orgNav = getByTestId('organization-nav');
      expect(orgNav.innerHTML.includes('Admin')).toBe(false);
    });
  });

  describe('it successfully constructs urls based on hosts and urls props', () => {
    test('specific url overrides take precedence over hosts, when the prop is set', async () => {
      await wait(() => getByTestId('project-nav'), {
        timeout: 1500,
      });
      const accessManager = getByText('Access Manager');
      expect((accessManager as HTMLAnchorElement).href).toBe(
        'https://cloud.mongodb.com/access-manager-test',
      );
    });
    test('host string changes default host, when the prop is set', async () => {
      await wait(() => getByTestId('project-nav'), {
        timeout: 1500,
      });
      const support = getByText('Support');
      const billing = getByText('Billing');

      expect((support as HTMLAnchorElement).href).toBe(
        `${cloudHost}/v2#/org/5d729a93/support`,
      );

      expect((billing as HTMLAnchorElement).href).toBe(
        `${cloudHost}/v2#/org/5d729a93/billing/overview`,
      );
    });
  });
  test('when mode prop is set to `dev`, fixture data is rendered inside of MongoNav', async () => {
    await wait(() => getByTestId('project-nav'), {
      timeout: 1500,
    });
    const firstName = getByText('DevMode');
    expect(firstName).toBeInTheDocument();
  });
});
