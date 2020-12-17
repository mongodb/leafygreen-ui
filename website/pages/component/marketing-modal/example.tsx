import React, { useState } from 'react';
import MarketingModal, { GraphicStyle } from '@leafygreen-ui/marketing-modal';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const children =
  'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.';

const knobsConfig: KnobsConfigInterface<{
  title: string;
  graphicStyle: typeof GraphicStyle[keyof typeof GraphicStyle];
  buttonText: string;
  linkText: string;
  children: string;
}> = {
  title: {
    type: 'text',
    default: 'New Feature',
    label: 'Title',
  },
  graphicStyle: {
    type: 'select',
    options: Object.values(GraphicStyle),
    default: GraphicStyle.Center,
    label: 'Graphic Style',
  },
  buttonText: {
    type: 'text',
    default: 'Okay',
    label: 'Button Text',
  },
  linkText: {
    type: 'text',
    default: 'Cancel',
    label: 'Link Text',
  },
  children: {
    type: 'area',
    default: children,
    label: 'Children',
  },
};

export default function MarketingModalLiveExample() {
  const [open, setOpen] = useState(false);

  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ title, graphicStyle, buttonText, linkText, children }) => (
        <>
          <button onClick={() => setOpen(!open)}>Open Modal</button>
          <MarketingModal
            open={open}
            onButtonClick={() => setOpen(false)}
            onLinkClick={() => setOpen(false)}
            onClose={() => setOpen(false)}
            title={title}
            graphic={
              graphicStyle === GraphicStyle.Center ? (
                <img
                  alt=""
                  src="/images/examples/DataLake.png"
                  width={275}
                  height={220}
                />
              ) : (
                <img alt="" src="/images/examples/Realm_Rebrand_Image.png" />
              )
            }
            graphicStyle={graphicStyle}
            buttonText={buttonText}
            linkText={linkText}
          >
            {children}
          </MarketingModal>
        </>
      )}
    </LiveExample>
  );
}
