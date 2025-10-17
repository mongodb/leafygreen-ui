import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryType,
} from '@lg-tools/storybook-utils';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { InfoBlock } from '..';

import { Variant } from './InfoBlock.types';

const sampleText = {
  badge: 'TAG',
  button: 'CTA Button',
  description:
    'Lorem ipsum dolor sit amet, consectetur ipsum et adipiscing elit, sed do eiusmod.',
  label: 'Label',
  tag: 'TAG',
} as const;

const getMedia = (variant: Variant, darkMode: boolean) => {
  const theme = darkMode ? 'dark' : 'light';

  if (variant === Variant.Icon) {
    return (
      <img
        alt="Asymmetric sync"
        src={`/examples/asymmetric-sync-${theme}.svg`}
      />
    );
  }

  if (variant === Variant.Image) {
    return (
      <img
        alt="General activities bootcamp"
        src={`/examples/general-activities-bootcamp-${theme}.svg`}
      />
    );
  }

  return <img alt="Product sample" src="/examples/feature-walls-sample.png" />;
};

export default {
  title: 'Composition/FeatureWalls/InfoBlock',
  component: InfoBlock,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'badgeProps',
        'badgePropsArray',
        'buttonProps',
        'media',
      ],
    },
    generate: {
      storyNames: [
        'CardInfoBlockLight',
        'CardInfoBlockDark',
        'IconInfoBlockLight',
        'IconInfoBlockDark',
        'ImageInfoBlockLight',
        'ImageInfoBlockDark',
      ],
      combineArgs: {
        buttonProps: [undefined, { children: sampleText.button }],
        description: [undefined, sampleText.description],
      },
    },
  },
  args: {
    badgeText: sampleText.badge,
    badgesText: `${sampleText.badge}1,${sampleText.badge}2,${sampleText.badge}3`,
    buttonText: sampleText.button,
    darkMode: false,
    description: sampleText.description,
    label: sampleText.label,
    variant: Variant.Card,
  },
  argTypes: {
    badgeText: {
      name: 'badgeProps.children',
      description:
        '**STORYBOOK ONLY**: This control is used to conditionally render a single badge in the card variant. Add and remove text to control badge rendering.\n\nNote: in code, this is controlled by badgeProps being provided or undefined',
      control: {
        type: 'text',
      },
    },
    badgesText: {
      name: 'badgePropsArray.child.children',
      description:
        '**STORYBOOK ONLY**: This control is used to conditionally render one or multiple badges in the image variant. Add and remove text to control badge rendering. You can use comma-separated values to render multiple badges.\n\nNote: in code, this is controlled by badgePropsArray being provided or undefined',
      control: {
        type: 'text',
      },
    },
    buttonText: {
      name: 'buttonProps.children',
      description:
        '**STORYBOOK ONLY**: This control is used to conditionally render a button. Add and remove text to control button rendering.\n\nNote: in code, this is controlled by buttonProps being provided or undefined',
      control: {
        type: 'text',
      },
    },
    darkMode: storybookArgTypes.darkMode,
    description: { control: 'text' },
    label: { control: 'text' },
    showMedia: {
      control: 'boolean',
      description:
        '**STORYBOOK ONLY**: This control is used to conditionally render media.\n\nNote: in code, this is controlled by media being provided or undefined',
    },
    variant: {
      options: Object.values(Variant),
      control: { type: 'select' },
    },
  },
};

const Template: StoryType<
  typeof InfoBlock,
  {
    badgeText: string;
    badgesText: string;
    buttonText: string;
    showMedia?: boolean;
  }
> = ({
  badgeProps: badgePropsProp,
  badgeText,
  badgePropsArray: badgePropsArrayProp,
  badgesText,
  buttonProps: buttonPropsProp,
  buttonText,
  media: mediaProp,
  showMedia = true,
  variant,
  ...rest
}) => {
  const { darkMode } = useDarkMode();

  const buttonProps =
    buttonPropsProp ||
    (buttonText
      ? // eslint-disable-next-line no-console
        { children: buttonText, onClick: () => console.log('Button clicked!') }
      : undefined);

  const badgeProps =
    badgePropsProp || (badgeText ? { children: badgeText } : undefined);

  const badgePropsArray =
    badgePropsArrayProp ||
    (badgesText
      ? badgesText
          .split(',')
          .filter(text => text.length > 0)
          .map(text => ({ children: text }))
      : undefined);

  const media = showMedia
    ? mediaProp || getMedia(variant, darkMode)
    : undefined;

  switch (variant) {
    case Variant.Card:
      return (
        <InfoBlock
          buttonProps={buttonProps}
          badgeProps={badgeProps}
          media={media}
          variant={variant}
          {...rest}
        />
      );
    case Variant.Icon:
      return (
        <InfoBlock
          buttonProps={buttonProps}
          media={media}
          variant={variant}
          {...rest}
        />
      );
    case Variant.Image:
      return (
        <InfoBlock
          buttonProps={buttonProps}
          badgePropsArray={badgePropsArray}
          media={media}
          variant={variant}
          {...rest}
        />
      );
    default:
      return <></>;
  }
};

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

const generatedStoryExcludedControlParams = [
  ...storybookExcludedControlParams,
  'badgeProps',
  'badgePropsArray',
  'buttonProps',
  'darkMode',
  'description',
  'label',
  'media',
  'variant',
];

export const CardInfoBlockLight: StoryType<typeof InfoBlock> = Template.bind(
  {},
);
CardInfoBlockLight.args = {
  variant: Variant.Card,
  darkMode: false,
  media: getMedia(Variant.Card, false),
  badgeProps: {
    children: sampleText.badge,
  },
};
CardInfoBlockLight.parameters = {
  controls: {
    exclude: generatedStoryExcludedControlParams,
  },
};

export const CardInfoBlockDark: StoryType<typeof InfoBlock> = Template.bind({});
CardInfoBlockDark.args = {
  variant: Variant.Card,
  darkMode: true,
  media: getMedia(Variant.Card, true),
  badgeProps: {
    children: sampleText.badge,
  },
};
CardInfoBlockDark.parameters = {
  controls: {
    exclude: generatedStoryExcludedControlParams,
  },
};

export const IconInfoBlockLight: StoryType<typeof InfoBlock> = Template.bind(
  {},
);
IconInfoBlockLight.args = {
  variant: Variant.Icon,
  darkMode: false,
  media: getMedia(Variant.Icon, false),
};
IconInfoBlockLight.parameters = {
  controls: {
    exclude: generatedStoryExcludedControlParams,
  },
};

export const IconInfoBlockDark: StoryType<typeof InfoBlock> = Template.bind({});
IconInfoBlockDark.args = {
  variant: Variant.Icon,
  darkMode: true,
  media: getMedia(Variant.Icon, true),
};
IconInfoBlockDark.parameters = {
  controls: {
    exclude: generatedStoryExcludedControlParams,
  },
};

export const ImageInfoBlockLight: StoryType<typeof InfoBlock> = Template.bind(
  {},
);
ImageInfoBlockLight.args = {
  variant: Variant.Image,
  darkMode: false,
  media: getMedia(Variant.Image, false),
  badgePropsArray: [
    {
      children: sampleText.badge,
    },
    {
      children: sampleText.badge,
    },
    {
      children: sampleText.badge,
    },
  ],
};
ImageInfoBlockLight.parameters = {
  controls: {
    exclude: generatedStoryExcludedControlParams,
  },
};

export const ImageInfoBlockDark: StoryType<typeof InfoBlock> = Template.bind(
  {},
);
ImageInfoBlockDark.args = {
  variant: Variant.Image,
  darkMode: true,
  media: getMedia(Variant.Image, true),
  badgePropsArray: [
    {
      children: sampleText.badge,
    },
    {
      children: sampleText.badge,
    },
    {
      children: sampleText.badge,
    },
  ],
};
ImageInfoBlockDark.parameters = {
  controls: {
    exclude: generatedStoryExcludedControlParams,
  },
};
