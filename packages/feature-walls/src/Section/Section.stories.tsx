import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryType,
} from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, Subtitle } from '@leafygreen-ui/typography';

import { Section } from '.';

const sampleText = {
  title: 'Title',
};

const removeStorybookPadding = css`
  margin: 0 -100px;
`;

const sectionChildContainerStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing[300]}px;
`;

const sectionChildrenContainerStyles = css`
  display: flex;
  gap: ${spacing[400]}px;
`;

const SectionChild = ({ index }: { index: number }) => {
  return (
    <div key={index} className={sectionChildContainerStyles}>
      <Subtitle>Lorem ipsum</Subtitle>
      <Body>
        Lorem ipsum dolor sit amet, consectetur ipsum et adipiscing elit, sed do
        eiusmod.
      </Body>
    </div>
  );
};

const generateSectionChildren = (numberToGenerate: number) => {
  return (
    <div className={sectionChildrenContainerStyles}>
      {Array.from(Array(numberToGenerate).keys()).map((_, i) => (
        <SectionChild key={i} index={i} />
      ))}
    </div>
  );
};

export default {
  title: 'Composition/FeatureWalls/Section',
  component: Section,
  decorators: [
    (StoryFn: React.ComponentType) => (
      <div className={removeStorybookPadding}>
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children'],
    },
  },
  args: {
    darkMode: false,
    renderInCard: false,
    title: sampleText.title,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    renderInCard: { control: 'boolean' },
    title: { control: 'text' },
  },
};

const Template: StoryType<typeof Section> = props => <Section {...props} />;

export const LiveExample = Template.bind({});
LiveExample.args = {
  children: generateSectionChildren(3),
};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};
