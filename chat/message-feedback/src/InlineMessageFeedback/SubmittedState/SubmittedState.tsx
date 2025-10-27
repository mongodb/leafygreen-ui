import React, { useEffect, useState } from 'react';

import CheckmarkWithCircle from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { InlineMessageFeedbackProps } from '..';

import {
  getContainerStyles,
  getIconFill,
  getTextStyles,
} from './SubmittedState.styles';

const FADE_OUT_DELAY = 3000;

export const SubmittedState = ({
  enableFadeAfterSubmit = false,
  submittedMessage,
}: Pick<
  InlineMessageFeedbackProps,
  'enableFadeAfterSubmit' | 'submittedMessage'
>) => {
  const { theme } = useDarkMode();
  const [shouldFade, setShouldFade] = useState(false);

  useEffect(() => {
    if (!enableFadeAfterSubmit) {
      return;
    }

    const fadeTimer = setTimeout(() => {
      setShouldFade(true);
    }, FADE_OUT_DELAY);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, [enableFadeAfterSubmit]);

  return (
    <div className={getContainerStyles(shouldFade)}>
      <CheckmarkWithCircle fill={getIconFill(theme)} />
      <Body className={getTextStyles(theme)}>{submittedMessage}</Body>
    </div>
  );
};
