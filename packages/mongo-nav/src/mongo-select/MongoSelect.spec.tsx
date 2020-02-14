import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import {
  nullableElement,
  nullableElementArray,
  Queries,
} from 'packages/lib/src/testHelpers';
import { OrgSelect, ProjectSelect } from './MongoSelect';
import {
  dataFixtures,
  urlFixtures,
  constructOrganizationURL,
  constructProjectURL,
} from '../data';
import { CurrentProjectInterface } from '../types';

// types
interface ExpectedElements {
  orgTrigger?: nullableElement;
  orgInput?: nullableElement;
  orgSettingsIcon?: nullableElement;
  orgResults?: nullableElementArray;
  projectTrigger?: nullableElement;
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

const currentProjectName = currentProject?.projectName;
const currentOrgName = currentOrganization?.orgName;

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
    expectedElements.orgInput = queryByTestId('org-select-input');
    expectedElements.orgSettingsIcon = queryByTestId('org-trigger-settings');
    expectedElements.orgResults = queryAllByTestId('org-result');
    expectedElements.projectTrigger = queryByTestId('project-trigger');
    expectedElements.projectInput = queryByTestId('project-select-input');
    expectedElements.projectResults = queryAllByTestId('project-result');
  };

  let onClick: jest.Mock;
  let onChange: jest.Mock;

  beforeEach(() => {
    onClick = jest.fn();
    onChange = jest.fn();
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
            urls={urlFixtures}
            onChange={onChange}
            onClick={onClick}
            {...props}
          />,
        ),
      );
    };

    describe('when rendered with default props', () => {
      beforeEach(renderComponent);

      it('displays the org select trigger with the current org name', () => {
        const { orgTrigger } = expectedElements;
        expect(orgTrigger).toBeVisible();
        expect(orgTrigger?.textContent).toContain(currentOrgName);
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
            constructOrganizationURL('5d729a93'),
          );
          expect((orgResults?.[1] as HTMLAnchorElement).href).toBe(
            constructOrganizationURL('5e0fa79'),
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
  });

  describe('ProjectSelect', () => {
    const renderComponent = (props = {}) => {
      setQueries(
        render(
          <ProjectSelect
            urls={urlFixtures}
            data={projects}
            current={currentProject as CurrentProjectInterface}
            onClick={onClick}
            onChange={onChange}
            constructProjectURL={constructProjectURL}
            {...props}
          />,
        ),
      );
    };

    describe('when rendered with default props', () => {
      beforeEach(renderComponent);

      it('displays the org select trigger with the current project name', () => {
        const { projectTrigger } = expectedElements;
        expect(projectTrigger).toBeInTheDocument();
        expect(projectTrigger?.textContent).toContain(currentProjectName);
      });

      describe('when clicking the current organization trigger', () => {
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

        it('displays two organization results', () => {
          const { projectResults } = expectedElements;
          expect(projectResults?.length).toEqual(2);
        });

        it('displays the correct names of each result', () => {
          const { projectResults } = expectedElements;
          expect(projectResults?.[0]?.textContent).toContain('Demo Project');
          expect(projectResults?.[1]?.textContent).toContain('Demo Project 2');
        });

        it('displays the correct link to projects of each result', () => {
          const { projectResults } = expectedElements;
          expect((projectResults?.[0] as HTMLAnchorElement).href).toBe(
            constructProjectURL('5d729a93'),
          );
          expect((projectResults?.[1] as HTMLAnchorElement).href).toBe(
            constructProjectURL('5e0fa79'),
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
  });
});
