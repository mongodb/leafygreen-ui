import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import { BaseLogoProps, LogoNames, SupportedColors } from './Logo.types';
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
  RealmLogoMark,
  UniversityLogoLockup,
} from '.';
import Logo, { LogoName } from '.';

const meta: StoryMetaType<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  decorators: [
    Story => (
      <div
        className={css`
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 40px 0;
        `}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        name: Object.values(LogoNames),
        color: Object.values(SupportedColors),
      },
      excludeCombinations: [
        {
          darkMode: false,
          color: SupportedColors.White,
        },
        {
          darkMode: false,
          color: SupportedColors.GreenBase,
        },
        {
          darkMode: true,
          color: SupportedColors.Black,
        },
        {
          darkMode: true,
          color: SupportedColors.GreenDark2,
        },
      ],
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    color: {
      control: 'radio',
      options: Object.values(SupportedColors),
    },
    name: {
      control: 'select',
      options: Object.values(LogoNames),
    },
  },
  args: {
    color: SupportedColors.GreenDark2,
    darkMode: false,
  },
};
export default meta;

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

export const LiveExample: StoryFn<BaseLogoProps & { name: LogoName }> = (
  args: BaseLogoProps & { name: LogoName },
) => {
  if (!args.name) {
    args = { ...args, name: 'MongoDBLogo' };
  }

  return <Logo {...args} />;
};
LiveExample.argTypes = {
  name: {
    control: 'select',
    options: LogoNames,
  },
};
LiveExample.args = {
  name: 'MongoDBLogoMark',
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

const Template = (
  LogoComponent: React.ForwardRefExoticComponent<
    Omit<BaseLogoProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >,
  args: BaseLogoProps,
) => {
  const containerStyle = css`
    ${divStyle}
  `;
  return (
    <div className={containerStyle}>
      <LogoComponent {...args} />
    </div>
  );
};

// Individual Components
export const MongoDB = (args: BaseLogoProps) => Template(MongoDBLogo, args);
export const Atlas = (args: BaseLogoProps) => Template(AtlasNavGraphic, args);
export const MongoDBMark = (args: BaseLogoProps) =>
  Template(MongoDBLogoMark, args);
export const AtlasLockup = (args: BaseLogoProps) =>
  Template(AtlasLogoLockup, args);
export const AtlasForGovernmentLockup = (args: BaseLogoProps) =>
  Template(AtlasForGovernmentLogoLockup, args);
export const EnterpriseAdvancedLockup = (args: BaseLogoProps) =>
  Template(EnterpriseAdvancedLogoLockup, args);
export const CommunityEditionLockup = (args: BaseLogoProps) =>
  Template(CommunityEditionLogoLockup, args);
export const UniversityLockup = (args: BaseLogoProps) =>
  Template(UniversityLogoLockup, args);

// Deprecated
// @ts-ignore deprecated component
export const AtlasMark = (args: BaseLogoProps) => Template(AtlasLogoMark, args);
AtlasMark.storyName = '[DEPRECATED] Atlas Mark';
// @ts-ignore deprecated component
export const RealmMark = (args: BaseLogoProps) => Template(RealmLogoMark, args);
RealmMark.storyName = '[DEPRECATED] Realm Mark';
// @ts-ignore deprecated component
export const ChartsMark = args => Template(ChartsLogoMark, args);
ChartsMark.storyName = '[DEPRECATED] Charts Mark';

export const Generated = () => {};
