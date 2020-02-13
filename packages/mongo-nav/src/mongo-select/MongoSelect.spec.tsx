import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  Matcher,
  MatcherOptions,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { OrgSelect, ProjectSelect } from './MongoSelect';
import { dataFixtures, urlFixtures } from '../data';
import { CurrentProjectInterface } from '../types';

type Nullable<T> = T | null;
type NullableArray<T> = Array<T> | null;

type queryFn<T> = (text: Matcher, options?: MatcherOptions | undefined) => T;
type queryType = queryFn<Nullable<HTMLElement>>;
type queryAllType = queryFn<NullableArray<HTMLElement>>;

interface Queries {
  queryByTestId?: queryType;
  queryAllByTestId?: queryAllType;
}

// By default, React Testing Library's queries return generic HTMLElements, and we will
// need to cast to a more specific type if we need to access tag-specific attributes
interface RenderedEls {
  orgTrigger?: Nullable<HTMLElement>;
  orgInput?: Nullable<HTMLElement>;
  orgSettingsIcon?: Nullable<HTMLElement>;
  orgResults?: NullableArray<HTMLElement>;
  projectTrigger?: Nullable<HTMLElement>;
  projectInput?: Nullable<HTMLElement>;
  projectResults?: NullableArray<HTMLElement>;
}

afterEach(cleanup);

describe('packages/mongo-select', () => {
  const {
    currentOrganization,
    currentProject,
    organizations,
    projects,
  } = dataFixtures;
  const queries: Queries = {};
  const expectedEls: RenderedEls = {};
  const currentProjectName = currentProject?.projectName;
  const currentOrgName = currentOrganization?.orgName;
  let onClick: jest.Mock;
  let onChange: jest.Mock;

  const setQueries = ({ queryByTestId, queryAllByTestId }: Queries) => {
    Object.assign(queries, { queryByTestId, queryAllByTestId });
  };

  beforeEach(() => {
    onClick = jest.fn();
    onChange = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  describe('OrgSelect', () => {
    const constructOrganizationURL = (orgId: string) =>
      `https://cloud-dev.mongodb.com/v2#/org/${orgId}/projects`;

    const setExpectedEls = () => {
      const { queryByTestId, queryAllByTestId } = queries;

      if (queryByTestId && queryAllByTestId) {
        expectedEls.orgTrigger = queryByTestId('org-trigger');
        expectedEls.orgInput = queryByTestId('org-select-input');
        expectedEls.orgSettingsIcon = queryByTestId(
          'org-trigger-settings-icon',
        );
        expectedEls.orgResults = queryAllByTestId('org-result');
      }
    };

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

      setExpectedEls();
    };

    describe('when rendered with default props', () => {
      beforeEach(() => {
        renderComponent();
      });

      it('displays the org select trigger with the current org name', () => {
        const { orgTrigger } = expectedEls;
        expect(orgTrigger).toBeVisible();
        expect(orgTrigger?.textContent).toContain(currentOrgName);
      });

      describe('when clicking the current organization trigger', () => {
        beforeEach(() => {
          const { orgTrigger } = expectedEls;
          fireEvent.click(orgTrigger as Element);
          setExpectedEls();
        });

        it('displays a search input with a placeholder', () => {
          const { orgInput } = expectedEls;
          expect(orgInput).toBeInTheDocument();
          expect(orgInput?.getAttribute('placeholder')).toContain(
            'Search for an Organization...',
          );
        });

        it('displays two organization results', () => {
          const { orgResults } = expectedEls;
          expect(orgResults?.length).toEqual(2);
        });

        it('displays the correct names of each result', () => {
          const { orgResults } = expectedEls;
          expect(orgResults?.[0]?.textContent).toContain('Demo Organization');
          expect(orgResults?.[1]?.textContent).toContain('Demo Organization 2');
        });

        it('displays the correct org type of each result', () => {
          const { orgResults } = expectedEls;
          expect(orgResults?.[0]?.textContent).toContain('Atlas');
          expect(orgResults?.[1]?.textContent).toContain('Cloud Manager');
        });

        it('displays the correct link to projects of each result', () => {
          const { orgResults } = expectedEls;
          const firstOrgLink = constructOrganizationURL('5d729a93');
          const secondOrgLink = constructOrganizationURL('5e0fa79');
          expect((orgResults?.[0] as HTMLAnchorElement).href).toBe(
            firstOrgLink,
          );
          expect((orgResults?.[1] as HTMLAnchorElement).href).toBe(
            secondOrgLink,
          );
        });

        describe('when clicking an org', () => {
          beforeEach(() => {
            const { orgResults } = expectedEls;
            fireEvent.click(orgResults?.[0] as Element);
            setExpectedEls();
          });

          it('calls the on click handler', () => {
            expect(onClick).toHaveBeenCalledTimes(1);
          });
        });
      });
    });

    describe('when rendered in a disabled state', () => {
      beforeEach(() => {
        renderComponent({ disabled: true });
      });

      it('displays the menu trigger as disabled', () => {
        const { orgTrigger } = expectedEls;
        expect((orgTrigger as HTMLButtonElement)?.disabled).toBeTruthy();
      });

      it('displays the current org as "All Organizations"', () => {
        const { orgTrigger } = expectedEls;
        expect(orgTrigger?.textContent).toContain('All Organizations');
      });

      it('does not display an org settings icon', () => {
        const { orgSettingsIcon } = expectedEls;
        expect(orgSettingsIcon).toBeNull();
      });
    });
  });

  describe('ProjectSelect', () => {
    const constructProjectURL = (projectId: string) =>
      `https://cloud-dev.mongodb.com/v2#/${projectId}`;

    const setExpectedEls = () => {
      const { queryByTestId, queryAllByTestId } = queries;

      if (queryByTestId && queryAllByTestId) {
        expectedEls.projectTrigger = queryByTestId('project-trigger');
        expectedEls.projectInput = queryByTestId('project-select-input');
        expectedEls.projectResults = queryAllByTestId('project-result');
      }
    };

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

      setExpectedEls();
    };

    describe('when rendered with default props', () => {
      beforeEach(() => {
        renderComponent();
      });

      it('displays the org select trigger with the current project name', () => {
        const { projectTrigger } = expectedEls;
        expect(projectTrigger).toBeInTheDocument();
        expect(projectTrigger?.textContent).toContain(currentProjectName);
      });

      describe('when clicking the current organization trigger', () => {
        beforeEach(() => {
          const { projectTrigger } = expectedEls;
          fireEvent.click(projectTrigger as Element);
          setExpectedEls();
        });

        it('displays a placeholder without an existing value', () => {
          const { projectInput } = expectedEls;
          expect(projectInput).toBeInTheDocument();
          expect(projectInput?.getAttribute('placeholder')).toContain(
            'Search for a Project...',
          );
        });

        it('displays two organization results', () => {
          const { projectResults } = expectedEls;
          expect(projectResults?.length).toEqual(2);
        });

        it('displays the correct names of each result', () => {
          const { projectResults } = expectedEls;
          expect(projectResults?.[0]?.textContent).toContain('Demo Project');
          expect(projectResults?.[1]?.textContent).toContain('Demo Project 2');
        });

        it('displays the correct link to projects of each result', () => {
          const { projectResults } = expectedEls;
          const firstProjectLink = constructProjectURL('5d729a93');
          const secondProjectLink = constructProjectURL('5e0fa79');
          expect((projectResults?.[0] as HTMLAnchorElement).href).toBe(
            firstProjectLink,
          );
          expect((projectResults?.[1] as HTMLAnchorElement).href).toBe(
            secondProjectLink,
          );
        });

        describe('when clicking a project', () => {
          beforeEach(() => {
            const { projectResults } = expectedEls;
            fireEvent.click(projectResults?.[0] as Element);
            setExpectedEls();
          });

          it('calls the on click handler', () => {
            expect(onClick).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});
