import React from 'react';
import OrgNav from './org-nav/index';
import ProjNav from './proj-nav/index';
import { DataInterface, Product, OverridesInterface, NavItem } from './types';
interface MongoNavInterface {
  activeProduct: Product;
  activeNav?: NavItem;
  data: DataInterface;
  onOrganizationChange?: React.ChangeEventHandler;
  onProjectChange?: React.ChangeEventHandler;
  constructOrganizationURL: (orgID: string) => string;
  constructProjectURL: (orgID: string, projID: string) => string;
  overrides?: OverridesInterface;
  showProjNav?: boolean;
}

export default function MongoNav({
  activeProduct,
  activeNav,
  data,
  overrides,
  showProjNav = true,
  onOrganizationChange,
  onProjectChange,
  constructOrganizationURL = orgId =>
    `https://cloud.mongodb.com/v2#/org/${orgId}/projects`,
  constructProjectURL = (orgId, projectId) =>
    `https://cloud.mongodb.com/v2#/org/${projectId}/projects`,
}: MongoNavInterface) {
  return (
    <>
      <OrgNav
        account={data.account}
        activeProduct={activeProduct}
        current={data.currentOrganization}
        data={data.organizations}
        constructOrganizationURL={constructOrganizationURL}
        overrides={overrides}
        activeNav={activeNav}
        onOrganizationChange={onOrganizationChange}
      />
      {showProjNav && (
        <ProjNav
          current={data.currentProject}
          data={data.projects}
          constructProjectURL={constructProjectURL}
          overrides={overrides}
          alerts={data.currentProject.alertsOpen}
          onProjectChange={onProjectChange}
        />
      )}
    </>
  );
}
