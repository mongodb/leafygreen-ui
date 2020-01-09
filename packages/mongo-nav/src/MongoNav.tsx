import React from 'react';
import OrgNav from './org-nav/index';
import { DataInterface, Product, OverridesInterface } from './types';
interface MongoNavInterface {
  activeProduct: Product;
  data: DataInterface;
  constructOrganizationURL: (orgID: string) => string;
  constructProjectURL: (orgID: string, projID: string) => string;
  overrides: OverridesInterface;
}

export default function MongoNav({
  activeProduct,
  data,
  overrides,
  constructOrganizationURL = p => 'blah',
  constructProjectURL = (p, q) => 'blah',
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
      />
    </>
  );
}
