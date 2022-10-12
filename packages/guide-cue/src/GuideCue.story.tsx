import React, { useRef, useState } from 'react';
import { ComponentStory } from '@storybook/react';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { GuideCue } from '.';
import { GuideCueProps } from './types';
import { Body } from '@leafygreen-ui/typography';

export default {
  title: 'Components/GuideCue',
  component: GuideCue,
  parameters: {
    controls: {
      exclude: [
        'className',
        'refEl',
        'setOpen',
        'tooltipClassName',
        'open',
        'onDismiss',
        'onPrimaryButtonClick',
      ],
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

const Template: ComponentStory<typeof GuideCue> = args => {
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

export const Default = Template.bind({});

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

export const ScrollableContainer = (args: GuideCueProps) => {
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

const spacing = css`
  margin-bottom: 30px;
`;

export const MultistepDemo = (args: GuideCueProps) => {
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
