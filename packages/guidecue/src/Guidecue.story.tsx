import React, { useRef, useState } from 'react';
import { ComponentStory } from '@storybook/react';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import defaultArgTypes from '../../../stories/defaultArgTypes';
import Guidecue from '.';
import { useEffect } from '@storybook/addons';

export default {
  title: 'Components/Guidecue',
  component: Guidecue,
  parameters: {
    controls: {
      exclude: [
        'className',
        'refEl',
        'setOpen',
        'tooltipClassName',
        'open',
        'onClose',
        'onButtonClick',
      ],
    },
  },
  argTypes: {
    darkMode: defaultArgTypes.darkMode,
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

const Template: ComponentStory<typeof Guidecue> = args => {
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<null | HTMLDivElement>(null);
  const { children, darkMode } = args;

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

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
      <div
        ref={triggerRef}
        className={css`
          color: black;
          background: burlywood;
          text-align: center;
          padding: 5px;
          border-radius: 4px;
        `}
      >
        story refEl trigger
      </div>
      <Guidecue
        {...args}
        darkMode={darkMode}
        open={open}
        setOpen={setOpen}
        refEl={triggerRef}
        onButtonClick={handleNext}
        onClose={handleClose}
        aria-labelledby="test"
      >
        {children}
      </Guidecue>
    </>
  );
};

export const Default = Template.bind({});
