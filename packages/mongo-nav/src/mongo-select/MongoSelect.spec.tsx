import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import {
  nullableElement,
  nullableElementArray,
  Queries,
} from 'packages/lib/src/testHelpers';
import { OrgSelect, ProjectSelect } from './MongoSelect';
import {
  dataFixtures,
  urlDefaults,
  constructOrganizationURL,
  constructProjectURL,
} from '../data';
import { CurrentProjectInterface } from '../types';

// types
interface ExpectedElements {
  orgTrigger?: nullableElement;
  orgTriggerText?: nullableElement;
  orgInput?: nullableElement;
  orgSettingsIcon?: nullableElement;
  orgResults?: nullableElementArray;
  projectTrigger?: nullableElement;
  projectTriggerText?: nullableElement;
  projectInput?: nullableElement;
  projectResults?: nullableElementArray;
}

// data
const {
  currentOrganization,
  currentProject,
  organizations,
  projects,
} = dataFixtures;

describe('packages/mongo-select', () => {
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
    expectedElements.projectTrigger = queryByTestId('project-select-trigger');
    expectedElements.projectTriggerText = queryByTestId(
      'project-select-active-project',
    );
    expectedElements.projectInput = queryByTestId('project-filter-input');
    expectedElements.projectResults = queryAllByTestId('project-option');
  };

  let onClick: jest.Mock;

  beforeEach(() => {
    onClick = jest.fn();
  });

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
            urls={urlDefaults}
            onClick={onClick}
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

        describe('when clicking an org', () => {
          beforeEach(() => {
            const { orgResults } = expectedElements;
            onClick.mockClear();
            fireEvent.click(orgResults?.[0] as Element);
            setExpectedElements();
          });

          it('calls the on click handler', () => {
            expect(onClick).toHaveBeenCalledTimes(1);
          });
        });
      });
    });

    describe('when rendered in a disabled state', () => {
      beforeEach(() => renderComponent({ disabled: true }));

      it('displays the menu trigger as disabled', () => {
        const { orgTrigger } = expectedElements;
        expect((orgTrigger as HTMLButtonElement)?.disabled).toBeTruthy();
      });

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

      it('displays one organization when only one matches the search', () => {
        fireEvent.click(expectedElements.orgTrigger as HTMLElement);
        setExpectedElements();

        const input = expectedElements!.orgInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: '2' },
        });

        act(setExpectedElements);

        expect(expectedElements!.orgResults!.length).toBe(1);
      });

      it('displays no organizations when none matches the search', () => {
        fireEvent.click(expectedElements.orgTrigger as HTMLElement);
        setExpectedElements();

        const input = expectedElements!.orgInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: 'xx' },
        });

        act(setExpectedElements);

        expect(expectedElements!.orgResults!.length).toBe(0);
      });
    });

    describe('when the onChange prop is set', () => {
      const onChange = jest.fn();
      beforeEach(() => renderComponent({ onChange }));

      it('it does not filter the projects and calls the onChange callback', () => {
        fireEvent.click(expectedElements.orgTrigger as HTMLElement);
        setExpectedElements();

        const input = expectedElements!.orgInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: '2' },
        });

        act(setExpectedElements);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(expectedElements!.orgResults!.length).toBe(2);
      });
    });
  });

  describe('ProjectSelect', () => {
    const renderComponent = (props = {}) => {
      setQueries(
        render(
          <ProjectSelect
            urls={urlDefaults}
            data={projects}
            current={currentProject as CurrentProjectInterface}
            onClick={onClick}
            constructProjectURL={constructProjectURL}
            {...props}
          />,
        ),
      );
    };

    describe('when rendered with default props', () => {
      beforeEach(renderComponent);

      it('displays the project select trigger with the current project name', () => {
        const { projectTriggerText } = expectedElements;
        expect(projectTriggerText).toBeInTheDocument();
        expect(projectTriggerText?.textContent).toEqual('Test Project');
      });

      describe('when clicking the current project trigger', () => {
        beforeEach(() => {
          const { projectTrigger } = expectedElements;
          fireEvent.click(projectTrigger as Element);
          setExpectedElements();
        });

        it('displays a placeholder without an existing value', () => {
          const { projectInput } = expectedElements;
          expect(projectInput).toBeInTheDocument();
          expect(projectInput?.getAttribute('placeholder')).toContain(
            'Search for a Project...',
          );
        });

        it('displays two projects', () => {
          const { projectResults } = expectedElements;
          expect(projectResults?.length).toEqual(2);
        });

        it('displays the correct names of each project', () => {
          const { projectResults } = expectedElements;
          expect(projectResults?.[0]?.textContent).toContain('Demo Project');
          expect(projectResults?.[1]?.textContent).toContain('Demo Project 2');
        });

        it('displays the correct link to projects of each result', () => {
          const { projectResults } = expectedElements;
          expect((projectResults?.[0] as HTMLAnchorElement).href).toBe(
            'https://cloud.mongodb.com/v2#/fakeProjectId1',
          );
          expect((projectResults?.[1] as HTMLAnchorElement).href).toBe(
            'https://cloud.mongodb.com/v2#/fakeProjectId2',
          );
        });

        describe('when clicking a project', () => {
          beforeEach(() => {
            const { projectResults } = expectedElements;
            onClick.mockClear();
            fireEvent.click(projectResults?.[0] as Element);
            setExpectedElements();
          });

          it('calls the on click handler', () => {
            expect(onClick).toHaveBeenCalledTimes(1);
          });
        });
      });
    });

    describe('when a user filters projects', () => {
      beforeEach(renderComponent);

      it('displays one project when only one matches the search', () => {
        fireEvent.click(expectedElements.projectTrigger as HTMLElement);
        setExpectedElements();

        const input = expectedElements!.projectInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: '1' },
        });

        act(setExpectedElements);

        expect(expectedElements!.projectResults!.length).toBe(1);
      });

      it('displays no projects when none matches the search', () => {
        fireEvent.click(expectedElements.projectTrigger as HTMLElement);
        setExpectedElements();

        const input = expectedElements!.projectInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: 'xx' },
        });

        act(setExpectedElements);

        expect(expectedElements!.projectResults!.length).toBe(0);
      });
    });

    describe('when the onChange prop is set', () => {
      const onChange = jest.fn();
      beforeEach(() => renderComponent({ onChange }));

      it('it does not filter the projects and calls the onChange callback', () => {
        fireEvent.click(expectedElements.projectTrigger as HTMLElement);
        setExpectedElements();

        const input = expectedElements!.projectInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: '1' },
        });

        act(setExpectedElements);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(expectedElements!.projectResults!.length).toBe(2);
      });
    });
  });
});
