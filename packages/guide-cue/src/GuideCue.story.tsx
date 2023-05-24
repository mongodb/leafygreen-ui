/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { Align } from '@leafygreen-ui/popover';
import { transitionDuration } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { GuideCue, GuideCueProps } from '.';

/** A decorator for each generated story instance */
const instanceDecorator = (Instance: StoryFn) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const refEl = useRef(null);
  return (
    <div
      className={css`
        height: 350px;
        width: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        className={css`
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: 1px solid ${palette.gray.base};
        `}
        ref={refEl}
      >
        element ref
      </div>
      <Instance refEl={refEl} />
    </div>
  );
};

// @ts-expect-error - propType mismatch
const meta: StoryMetaType<typeof GuideCue> = {
  title: 'Components/GuideCue',
  component: GuideCue,
  decorators: [
    StoryFn => (
      <div>
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'refEl',
        'setOpen',
        'tooltipClassName',
        'open',
        'onPrimaryButtonClick',
      ],
    },
    generate: {
      props: {
        darkMode: [false, true],
        beaconAlign: Object.values(Align),
        tooltipAlign: ['top', 'bottom', 'left', 'right'],
        tooltipJustify: ['middle', 'start', 'end'],
      },
      args: {
        open: true,
        refEl: undefined,
      },
      decorator: instanceDecorator,
    },
    chromatic: {
      delay: transitionDuration.slowest,
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    numberOfSteps: {
      control: 'number',
    },
    currentStep: {
      control: 'number',
    },
    children: {
      control: 'text',
    },
    buttonText: {
      control: 'text',
    },
  },
  args: {
    title: 'New feature',
    children: 'This is a new feature. You should try it out',
    buttonText: 'Next',
    numberOfSteps: 4,
    currentStep: 2,
  },
};

export default meta;

const Template: StoryFn<GuideCueProps> = (args: GuideCueProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<null | HTMLDivElement>(null);
  const { children, darkMode } = args;

  // eslint-disable-next-line no-console
  const handleNext = () => console.log('next');

  // eslint-disable-next-line no-console
  const handleClose = () => console.log('close');

  return (
    <>
      <Button
        onClick={() => setOpen(o => !o)}
        className={css`
          margin-bottom: 100px;
        `}
        darkMode={darkMode}
      >
        Open me
      </Button>
      <div ref={triggerRef}>
        <Body darkMode={darkMode}>story refEl trigger</Body>
      </div>
      <GuideCue
        {...args}
        darkMode={darkMode}
        open={open}
        setOpen={setOpen}
        refEl={triggerRef}
        onPrimaryButtonClick={handleNext}
        onDismiss={handleClose}
        aria-labelledby="test"
      >
        {children}
      </GuideCue>
    </>
  );
};

export const LiveExample = Template.bind({});

const scrollableStyle = css`
  width: 800px;
  height: 100vh;
  background-color: #e8edeb;
  overflow: scroll;
  position: relative;
`;

const scrollableInnerStyle = css`
  position: relative;
  height: 130vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScrollableContainer: StoryFn<GuideCueProps> = (
  args: GuideCueProps,
) => {
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<null | HTMLDivElement>(null);
  const portalContainer = useRef<HTMLDivElement | null>(null);

  const { children, darkMode } = args;
  return (
    <div className={scrollableStyle}>
      <div className={scrollableInnerStyle} ref={portalContainer}>
        <>
          <Button
            onClick={() => setOpen(o => !o)}
            className={css`
              margin-bottom: 100px;
            `}
            darkMode={darkMode}
          >
            Open me
          </Button>
          <div ref={triggerRef}>
            <Body darkMode={darkMode}>story refEl trigger</Body>
          </div>
          <GuideCue
            {...args}
            darkMode={darkMode}
            open={open}
            setOpen={setOpen}
            refEl={triggerRef}
            portalContainer={portalContainer.current}
            scrollContainer={portalContainer.current}
          >
            {children}
          </GuideCue>
        </>
      </div>
    </div>
  );
};
ScrollableContainer.parameters = {
  chromatic: { disableSnapshot: true },
};

const spacing = css`
  margin-bottom: 30px;
`;

export const MultistepDemo: StoryFn<GuideCueProps> = (args: GuideCueProps) => {
  const { darkMode } = args;
  const [open, setOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  // For demo purposes all refs are created in this file
  const triggerRef1 = useRef<null | HTMLDivElement>(null);
  const triggerRef2 = useRef<null | HTMLDivElement>(null);
  const triggerRef3 = useRef<null | HTMLDivElement>(null);
  const triggers = [triggerRef1, triggerRef2, triggerRef3];
  const steps = triggers.length;

  const handleNext = () => {
    if (currentStep !== steps) {
      setCurrentStep(n => n + 1);
      setOpen(true);
    }
  };

  const handleDismiss = () => {
    // do something
    // eslint-disable-next-line no-console
    console.log('dismissed');
  };

  const handleReset = () => {
    setCurrentStep(1);
    setOpen(true);
  };

  return (
    <>
      <Button className={spacing} onClick={handleReset}>
        Begin tour
      </Button>
      {/* These don't need to be in the same container as the GuideCue component */}
      <div ref={triggerRef1}>
        <Body className={spacing} darkMode={darkMode}>
          story refEl trigger1
        </Body>
      </div>
      <div ref={triggerRef2}>
        <Body className={spacing} darkMode={darkMode}>
          story refEl trigger2
        </Body>
      </div>
      <div ref={triggerRef3}>
        <Body className={spacing} darkMode={darkMode}>
          story refEl trigger3
        </Body>
      </div>
      <GuideCue
        darkMode={darkMode}
        open={open}
        setOpen={setOpen}
        refEl={triggers[currentStep - 1]}
        numberOfSteps={steps}
        currentStep={currentStep}
        onPrimaryButtonClick={() => handleNext()}
        onDismiss={() => handleDismiss()}
        title="New feature"
      >
        This is a new feature. You should try it out
      </GuideCue>
    </>
  );
};

MultistepDemo.parameters = {
  chromatic: { disableSnapshot: true },
  controls: {
    exclude: [
      'title',
      'children',
      'buttonText',
      'numberOfSteps',
      'currentStep',
      'tooltipAlign',
      'tooltipJustify',
      'beaconAlign',
      'className',
      'refEl',
      'setOpen',
      'tooltipClassName',
      'open',
      'onDismiss',
      'onPrimaryButtonClick',
    ],
  },
};

export const Generated = () => {};
