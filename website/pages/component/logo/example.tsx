import React from 'react';

import LiveExample, { KnobsConfigInterface } from 'components/live-example';

import {
  AtlasForGovernmentLogoLockup,
  AtlasLogoLockup,
  CommunityEditionLogoLockup,
  EnterpriseAdvancedLogoLockup,
  MongoDBLogo,
  MongoDBLogoMark,
  UniversityLogoLockup,
} from '@leafygreen-ui/logo';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Overline } from '@leafygreen-ui/typography';

import { css, cx } from '@emotion/css';

const overlineStyle = css`
  margin-bottom: ${spacing[3]}px;
`;

const logoContainer = css`
  margin-bottom: ${spacing[6]}px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: ${spacing[4]}px;
  row-gap: ${spacing[6]}px;
`;

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type LogoProps = {
  color: 'white' | 'black' | 'green-dark-2' | 'green-base';
};

const knobsConfig: KnobsConfigInterface<LogoProps> = {
  color: {
    type: 'select',
    default: 'green-dark-2',
    options: ['white', 'black', 'green-dark-2', 'green-base'],
    label: 'Color',
  },
};

export default function LogoLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ color }) => (
        <div
          className={cx(
            css`
              padding: ${spacing[6]}px ${spacing[5]}px ${spacing[4]}px;
              border-radius: 20px;
            `,
            {
              [css`
                background-color: #001e2b;
              `]: ['white', 'green-base'].includes(color),
            },
          )}
        >
          <Overline
            className={cx(overlineStyle, {
              [css`
                color: ${uiColors.gray.light3};
              `]: ['white', 'green-base'].includes(color),
            })}
          >
            MongoDB Logo
          </Overline>

          <div className={logoContainer}>
            <MongoDBLogo color={color} height={54} />
          </div>

          <Overline
            className={cx(overlineStyle, {
              [css`
                color: ${uiColors.gray.light3};
              `]: ['white', 'green-base'].includes(color),
            })}
          >
            MongoDB Logo Mark
          </Overline>

          <div className={logoContainer}>
            <MongoDBLogoMark color={color} height={54} />
          </div>

          <Overline
            className={cx(overlineStyle, {
              [css`
                color: ${uiColors.gray.light3};
              `]: ['white', 'green-base'].includes(color),
            })}
          >
            Product Logo Lockups
          </Overline>
          <div className={logoContainer}>
            <AtlasLogoLockup color={color} height={54} />
            <AtlasForGovernmentLogoLockup color={color} height={54} />
            <EnterpriseAdvancedLogoLockup color={color} height={54} />
            <CommunityEditionLogoLockup color={color} height={54} />
            <UniversityLogoLockup color={color} height={36} />
          </div>
        </div>
      )}
    </LiveExample>
  );
}
