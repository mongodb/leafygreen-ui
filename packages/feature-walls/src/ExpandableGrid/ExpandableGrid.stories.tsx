import React, { useRef } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Description, Subtitle } from '@leafygreen-ui/typography';

import { ExpandableGrid, ExpandableGridProps } from '.';

const childContainerStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing[300]}px;
`;

const generateExpandableGridChildren = (numberToGenerate: number) => {
  return [...new Array(numberToGenerate)].map((_, i) => (
    <div key={i} className={childContainerStyles}>
      <Subtitle>Lorem ipsum {i + 1}</Subtitle>
      <Description>
        Lorem ipsum dolor sit amet, consectetur ipsum et adipiscing elit, sed do
        eiusmod.
      </Description>
    </div>
  ));
};

export default {
  title: 'Composition/FeatureWalls/ExpandableGrid',
  component: ExpandableGrid,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        maxColumns: [2, 3, 4],
      },
    },
  },
  args: {
    darkMode: false,
    maxColumns: 3,
    numberOfChildren: 9,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    maxColumns: { control: 'radio' },
    numberOfChildren: {
      name: 'children.length',
      description:
        'This control is used to determine how many children elements should be rendered in the story. It is recommended that each instance should not exceed 3 rows.',
      control: {
        min: 3,
        max: 12,
        step: 1,
        type: 'number',
      },
    },
  },
};

type TemplateProps = ExpandableGridProps & {
  numberOfChildren: number;
};

const Template: StoryFn<TemplateProps> = ({ numberOfChildren, ...rest }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  return (
    <ExpandableGrid {...rest} ref={gridRef}>
      {generateExpandableGridChildren(numberOfChildren)}
    </ExpandableGrid>
  );
};

export const LiveExample = Template.bind({});
LiveExample.args = {};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = Template.bind({});
Generated.args = {
  children: generateExpandableGridChildren(6),
};
