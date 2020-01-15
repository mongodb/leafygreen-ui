import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MongoSelect from './MongoSelect';
import { Variant, PlanType } from '../types';

const generateId = () =>
  Math.random()
    .toString(36)
    .substring(7);

afterAll(cleanup);

describe('packages/mongo-select', () => {
  describe('when variant is set to organization', () => {
    const organizationData = [
      { orgId: generateId(), orgName: 'GlobalWork', planType: PlanType.Atlas },
      { orgId: generateId(), orgName: 'LocalWork', planType: PlanType.Atlas },
      {
        orgId: generateId(),
        orgName: 'Pizza on Demand',
        planType: PlanType.Atlas,
      },
      { orgId: generateId(), orgName: 'YouWork', planType: PlanType.Atlas },
      {
        orgId: generateId(),
        orgName: 'YouWork Enterprise',
        planType: PlanType.Cloud,
      },
    ];

    const current = organizationData[3];
    const onClick = jest.fn();

    const { getByText, getByPlaceholderText, getAllByTitle } = render(
      <MongoSelect
        current={current}
        onChange={jest.fn()}
        data={organizationData}
        onClick={onClick}
        variant={Variant.Organization}
        constructOrganizationURL={orgID => orgID}
        urls={{
          mongoSelect: {
            viewAllOrganizations: `https://cloud-dev.mongodb.com/v2#/preferences/organizations`,
            orgSettings: `https://cloud-dev.mongodb.com/v2#/org/${current.orgId}/settings/general`,
          },
        }}
      />,
    );

    test('by default, current organization is rendered', () => {
      const currentOrg = getByText(current.orgName);
      expect(currentOrg).toBeInTheDocument();
    });

    test('clicking current organization opens and closes the menu', () => {
      const currentOrg = getByText(current.orgName);
      fireEvent.click(currentOrg);
      const input = getByPlaceholderText('Search for an Organization...');
      expect(input).toBeInTheDocument();

      fireEvent.click(currentOrg);
      expect(input).not.toBeVisible();
    });

    test('typing in the input field changes what data is displayed', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[0];
      fireEvent.click(caretDown);

      const input = getByPlaceholderText('Search for an Organization...');
      expect(input).toBeInTheDocument();

      const pizza = getByText('Pizza on Demand');
      expect(pizza).toBeInTheDocument();

      const localWork = getByText('LocalWork');
      expect(localWork).toBeInTheDocument();

      fireEvent.change(input, {
        target: {
          value: 'work',
        },
      });

      expect(localWork).toBeInTheDocument();
      expect(pizza).not.toBeVisible();
    });

    test('onClick is fired when organization is clicked', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[0];
      fireEvent.click(caretDown);

      const localWork = getByText('LocalWork');
      fireEvent.click(localWork);

      expect(onClick).toHaveBeenCalled();
    });

    test('view all organizations href is changed, when the urls prop is set', () => {
      const viewAllOrganizations = getByText('View All Organizations')
        .parentNode?.parentNode;
      expect((viewAllOrganizations as HTMLAnchorElement)?.href).toBe(
        `https://cloud-dev.mongodb.com/v2#/preferences/organizations`,
      );
    });
  });

  describe('when variant is set to project', () => {
    const onClick = jest.fn();
    const projectData = [
      {
        projectId: generateId(),
        projectName: 'Core',
        orgId: generateId(),
        planType: PlanType.Atlas,
        alertsOpen: 2,
        chartsActivated: true,
      },
      {
        projectId: generateId(),
        projectName: 'London',
        orgId: generateId(),
        planType: PlanType.Atlas,
        alertsOpen: 2,
        chartsActivated: true,
      },
      {
        projectId: generateId(),
        projectName: 'Madrid',
        orgId: generateId(),
        planType: PlanType.Atlas,
        alertsOpen: 2,
        chartsActivated: false,
      },
    ];

    const currentProject = projectData[0];
    const viewAllProjectsHref = 'https://cloud.mongodb.com/test-link';

    const { getByText, getByPlaceholderText, getAllByTitle } = render(
      <MongoSelect
        onChange={jest.fn()}
        variant={Variant.Project}
        current={currentProject}
        onClick={onClick}
        data={projectData}
        constructProjectURL={(orgID, projID) => `${orgID + projID}`}
        urls={{
          mongoSelect: {
            viewAllProjects: viewAllProjectsHref,
            newProject: `https://cloud-dev.mongodb.com/v2#/org/${currentProject.orgId}/projects/create`,
          },
        }}
      />,
    );

    test('by default, current organization is rendered', () => {
      const current = getByText(currentProject.projectName);
      expect(current).toBeInTheDocument();
    });

    test('clicking current project opens and closes the menu', () => {
      const current = getByText(currentProject.projectName);
      fireEvent.click(current);
      const input = getByPlaceholderText('Search for a Project...');
      expect(input).toBeInTheDocument();

      fireEvent.click(current);
      expect(input).not.toBeVisible();
    });

    test('typing in the input field changes what data is displayed', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[1];
      fireEvent.click(caretDown);

      const input = getByPlaceholderText('Search for a Project...');
      expect(input).toBeInTheDocument();

      const london = getByText('London');
      expect(london).toBeInTheDocument();

      const madrid = getByText('Madrid');
      expect(madrid).toBeInTheDocument();

      fireEvent.change(input, {
        target: {
          value: 'london',
        },
      });

      expect(london).toBeInTheDocument();
      expect(madrid).not.toBeVisible();
    });

    test('onClick is fired when project is clicked', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[1];
      fireEvent.click(caretDown);
      const london = getByText('London');
      fireEvent.click(london);

      expect(onClick).toHaveBeenCalled();
    });

    test('view all projects link changes when the url overrides prop is set', () => {
      const caretDown = getAllByTitle('Caret Down Icon')[1];
      fireEvent.click(caretDown);

      const viewAllProjectsLink = (getByText('View All Projects')
        .parentNode as HTMLAnchorElement)?.href;

      expect(viewAllProjectsLink).toBe(viewAllProjectsHref);
    });

    test('add a project link changes when the host override prop is set', () => {
      const addProjectLink = (getByText('+ New Project')
        .parentNode as HTMLAnchorElement)?.href;

      expect(addProjectLink).toBe(
        `https://cloud-dev.mongodb.com/v2#/org/${currentProject.orgId}/projects/create`,
      );
    });
  });
});
