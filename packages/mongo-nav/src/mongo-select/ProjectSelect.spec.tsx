import React from 'react';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import ProjectSelect from './ProjectSelect';
import { dataFixtures, urlFixtures, constructProjectURL } from '../data';

// data
const { currentProject, projects } = dataFixtures;

const mongoSelectUrls = urlFixtures.mongoSelect;

describe('packages/mongo-select/ProjectSelect', () => {
  let getByTestId: RenderResult['getByTestId'];
  let queryByTestId: RenderResult['queryByTestId'];
  let queryAllByTestId: RenderResult['queryAllByTestId'];

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  describe('ProjectSelect', () => {
    const renderComponent = (props = {}) => {
      ({ getByTestId, queryByTestId, queryAllByTestId } = render(
        <ProjectSelect
          urls={mongoSelectUrls}
          data={projects}
          current={currentProject!}
          constructProjectURL={constructProjectURL}
          {...props}
        />,
      ));
    };

    describe('when rendered with default props', () => {
      beforeEach(renderComponent);

      it('displays the project select trigger with the current project name', () => {
        expect(
          getByTestId('project-select-active-project').textContent,
        ).toEqual('Demo Project 1');
      });

      describe('when clicking the current project trigger', () => {
        beforeEach(() => {
          fireEvent.click(getByTestId('project-select-trigger'));
        });

        it('displays a placeholder without an existing value', () => {
          expect(
            getByTestId('project-filter-input').getAttribute('placeholder'),
          ).toContain('Search for a Project...');
        });

        it('displays two projects', () => {
          const projectResults = queryAllByTestId('project-option');
          expect(projectResults.length).toEqual(2);
        });

        it('displays the correct names of each project', () => {
          const projectResults = queryAllByTestId('project-option');
          expect(projectResults[0].textContent).toContain('Demo Project');
          expect(projectResults[1].textContent).toContain('Demo Project 2');
        });

        it('displays the correct link to projects of each result', () => {
          const projectResults = queryAllByTestId('project-option');
          expect((projectResults[0] as HTMLAnchorElement).href).toBe(
            'https://cloud.mongodb.com/v2#/fakeProjectId1',
          );
          expect((projectResults[1] as HTMLAnchorElement).href).toBe(
            'https://cloud.mongodb.com/v2#/fakeProjectId2',
          );
        });

        it('indicates the current project', () => {
          const projectResults = queryAllByTestId('project-option');
          const currentProjectName = currentProject!.projectName;
          const currentResult = projectResults.filter(result =>
            result.textContent!.includes('(current)'),
          );
          expect(currentResult.length).toEqual(1);
          expect(currentResult[0].textContent).toEqual(
            `${currentProjectName} (current)`,
          );
        });
      });
    });

    describe('when a user filters projects', () => {
      beforeEach(renderComponent);

      beforeEach(() => {
        fireEvent.click(getByTestId('project-select-trigger'));
      });

      it('displays one project when only one matches the search', () => {
        const input = getByTestId('project-filter-input');

        fireEvent.change(input, {
          target: { value: '1' },
        });

        expect(queryAllByTestId('project-option').length).toBe(1);
      });

      it('displays no projects when none matches the search', () => {
        const input = getByTestId('project-filter-input');

        fireEvent.change(input, {
          target: { value: 'xx' },
        });

        expect(queryAllByTestId('project-option').length).toBe(0);
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
          queryByTestId('project-filter-input'),
        );

        fireEvent.click(getByTestId('project-select-trigger'));

        expect(getByTestId('project-filter-input').innerHTML).toEqual('');
      });
    });

    describe('when the onChange prop is set', () => {
      const onChange = jest.fn();
      beforeEach(() => renderComponent({ onChange }));

      it('does not filter the projects and calls the onChange callback', () => {
        fireEvent.click(getByTestId('project-select-trigger'));

        const input = getByTestId('project-filter-input');

        fireEvent.change(input, {
          target: { value: '1' },
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(queryAllByTestId('project-option').length).toBe(2);
      });
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types work as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('does not error when only ProjectSelect values are passed to url prop', () => {
      <ProjectSelect
        constructProjectURL={() => 'string'}
        urls={{ viewAllProjects: 'string', newProject: 'string' }}
      />;
    });
  });
});
