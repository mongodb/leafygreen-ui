import React, { useMemo } from 'react';

import { Link } from '@leafygreen-ui/typography';

import { VerificationInfo } from '../Message';
import { MessageBanner } from '../MessageBanner';

import { verifiedAnswerBannerStyles } from './VerifiedAnswerBanner.styles';

export function VerifiedAnswerBanner({
  verifier,
  verifiedAt,
  learnMoreUrl,
}: VerificationInfo) {
  const text = useMemo(() => {
    const textParts = [`Answer Verified`];

    if (verifier) {
      textParts.push(`By ${verifier}`);
    }

    if (verifiedAt) {
      const formattedDate = verifiedAt.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      textParts.push(`On ${formattedDate}`);
    }

    return textParts.join(' ');
  }, [verifier, verifiedAt]);

  return (
    <MessageBanner className={verifiedAnswerBannerStyles} variant="success">
      {text}
      {learnMoreUrl ? (
        <>
          {' | '}
          <Link href={learnMoreUrl}>Learn More</Link>
        </>
      ) : null}
    </MessageBanner>
  );
}
