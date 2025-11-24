import React from 'react';

import { Disclaimer, Link } from '@leafygreen-ui/typography';

import { linkStyles } from './DisclaimerText.styles';
import { type DisclaimerTextProps } from './DisclaimerText.types';

const DISCLAIMER_TEXT = 'Review answers for accuracy. See our ';
const LEARN_MORE_TEXT = 'AI and data usage FAQ';
const LEARN_MORE_URL = 'https://www.mongodb.com/docs/generative-ai-faq/';

export const DisclaimerText = ({ className, ...rest }: DisclaimerTextProps) => (
  <Disclaimer className={className} {...rest}>
    {DISCLAIMER_TEXT}
    <Link className={linkStyles} href={LEARN_MORE_URL}>
      {LEARN_MORE_TEXT}
    </Link>
  </Disclaimer>
);

DisclaimerText.displayName = 'DisclaimerText';
