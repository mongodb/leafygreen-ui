/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { CloseIconColor } from '@leafygreen-ui/modal';

import MarketingModal, { BlobPosition, GraphicStyle } from '.';

export default {
  title: 'Components/Modals/Marketing Modal',
  component: MarketingModal,
  args: {
    buttonText: 'Button Text',
    linkText: 'Link Text',
    title: 'Title Text',
    graphicStyle: 'center',
    children:
      'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.',
    closeIconColor: CloseIconColor.Default,
    className: css`
      z-index: 1;
    `,
  },
  argTypes: {
    open: { control: false },
    onClose: { control: false },
    graphic: { control: false },
    graphicStyle: {
      control: 'radio',
      options: Object.values(GraphicStyle),
    },
    closeIconColor: {
      control: 'radio',
      options: Object.values(CloseIconColor),
    },
    showBlob: { control: 'boolean' },
    blobPosition: {
      control: 'radio',
      options: Object.values(BlobPosition),
    },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
  },
} as Meta<typeof MarketingModal>;

const ControlledTemplate: ComponentStory<typeof MarketingModal> = ({
  graphicStyle,
  darkMode,
  ...args
}) => {
  const graphicCenterImage = 'marketing-center-light.svg';
  const graphicFillImage = darkMode
    ? 'marketing-fill-dark.jpg'
    : 'marketing-fill-light.jpg';
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        Open Modal
      </Button>
      <MarketingModal
        {...args}
        graphicStyle={graphicStyle}
        darkMode={darkMode}
        graphic={
          graphicStyle === GraphicStyle.Center ? (
            <img
              alt=""
              src={`examples/${graphicCenterImage}`}
              width={275}
              height={220}
            />
          ) : (
            <img alt="Marketing Modal" src={`examples/${graphicFillImage}`} />
          )
        }
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export const Basic = ControlledTemplate.bind({});
Basic.args = {
  open: true,
};
