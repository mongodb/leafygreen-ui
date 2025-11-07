import React, { useRef } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, Subtitle } from '@leafygreen-ui/typography';

import { ExpandableGrid, ExpandableGridProps } from '.';

const childContainerStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing[300]}px;
`;

const ExpandableGridChild = ({ index }: { index: number }) => {
  return (
    <div className={childContainerStyles}>
      <Subtitle>Lorem ipsum {index + 1}</Subtitle>
      <Body>
        Lorem ipsum dolor sit amet, consectetur ipsum et adipiscing elit, sed do
        eiusmod.
      </Body>
    </div>
  );
};

const generateChildren = (numberOfChildren: number) =>
  [...new Array(numberOfChildren)].map((_, i) => (
    <ExpandableGridChild key={i} index={i} />
  ));

const meta: StoryMetaType<typeof ExpandableGrid> = {
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
      decorator: (Instance: React.ComponentType, context?: any) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <Instance />
        </LeafyGreenProvider>
      ),
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
export default meta;

type TemplateProps = ExpandableGridProps & {
  numberOfChildren: number;
};

const Template: StoryFn<TemplateProps> = ({ numberOfChildren, ...rest }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  return (
    <ExpandableGrid {...rest} ref={gridRef}>
      {generateChildren(numberOfChildren)}
    </ExpandableGrid>
  );
};

export const LiveExample: StoryObj<TemplateProps> = {
  render: Template,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Generated: StoryObj<TemplateProps> = {
  render: Template,
  args: {
    children: generateChildren(6),
  },
};
