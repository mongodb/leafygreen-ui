import React from 'react';

import { Disclaimer, Link } from '@leafygreen-ui/typography';

import { linkStyles } from './DisclaimerText.styles';
import { type DisclaimerTextProps } from './DisclaimerText.types';

const DISCLAIMER_TEXT = 'AI can make mistakes, so review for accuracy.';
const LEARN_MORE_TEXT = 'Learn more';
const LEARN_MORE_URL = 'https://www.mongodb.com/docs/generative-ai-faq/';

export const DisclaimerText = ({ className, ...rest }: DisclaimerTextProps) => (
  <Disclaimer className={className} {...rest}>
    {DISCLAIMER_TEXT}{' '}
    <Link className={linkStyles} href={LEARN_MORE_URL}>
      {LEARN_MORE_TEXT}
    </Link>
  </Disclaimer>
);

DisclaimerText.displayName = 'DisclaimerText';
