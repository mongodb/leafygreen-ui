import React from 'react';
import { Meta } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import { LogoNames } from './Logo';
import { LogoProps,SupportedColors } from './utils';
import {
  AtlasForGovernmentLogoLockup,
  AtlasLogoLockup,
  AtlasLogoMark,
  AtlasNavGraphic,
  ChartsLogoMark,
  CommunityEditionLogoLockup,
  EnterpriseAdvancedLogoLockup,
  MongoDBLogo,
  MongoDBLogoMark,
  RealmLogoLockup,
  RealmLogoMark,
  UniversityLogoLockup,
} from '.';
import Logo, { LogoName } from '.';

export default {
  title: 'Components/Logo',
  parameters: {
    default: 'Default',
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    color: {
      default: SupportedColors.White,
      control: 'radio',
      options: Object.values(SupportedColors),
    },
    background: {
      default: palette.white,
      control: 'radio',
      options: [palette.white, palette.gray.dark3],
    },
  },
} as Meta<typeof Logo>;

const divStyle = css`
  min-width: 150px;
  min-height: 70px;
  padding: 24px;
  flex-shrink: 0;
  text-align: center;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem;
`;

const Template = (
  LogoComponent: React.FunctionComponent<LogoProps>,
  args: LogoProps & { background?: string },
) => {
  const containerStyle = css`
    ${divStyle}
    background-color: ${args.background};
  `;
  return (
    <div className={containerStyle}>
      <LogoComponent {...args} />
    </div>
  );
};

export const Default = (
  args: LogoProps & { name: LogoName } & { background?: string },
) => {
  if (!args.name) {
    args = { ...args, name: 'MongoDBLogo' };
  }

  return <Logo {...args} />;
};
Default.argTypes = {
  name: {
    control: 'select',
    options: LogoNames,
  },
};
Default.args = {
  name: 'MongoDBLogoMark',
};

export const MongoDB = (args: LogoProps) => Template(MongoDBLogo, args);
export const Atlas = (args: LogoProps) => Template(AtlasNavGraphic, args);
export const MongoDBMark = (args: LogoProps) => Template(MongoDBLogoMark, args);
export const AtlasLockup = (args: LogoProps) => Template(AtlasLogoLockup, args);
export const AtlasForGovernmentLockup = (args: LogoProps) =>
  Template(AtlasForGovernmentLogoLockup, args);
export const RealmLockup = (args: LogoProps) => Template(RealmLogoLockup, args);
export const EnterpriseAdvancedLockup = (args: LogoProps) =>
  Template(EnterpriseAdvancedLogoLockup, args);
export const CommunityEditionLockup = (args: LogoProps) =>
  Template(CommunityEditionLogoLockup, args);
export const UniversityLockup = (args: LogoProps) =>
  Template(UniversityLogoLockup, args);

// Deprecated
export const AtlasMark = (args: LogoProps) => Template(AtlasLogoMark, args);
AtlasMark.storyName = '[DEPRECATED] Atlas Mark';
export const RealmMark = (args: LogoProps) => Template(RealmLogoMark, args);
RealmMark.storyName = '[DEPRECATED] Realm Mark';
export const ChartsMark = (args: LogoProps) => Template(ChartsLogoMark, args);
ChartsMark.storyName = '[DEPRECATED] Charts Mark';
