import React, { useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryType,
} from '@lg-tools/storybook-utils';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { Accordion } from './Accordion';
import { AccordionButton } from './AccordionButton';
import { AccordionItem } from './AccordionItem';
import { AccordionPanel } from './AccordionPanel';

const sampleText = {
  button: 'Feature',
  panel:
    'Lorem ipsum dolor sit amet, consectetur ipsum et adipiscing elit, sed do eiusmod.',
} as const;

const defaultExcludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'defaultIndex',
  'index',
  'onIndexChange',
];

export default {
  title: 'Composition/FeatureWalls/Accordion',
  component: Accordion,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: defaultExcludedControls,
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
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
    children: [
      <AccordionItem key={`${sampleText.button} 1`}>
        <AccordionButton>{`${sampleText.button} 1`}</AccordionButton>
        <AccordionPanel>{sampleText.panel}</AccordionPanel>
      </AccordionItem>,
      <AccordionItem key={`${sampleText.button} 2`}>
        <AccordionButton>{`${sampleText.button} 2`}</AccordionButton>
        <AccordionPanel>{sampleText.panel}</AccordionPanel>
      </AccordionItem>,
      <AccordionItem key={`${sampleText.button} 3`}>
        <AccordionButton>{`${sampleText.button} 3`}</AccordionButton>
        <AccordionPanel>{sampleText.panel}</AccordionPanel>
      </AccordionItem>,
    ],
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    index: { control: 'number' },
  },
};

const Template: StoryType<typeof Accordion> = props => {
  return <Accordion {...props} />;
};

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Controlled: StoryType<typeof Accordion> = props => {
  const [accordionIndex, setAccordionIndex] = useState(0);

  return (
    <Accordion
      {...props}
      index={accordionIndex}
      onIndexChange={setAccordionIndex}
    />
  );
};
Controlled.parameters = {
  chromatic: { disableSnapshot: true },
  controls: {
    exclude: defaultExcludedControls,
  },
};

export const Generated = Template.bind({});
Generated.parameters = {
  controls: {
    exclude: defaultExcludedControls,
  },
};
