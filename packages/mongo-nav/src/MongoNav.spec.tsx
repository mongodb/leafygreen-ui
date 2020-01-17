import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MongoNav from './MongoNav';
import data from './data';

afterAll(cleanup);

describe('packages/MongoNav', () => {
  const onOrganizationChange = jest.fn();
  const onProjectChange = jest.fn();
  const cloudHost = 'https://cloud-dev.mongodb.com';

  const { getByText, getByTestId } = render(
    <MongoNav
      activeProduct="stitch"
      data={data}
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

  describe('it successfully constructs urls based on hosts and urls props', () => {
    test('specific url overrides take precedence over hosts, when the prop is set', () => {
      const accessManager = getByText('Access Manager');
      expect((accessManager as HTMLAnchorElement).href).toBe(
        'https://cloud.mongodb.com/access-manager-test',
      );
    });

    test('host string changes default host, when the prop is set', () => {
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

  test('it renders the project nav by default', () => {
    const projectNav = getByTestId('project-nav');
    expect(projectNav).toBeInTheDocument();
  });

  test('it renders admin as false by default', () => {
    const orgNav = getByTestId('organization-nav');
    expect(orgNav.innerHTML.includes('Admin')).toBe(false);
  });
});
