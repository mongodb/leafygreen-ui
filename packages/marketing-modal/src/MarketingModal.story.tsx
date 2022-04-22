import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { radios, text, boolean, select } from '@storybook/addon-knobs';
import MarketingModal, { BlobPosition, GraphicStyle } from '.';
import { CloseIconColor } from '@leafygreen-ui/modal';

function Default() {
  const [open, setOpen] = useState(false);
  const buttonText = text('Button text', 'Okay');
  const linkText = text('Link text', 'Cancel');
  const darkMode = boolean('darkMode', false);
  const showBlob = boolean('Show blob', true);
  const blobPosition = select(
    'Blob position',
    Object.values(BlobPosition),
    'top left',
  );
  const closeIconColor = select(
    'Close icon color',
    Object.values(CloseIconColor),
    'default',
  );

  const graphicStyle = radios(
    'Graphic style example',
    { center: GraphicStyle.Center, fill: GraphicStyle.Fill },
    GraphicStyle.Center,
  );

  const graphicCenterImage = darkMode
    ? 'DataLake.png'
    : 'marketing-center-light.svg';
  const graphicFillImage = darkMode
    ? 'Realm_Rebrand_Image.png'
    : 'marketing-fill-light.jpg';

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <MarketingModal
        open={open}
        onButtonClick={() => setOpen(false)}
        onLinkClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        title="Introducing New Feature!"
        graphic={
          graphicStyle === GraphicStyle.Center ? (
            <img
              alt=""
              src={`examples/${graphicCenterImage}`}
              width={darkMode ? 275 : 278}
              height={darkMode ? 220 : 252.6}
            />
          ) : (
            <img alt="" src={`examples/${graphicFillImage}`} />
          )
        }
        graphicStyle={graphicStyle}
        buttonText={buttonText}
        linkText={linkText}
        darkMode={darkMode}
        closeIconColor={closeIconColor}
        showBlob={showBlob}
        blobPosition={blobPosition}
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here.
      </MarketingModal>
    </>
  );
}

storiesOf('Packages/MarketingModal', module).add('Default', () => <Default />);
