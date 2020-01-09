import React from 'react';
import OrgNav from './org-nav/index';
import { DataInterface, ActiveProduct } from './types';
interface MongoNavInterface {
  activeProduct: ActiveProduct;
  data: DataInterface;
  constructOrganizationURL: (orgID: string) => string;
  constructProjectURL: (orgID: string, projID: string) => string;
}

export default function MongoNav({
  activeProduct,
  data,
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
      />
    </>
  );
}
