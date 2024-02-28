import React from 'react';

import { LogoProps } from './utils';
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

export const LogoNames = [
  'MongoDBLogoMark',
  'MongoDBLogo',
  'AtlasNavGraphic',
  'AtlasLogoLockup',
  'AtlasForGovernmentLogoLockup',
  'EnterpriseAdvancedLogoLockup',
  'CommunityEditionLogoLockup',
  'UniversityLogoLockup',
] as const;

export type LogoName = (typeof LogoNames)[number];

interface GenericLogoProps extends LogoProps {
  /**
   * The name of the logo to render
   * @required
   */
  name: LogoName;
}

/**
 * A generic logo component that accepts a logo name as well as other LogoProps.
 *
 * Note: For performance, it's recommended to import a specific logo explicitly rather than rely on this generic component
 */
const GenericLogo = React.forwardRef(
  (
    { name = 'MongoDBLogo', ...rest }: GenericLogoProps,
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
