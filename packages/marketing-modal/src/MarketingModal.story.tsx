/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { CloseIconColor } from '@leafygreen-ui/modal';

import MarketingModal, {
  BlobPosition,
  GraphicStyle,
  MarketingModalProps,
} from '.';

const meta: StoryMetaType<typeof MarketingModal> = {
  title: 'Components/Modals/Marketing Modal',
  component: MarketingModal,
  args: {
    darkMode: false,
    showBlob: true,
    blobPosition: BlobPosition.TopLeft,
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
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'open',
        'graphic',
        'onButtonClick',
        'onLinkClick',
      ],
    },
  },
};
export default meta;

export const LiveExample: StoryFn<MarketingModalProps> = ({
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
    <div>
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
              src={`/examples/${graphicCenterImage}`}
              width={275}
              height={220}
            />
          ) : (
            <img alt="Marketing Modal" src={`/examples/${graphicFillImage}`} />
          )
        }
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

const Template: StoryFn<MarketingModalProps> = ({
  graphicStyle,
  darkMode,
  ...args
}) => {
  const graphicCenterImage = 'marketing-center-light.svg';
  const graphicFillImage = darkMode
    ? 'marketing-fill-dark.jpg'
    : 'marketing-fill-light.jpg';
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      className={css`
        height: 100vh;
      `}
    >
      <MarketingModal
        {...args}
        graphicStyle={graphicStyle}
        darkMode={darkMode}
        graphic={
          graphicStyle === GraphicStyle.Center ? (
            <img
              alt=""
              src={`/examples/${graphicCenterImage}`}
              width={275}
              height={220}
            />
          ) : (
            <img alt="Marketing Modal" src={`/examples/${graphicFillImage}`} />
          )
        }
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export const GraphicStyleFill = Template.bind({});
GraphicStyleFill.args = {
  graphicStyle: GraphicStyle.Fill,
};

export const GraphicStyleCenter = Template.bind({});
GraphicStyleCenter.args = {
  graphicStyle: GraphicStyle.Center,
};

export const BlobTopRight = Template.bind({});
BlobTopRight.args = {
  blobPosition: BlobPosition.TopRight,
};

export const BlobBottomRight = Template.bind({});
BlobBottomRight.args = {
  blobPosition: BlobPosition.BottomRight,
};

export const GraphicStyleFillDarkMode = Template.bind({});
GraphicStyleFillDarkMode.args = {
  graphicStyle: GraphicStyle.Fill,
  darkMode: true,
};

export const GraphicStyleCenterDarkMode = Template.bind({});
GraphicStyleCenterDarkMode.args = {
  graphicStyle: GraphicStyle.Center,
  darkMode: true,
};

export const BlobTopRightDarkMode = Template.bind({});
BlobTopRightDarkMode.args = {
  blobPosition: BlobPosition.TopRight,
  darkMode: true,
};

export const BlobBottomRightDarkMode = Template.bind({});
BlobBottomRightDarkMode.args = {
  blobPosition: BlobPosition.BottomRight,
  darkMode: true,
};
