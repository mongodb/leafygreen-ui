/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import MarketingModal, {
  BlobPosition,
  GraphicStyle,
  MarketingModalProps,
} from '@leafygreen-ui/marketing-modal';
import { CloseIconColor } from '@leafygreen-ui/modal';
import { Link } from '@leafygreen-ui/typography';

import { DisclaimerModal } from '.';

const meta = {
  title: 'Chat/Disclaimer/DisclaimerModal',
  component: DisclaimerModal,
  // below is copied from MarketingModal; imports are not possible without a compilation of the story.tsx file
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
    disclaimer: 'This is a test disclaimer.',
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
    disclaimer: { control: 'text' },
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

export const Basic: StoryFn<MarketingModalProps> = ({
  graphicStyle,
  darkMode,
  disclaimer,
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
        disclaimer={
          disclaimer && (
            <>
              {disclaimer}
              {` `} <Link>Terms and conditions.</Link>
            </>
          )
        }
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};
Basic.parameters = {
  chromatic: { disableSnapshot: true },
};
