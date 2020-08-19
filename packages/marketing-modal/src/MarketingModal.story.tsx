import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { radios, text } from '@storybook/addon-knobs';
import MarketingModal from '.';

function Default() {
  const [open, setOpen] = useState(false);
  const buttonText = text('Button text', 'Okay');
  const linkText = text('Link text', 'Cancel');

  const coverStyle = radios(
    'Cover style example',
    { default: 'default', cover: 'cover' },
    'default',
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
        cover={
          coverStyle === 'default' ? (
            <img alt="" src="examples/DataLake.png" width={275} height={220} />
          ) : (
            <img alt="" src="examples/Realm_Rebrand_Image.png" />
          )
        }
        coverStyle={coverStyle}
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
