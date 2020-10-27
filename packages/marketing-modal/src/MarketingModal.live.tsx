import React, { useState } from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import MarketingModal, {
  MarketingModalProps,
  GraphicStyle,
} from './MarketingModal';

const children =
  'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.';

const knobsConfig: KnobsConfigInterface<Partial<MarketingModalProps>> = {
  title: {
    type: 'text',
    default: 'Introducing New Feature',
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
    type: 'text',
    default: children,
    label: 'Children',
  },
} as const;

const MarketingModalLiveExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <>
          <button onClick={() => setOpen(!open)}>Open Modal</button>
          <MarketingModal
            open={open}
            onButtonClick={() => setOpen(false)}
            onLinkClick={() => setOpen(false)}
            onClose={() => setOpen(false)}
            title={props!.title!}
            graphic={
              props!.graphicStyle === GraphicStyle.Center ? (
                <img
                  alt=""
                  src="/examples/DataLake.png"
                  width={275}
                  height={220}
                />
              ) : (
                <img alt="" src="/examples/Realm_Rebrand_Image.png" />
              )
            }
            graphicStyle={props!.graphicStyle}
            buttonText={props!.buttonText!}
            linkText={props!.linkText!}
          >
            {props!.children}
          </MarketingModal>
        </>
      )}
    </LiveExample>
  );
};

export { MarketingModalLiveExample };
