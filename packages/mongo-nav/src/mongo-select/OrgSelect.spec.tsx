import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/dom';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import {
  nullableElement,
  nullableElementArray,
  Queries,
} from 'packages/lib/src/testHelpers';
import OrgSelect from './OrgSelect';
import { dataFixtures, urlFixtures, constructOrganizationURL } from '../data';
import { OnChangeInterface } from '../types';

// types
interface ExpectedElements {
  orgTrigger?: nullableElement;
  orgTriggerText?: nullableElement;
  orgInput?: nullableElement;
  orgSettingsIcon?: nullableElement;
  orgResults?: nullableElementArray;
}

// data
const { currentOrganization, organizations } = dataFixtures;

const mongoSelectUrls = urlFixtures.mongoSelect;

describe('packages/mongo-select/OrgSelect', () => {
  const queries: Queries = {};
  const expectedElements: ExpectedElements = {};

  const setQueries = ({ queryByTestId, queryAllByTestId }: Queries) => {
    Object.assign(queries, { queryByTestId, queryAllByTestId });
    setExpectedElements();
  };

  const setExpectedElements = () => {
    const {
      queryByTestId = () => null,
      queryAllByTestId = () => null,
    } = queries;

    expectedElements.orgTrigger = queryByTestId('org-trigger');
    expectedElements.orgTriggerText = queryByTestId('org-select-active-org');
    expectedElements.orgInput = queryByTestId('org-filter-input');
    expectedElements.orgSettingsIcon = queryByTestId('org-trigger-settings');
    expectedElements.orgResults = queryAllByTestId('org-option');
  };

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  describe('OrgSelect', () => {
    const renderComponent = (props = {}) => {
      setQueries(
        render(
          <OrgSelect
            current={currentOrganization}
            data={organizations}
            constructOrganizationURL={constructOrganizationURL}
            urls={mongoSelectUrls}
            {...props}
          />,
        ),
      );
    };

    describe('when rendered with default props', () => {
      beforeEach(renderComponent);

      it('displays the org select trigger with the current org name', () => {
        const { orgTriggerText } = expectedElements;
        expect(orgTriggerText).toBeVisible();
        expect(orgTriggerText?.textContent).toEqual('Demo Organization');
      });

      describe('when clicking the current organization trigger', () => {
        beforeEach(() => {
          const { orgTrigger } = expectedElements;
          fireEvent.click(orgTrigger as Element);
          setExpectedElements();
        });

        it('displays a search input with a placeholder', () => {
          const { orgInput } = expectedElements;
          expect(orgInput).toBeInTheDocument();
          expect(orgInput?.getAttribute('placeholder')).toContain(
            'Search for an Organization...',
          );
        });

        it('displays two organization results', () => {
          const { orgResults } = expectedElements;
          expect(orgResults?.length).toEqual(2);
        });

        it('displays the correct names of each result', () => {
          const { orgResults } = expectedElements;
          expect(orgResults?.[0]?.textContent).toContain('Demo Organization');
          expect(orgResults?.[1]?.textContent).toContain('Demo Organization 2');
        });

        it('displays the correct org type of each result', () => {
          const { orgResults } = expectedElements;
          expect(orgResults?.[0]?.textContent).toContain('Atlas');
          expect(orgResults?.[1]?.textContent).toContain('Cloud Manager');
        });

        it('displays the correct link to projects of each result', () => {
          const { orgResults } = expectedElements;
          expect((orgResults?.[0] as HTMLAnchorElement).href).toBe(
            'https://cloud.mongodb.com/v2#/org/fakeOrgId1/projects',
          );
          expect((orgResults?.[1] as HTMLAnchorElement).href).toBe(
            'https://cloud.mongodb.com/v2#/org/fakeOrgId2/projects',
          );
        });

        it('renders the logo associated with the planType', () => {
          const { orgResults } = expectedElements;
          expect((orgResults?.[0] as HTMLAnchorElement).innerHTML).toContain(
            'svg',
          );
        });

        it('indicates the current organization', () => {
          const { orgResults } = expectedElements;
          const currentOrgName = currentOrganization?.orgName;
          const currentResult = orgResults?.filter(result =>
            result?.textContent?.includes('(current)'),
          );
          expect(currentResult?.length).toEqual(1);
          expect(currentResult?.[0]?.textContent).toContain(
            `${currentOrgName} (current)`,
          );
        });

        describe('when clicking an org', () => {
          beforeEach(() => {
            const { orgResults } = expectedElements;
            fireEvent.click(orgResults?.[0] as Element);
          });

          it('closes the menu', async () => {
            await waitFor(() => {
              setExpectedElements();
              expect(expectedElements!.orgInput).not.toBeInTheDocument();
            });
          });
        });
      });
    });

    describe('when rendered in a disabled state', () => {
      beforeEach(() => renderComponent({ disabled: true }));

      it('displays the current org as "All Organizations"', () => {
        const { orgTrigger } = expectedElements;
        expect(orgTrigger?.textContent).toContain('All Organizations');
      });

      it('does not display an org settings icon', () => {
        const { orgSettingsIcon } = expectedElements;
        expect(orgSettingsIcon).toBeNull();
      });
    });

    describe('when a user filters organizations', () => {
      beforeEach(renderComponent);

      beforeEach(() => {
        fireEvent.click(expectedElements.orgTrigger as HTMLElement);
        setExpectedElements();
      });

      it('displays one organization when only one matches the search', () => {
        const input = expectedElements!.orgInput;

        expect(input!.innerHTML).toEqual('');

        fireEvent.change(input as HTMLElement, {
          target: { value: '2' },
        });

        act(setExpectedElements);

        expect(expectedElements!.orgResults!.length).toBe(1);
      });

      it('displays no organizations when none matches the search', () => {
        const input = expectedElements!.orgInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: 'xx' },
        });

        act(setExpectedElements);

        expect(expectedElements!.orgResults!.length).toBe(0);
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
        await waitFor(() => {
          setExpectedElements();
          expect(expectedElements!.orgInput).not.toBeInTheDocument();
        });

        fireEvent.click(expectedElements.orgTrigger as Element);
        setExpectedElements();

        expect(expectedElements!.orgInput).toBeInTheDocument();
        expect(expectedElements!.orgInput!.innerHTML).toEqual('');
      });
    });

    describe('when all organizations have the same planType ', () => {
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
        fireEvent.click(expectedElements.orgTrigger as HTMLElement);
        setExpectedElements();
      });

      it('does not render the logo associated with the planType', () => {
        const { orgResults } = expectedElements;
        expect((orgResults?.[0] as HTMLAnchorElement).innerHTML).not.toContain(
          'svg',
        );
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

      it('it filters the organizations based on the onChange callback', () => {
        fireEvent.click(expectedElements.orgTrigger as HTMLElement);
        setExpectedElements();

        const input = expectedElements!.orgInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: '2' },
        });

        act(setExpectedElements);

        expect(expectedElements!.orgResults!.length).toBe(1);
        expect(
          expectedElements!.orgResults?.[0].innerHTML.includes('Test SetData'),
        ).toBe(true);
      });
    });
  });
});
