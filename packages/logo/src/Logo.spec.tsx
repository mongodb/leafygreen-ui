import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import {
  MongoDBLogo,
  MongoDBLogoMark,
  AtlasNavGraphic,
  AtlasLogoLockup,
  AtlasLogoMark,
  AtlasForGovernmentLogoLockup,
  RealmLogoLockup,
  RealmLogoMark,
  ChartsLogoMark,
  EnterpriseAdvancedLogoLockup,
  CommunityEditionLogoLockup,
  UniversityLogoLockup,
} from '.';

const renderedComponents = {
  MongoDBLogo: <MongoDBLogo />,
  MongoDBLogoMark: <MongoDBLogoMark />,
  AtlasNavGraphic: <AtlasNavGraphic />,
  AtlasLogoLockup: <AtlasLogoLockup />,
  AtlasLogoMark: <AtlasLogoMark />,
  AtlasForGovernmentLogoLockup: <AtlasForGovernmentLogoLockup />,
  ChartsLogoMark: <ChartsLogoMark />,
  RealmLogoLockup: <RealmLogoLockup />,
  RealmLogoMark: <RealmLogoMark />,
  EnterpriseAdvancedLogoLockup: <EnterpriseAdvancedLogoLockup />,
  CommunityEditionLogoLockup: <CommunityEditionLogoLockup />,
  UniversityLogoLockup: <UniversityLogoLockup />,
} as const;

describe('packages/logo', () => {
  describe('a11y', () => {
    Object.keys(renderedComponents).map(component => {
      test(`${component} does not have any basic accessibility issues`, async () => {
        const { container } = render(
          renderedComponents[component as keyof typeof renderedComponents],
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
