/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import MarketingModal, { BlobPosition, GraphicStyle } from '.';
import { CloseIconColor } from '@leafygreen-ui/modal';
import Button from '@leafygreen-ui/button';
import {
  Title,
  Subtitle as SbSubtitle,
  Description,
  ArgsTable,
  Primary,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

export default {
  title: 'Packages/Modals/Marketing Modal',
  component: MarketingModal,
  args: {
    buttonText: 'Button Text',
    linkText: 'Link Text',
    title: 'Title Text',
    graphicStyle: 'center',
    children:
      'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.',
  },
  argTypes: {
    open: {
      control: false,
    },
    setOpen: {
      control: false,
    },
    onClose: {
      control: false,
    },
    children: {
      control: 'string',
    },
    graphic: {
      control: false,
    },
    graphicStyle: {
      control: 'radio',
      options: [GraphicStyle.Center, GraphicStyle.Fill],
    },
    closeIconColor: {
      control: 'radio',
      options: Object.values(CloseIconColor),
    },
    showBlob: {
      control: 'boolean',
    },
    blobPosition: {
      control: 'radio',
      options: Object.values(BlobPosition),
    },
  },
  parameters: {
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <>
          <Title />
          <SbSubtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
} as Meta<typeof MarketingModal>;

const ControlledTemplate: ComponentStory<typeof MarketingModal> = ({
  graphicStyle,
  darkMode,
  ...args
}) => {
  const graphicCenterImage = darkMode
    ? 'DataLake.png'
    : 'marketing-center-light.svg';
  const graphicFillImage = darkMode
    ? 'Realm_Rebrand_Image.png'
    : 'marketing-fill-light.jpg';
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <MarketingModal
        {...args}
        graphicStyle={graphicStyle}
        darkMode={darkMode}
        graphic={
          graphicStyle === GraphicStyle.Center ? (
            <img
              alt=""
              src={`examples/${graphicCenterImage}`}
              width={darkMode ? 275 : 278}
              height={darkMode ? 220 : 252.6}
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

// const UncontrolledTemplate: ComponentStory<typeof MarketingModal> = ({
//   graphicStyle,
//   darkMode,
//   ...args
// }) => {
//   const graphicCenterImage = darkMode
//     ? 'DataLake.png'
//     : 'marketing-center-light.svg';
//   const graphicFillImage = darkMode
//     ? 'Realm_Rebrand_Image.png'
//     : 'marketing-fill-light.jpg';

//   return (
//     <MarketingModal
//       {...args}
//       graphicStyle={graphicStyle}
//       darkMode={darkMode}
//       graphic={
//         graphicStyle === GraphicStyle.Center ? (
//           <img
//             alt=""
//             src={`examples/${graphicCenterImage}`}
//             width={darkMode ? 275 : 278}
//             height={darkMode ? 220 : 252.6}
//           />
//         ) : (
//           <img alt="Marketing Modal" src={`examples/${graphicFillImage}`} />
//         )
//       }
//     />
//   );
// };
