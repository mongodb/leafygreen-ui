import React from 'react';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { JestDOM } from '@leafygreen-ui/testing-lib';
import OrgSelect from './OrgSelect';
import { dataFixtures, urlFixtures, constructOrganizationURL } from '../data';
import { OnChangeInterface } from '../types';

// data
const { currentOrganization, organizations } = dataFixtures;

const mongoSelectUrls = urlFixtures.mongoSelect;

describe('packages/mongo-select/OrgSelect', () => {
  let getByTestId: RenderResult['getByTestId'];
  let queryByTestId: RenderResult['queryByTestId'];
  let queryAllByTestId: RenderResult['queryAllByTestId'];

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  describe('OrgSelect', () => {
    const renderComponent = (props = {}) => {
      ({ getByTestId, queryByTestId, queryAllByTestId } = render(
        <OrgSelect
          current={currentOrganization}
          data={organizations}
          constructOrganizationURL={constructOrganizationURL}
          urls={mongoSelectUrls}
          {...props}
        />,
      ));
    };

    describe('when rendered with default props', () => {
      beforeEach(renderComponent);

      it('displays the org select trigger with the current org name', () => {
        const orgTriggerText = getByTestId('org-select-active-org');
        expect(orgTriggerText).toBeVisible();
        expect(orgTriggerText.textContent).toEqual('Demo Organization');
      });

      it('sets "aria-expanded" to false when organization dropdown is closed', () => {
        expect(getByTestId('org-trigger').getAttribute('aria-expanded')).toBe(
          'false',
        );
      });

      describe('when clicking the current organization trigger', () => {
        beforeEach(() => {
          fireEvent.click(getByTestId('org-trigger'));
        });

        it('sets "aria-expanded" to true', () => {
          expect(getByTestId('org-trigger').getAttribute('aria-expanded')).toBe(
            'true',
          );
        });

        it('displays a search input with a placeholder', () => {
          expect(
            getByTestId('org-filter-input').getAttribute('placeholder'),
          ).toContain('Search for an Organization...');
        });

        it('displays two organization results', () => {
          expect(queryAllByTestId('org-option').length).toEqual(2);
        });

        it('displays the correct names of each result', () => {
          const orgResults = queryAllByTestId('org-option');
          expect(orgResults[0].textContent).toContain('Demo Organization');
          expect(orgResults[1].textContent).toContain('Demo Organization 2');
        });

        it('displays the correct org type of each result', () => {
          const orgResults = queryAllByTestId('org-option');
          expect(orgResults[0].textContent).toContain('Atlas');
          expect(orgResults[1].textContent).toContain('Cloud Manager');
        });

        it('displays the correct link to projects of each result', () => {
          const orgResults = queryAllByTestId('org-option');
          expect((orgResults[0] as HTMLAnchorElement).href).toBe(
            'https://cloud.mongodb.com/v2#/org/fakeOrgId1/projects',
          );
          expect((orgResults[1] as HTMLAnchorElement).href).toBe(
            'https://cloud.mongodb.com/v2#/org/fakeOrgId2/projects',
          );
        });

        it('renders the logo associated with the planType', () => {
          const orgResults = queryAllByTestId('org-option');
          expect(orgResults[0].innerHTML).toContain('svg');
        });

        it('indicates the current organization', () => {
          const orgResults = queryAllByTestId('org-option');
          const currentOrgName = currentOrganization!.orgName;
          const currentResult = orgResults.filter(result =>
            result.textContent?.includes('(current)'),
          );
          expect(currentResult.length).toEqual(1);
          expect(currentResult[0].textContent).toContain(
            `${currentOrgName} (current)`,
          );
        });

        describe('when clicking an org', () => {
          beforeEach(async () => {
            const orgResults = queryAllByTestId('org-option');
            await JestDOM.silenceNavigationErrors(async waitForNavigation => {
              fireEvent.click(orgResults[0]);

              await waitForNavigation();
            });
          });

          // eslint-disable-next-line jest/expect-expect
          it('closes the menu', async () => {
            await waitForElementToBeRemoved(() =>
              queryByTestId('org-filter-input'),
            );
          });
        });
      });
    });

    describe('when rendered in a disabled state', () => {
      beforeEach(() => renderComponent({ disabled: true }));

      it('displays the current org as "All Organizations"', () => {
        const orgTrigger = getByTestId('org-trigger');
        expect(orgTrigger.textContent).toContain('All Organizations');
      });

      it('does not display an org settings icon', () => {
        expect(queryByTestId('org-trigger-settings')).toBeNull();
      });
    });

    describe('when a user filters organizations', () => {
      beforeEach(renderComponent);

      beforeEach(() => {
        fireEvent.click(getByTestId('org-trigger'));
      });

      it('displays one organization when only one matches the search', () => {
        const input = getByTestId('org-filter-input');

        expect(input.innerHTML).toEqual('');

        fireEvent.change(input, {
          target: { value: '2' },
        });

        expect(queryAllByTestId('org-option').length).toBe(1);
      });

      it('displays no organizations when none matches the search', () => {
        const input = getByTestId('org-filter-input');

        fireEvent.change(input, {
          target: { value: 'xx' },
        });

        expect(queryAllByTestId('org-option').length).toBe(0);
      });

      it('when closing the menu the filter value is reset', async () => {
        // Close menu
        act(() => {
          // For some reason this causes a navigation and a console error.
          // I can't figure out how or why yet
          document.body.dispatchEvent(
            new MouseEvent('click', { bubbles: true }),
          );
        });

        // Need to wait for the UI to update as clicking on the orgTrigger so rapidly causes
        // React to coalesce the events
        await waitForElementToBeRemoved(() =>
          queryByTestId('org-filter-input'),
        );

        fireEvent.click(getByTestId('org-trigger'));

        expect(getByTestId('org-filter-input').innerHTML).toEqual('');
      });
    });

    describe('when all organizations have the same planType', () => {
      beforeEach(() =>
        renderComponent({
          data: [
            {
              orgId: 'fakeOrgId1',
              orgName: 'Demo Organization',
              planType: 'atlas',
            },
            {
              orgId: 'fakeOrgId2',
              orgName: 'Demo Organization 2',
              planType: 'atlas',
            },
          ],
        }),
      );

      beforeEach(() => {
        fireEvent.click(getByTestId('org-trigger'));
      });

      it('does not render the logo associated with the planType', () => {
        const orgResults = queryAllByTestId('org-option');
        expect(orgResults[0].innerHTML).not.toContain('svg');
      });
    });

    describe('when the onChange prop is set', () => {
      function onChange({ setData }: OnChangeInterface) {
        return setData([
          {
            orgId: 'testOrgId',
            orgName: 'Test SetData',
            planType: 'atlas',
          },
        ]);
      }

      beforeEach(() => renderComponent({ onChange }));

      it('filters the organizations based on the onChange callback', () => {
        fireEvent.click(getByTestId('org-trigger'));

        const input = getByTestId('org-filter-input');

        fireEvent.change(input, {
          target: { value: '2' },
        });

        const orgResult = getByTestId('org-option');
        expect(orgResult.innerHTML.includes('Test SetData')).toBe(true);
      });
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types work as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('does not error when only ProjectSelect values are passed to url prop', () => {
      <OrgSelect
        constructOrganizationURL={() => 'string'}
        urls={{ viewAllOrganizations: 'string', orgSettings: 'string' }}
      />;
    });
  });
});
