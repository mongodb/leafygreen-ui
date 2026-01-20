import React, { forwardRef, useMemo } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Disclaimer, Link } from '@leafygreen-ui/typography';

import { MessageSubcomponentProperty } from '../../shared.types';

import { Banner } from './Banner';
import { textStyles } from './VerifiedBanner.styles';
import { VerifiedBannerProps } from './VerifiedBanner.types';

export const VerifiedBanner = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, VerifiedBannerProps>(
    ({ verifier, verifiedAt, learnMoreUrl, ...rest }, fwdRef) => {
      const text = useMemo(() => {
        const textParts = [`Verified`];

        if (verifier) {
          textParts.push(`by ${verifier}`);
        }

        if (verifiedAt) {
          const formattedDate = verifiedAt.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          textParts.push(`on ${formattedDate}`);
        }

        return textParts.join(' ');
      }, [verifier, verifiedAt]);

      return (
        <Banner ref={fwdRef} variant="success" {...rest}>
          <Disclaimer className={textStyles}>
            {text}
            {learnMoreUrl && (
              <>
                {' | '}
                <Link href={learnMoreUrl}>Learn More</Link>
              </>
            )}
          </Disclaimer>
        </Banner>
      );
    },
  ),
  {
    displayName: 'VerifiedBanner',
    key: MessageSubcomponentProperty.VerifiedBanner,
  },
);
