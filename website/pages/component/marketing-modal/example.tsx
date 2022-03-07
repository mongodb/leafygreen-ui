import React, { useState } from 'react';
import { css } from '@emotion/css';
import Button from '@leafygreen-ui/button';
import MarketingModal, {
  BlobPosition,
  GraphicStyle,
} from '@leafygreen-ui/marketing-modal';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';
import { CDN } from 'utils/routes';
import { CloseIconColor } from '@leafygreen-ui/modal';

const children =
  'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.';

const knobsConfig: KnobsConfigInterface<{
  title: string;
  graphicStyle: typeof GraphicStyle[keyof typeof GraphicStyle];
  buttonText: string;
  linkText: string;
  children: string;
  darkMode: boolean;
  closeIconColor: CloseIconColor;
  showBlob?: boolean;
  blobPosition: BlobPosition;
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
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  closeIconColor: {
    type: 'select',
    options: Object.values(CloseIconColor),
    default: CloseIconColor.Default,
    label: 'Close icon color',
  },
  showBlob: {
    type: 'boolean',
    default: false,
    label: 'Show blob',
  },
  blobPosition: {
    type: 'select',
    options: Object.values(BlobPosition),
    default: BlobPosition.TopLeft,
    label: 'Blob position',
  },
};

export default function MarketingModalLiveExample() {
  const [open, setOpen] = useState(false);

  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({
        title,
        graphicStyle,
        buttonText,
        linkText,
        children,
        darkMode,
        closeIconColor,
        showBlob,
        blobPosition,
      }) => {
        const graphicCenterImage = darkMode
          ? 'DataLake.png'
          : 'marketing-center-light.svg';
        const graphicFillImage = darkMode
          ? 'Realm_Rebrand_Image.png'
          : 'marketing-fill-light.jpg';

        return (
          <>
            <Button onClick={() => setOpen(!open)}>Open Modal</Button>
            <MarketingModal
              darkMode={darkMode}
              open={open}
              onButtonClick={() => setOpen(false)}
              onLinkClick={() => setOpen(false)}
              onClose={() => setOpen(false)}
              title={title}
              className={css`
                z-index: 1;
              `}
              graphic={
                graphicStyle === GraphicStyle.Center ? (
                  <img
                    alt=""
                    src={`${CDN}/images/examples/${graphicCenterImage}`}
                    width={darkMode ? 275 : 278}
                    height={darkMode ? 220 : 252.6}
                  />
                ) : (
                  <img
                    alt=""
                    src={`${CDN}/images/examples/${graphicFillImage}`}
                  />
                )
              }
              graphicStyle={graphicStyle}
              buttonText={buttonText}
              linkText={linkText}
              closeIconColor={closeIconColor}
              showBlob={showBlob}
              blobPosition={blobPosition}
            >
              {children}
            </MarketingModal>
          </>
        );
      }}
    </LiveExample>
  );
}
