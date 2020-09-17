import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { radios, text } from '@storybook/addon-knobs';
import MarketingModal, { GraphicStyle } from '.';

function Default() {
  const [open, setOpen] = useState(false);
  const buttonText = text('Button text', 'Okay');
  const linkText = text('Link text', 'Cancel');

  const graphicStyle = radios(
    'Graphic style example',
    { center: GraphicStyle.Center, fill: GraphicStyle.Fill },
    GraphicStyle.Center,
  );

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
            <img alt="" src="examples/DataLake.png" width={275} height={220} />
          ) : (
            <img alt="" src="examples/Realm_Rebrand_Image.png" />
          )
        }
        graphicStyle={graphicStyle}
        buttonText={buttonText}
        linkText={linkText}
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here.
      </MarketingModal>
    </>
  );
}

storiesOf('MarketingModal', module).add('Default', () => <Default />);
