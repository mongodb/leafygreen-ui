import React from 'react';

import { LogoProps } from './Logo.types';
import {
  AtlasForGovernmentLogoLockup,
  AtlasLogoLockup,
  AtlasNavGraphic,
  CommunityEditionLogoLockup,
  EnterpriseAdvancedLogoLockup,
  MongoDBLogo,
  MongoDBLogoMark,
  UniversityLogoLockup,
} from '.';

/**
 * A generic logo component that accepts a logo name as well as other LogoProps.
 *
 * Note: For performance, it's recommended to import a specific logo explicitly rather than rely on this generic component
 */
const GenericLogo = React.forwardRef(
  (
    { name = 'MongoDBLogo', ...rest }: LogoProps,
    ref: React.Ref<SVGSVGElement> | undefined,
  ) => {
    const LogoMap = {
      MongoDBLogo,
      MongoDBLogoMark,
      AtlasNavGraphic,
      AtlasLogoLockup,
      AtlasForGovernmentLogoLockup,
      EnterpriseAdvancedLogoLockup,
      CommunityEditionLogoLockup,
      UniversityLogoLockup,
    };

    const Logo = LogoMap[name];

    return <Logo {...rest} ref={ref} />;
  },
);

GenericLogo.displayName = 'Logo';

export default GenericLogo;
