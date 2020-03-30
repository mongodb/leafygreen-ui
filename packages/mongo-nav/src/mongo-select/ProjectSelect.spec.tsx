import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/dom';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import {
  nullableElement,
  nullableElementArray,
  Queries,
} from 'packages/lib/src/testHelpers';
import ProjectSelect from './ProjectSelect';
import { dataFixtures, urlDefaults, constructProjectURL } from '../data';
import { CurrentProjectInterface } from '../types';

// types
interface ExpectedElements {
  projectTrigger?: nullableElement;
  projectTriggerText?: nullableElement;
  projectInput?: nullableElement;
  projectResults?: nullableElementArray;
}

// data
const { currentProject, projects } = dataFixtures;

const mongoSelectUrls = urlDefaults.mongoSelect;

describe('packages/mongo-select/ProjectSelect', () => {
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

  describe('ProjectSelect', () => {
    const renderComponent = (props = {}) => {
      setQueries(
        render(
          <ProjectSelect
            urls={mongoSelectUrls}
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
        expect(projectTriggerText?.textContent).toEqual('Demo Project 1');
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

        it('indicates the current project', () => {
          const { projectResults } = expectedElements;
          const currentProjectName = currentProject?.projectName;
          const currentResult = projectResults?.filter(result =>
            result?.textContent?.includes('(current)'),
          );
          expect(currentResult?.length).toEqual(1);
          expect(currentResult?.[0]?.textContent).toEqual(
            `${currentProjectName} (current)`,
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

      beforeEach(() => {
        fireEvent.click(expectedElements.projectTrigger as HTMLElement);
        setExpectedElements();
      });

      it('displays one project when only one matches the search', () => {
        const input = expectedElements!.projectInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: '1' },
        });

        act(setExpectedElements);

        expect(expectedElements!.projectResults!.length).toBe(1);
      });

      it('displays no projects when none matches the search', () => {
        const input = expectedElements!.projectInput;

        fireEvent.change(input as HTMLElement, {
          target: { value: 'xx' },
        });

        act(setExpectedElements);

        expect(expectedElements!.projectResults!.length).toBe(0);
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
          expect(expectedElements!.projectInput).not.toBeInTheDocument();
        });

        fireEvent.click(expectedElements.projectTrigger as Element);
        setExpectedElements();

        expect(expectedElements!.projectInput).toBeInTheDocument();
        expect(expectedElements!.projectInput!.innerHTML).toEqual('');
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
