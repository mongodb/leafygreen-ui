import React from 'react';
import { css } from '@emotion/css';

function GuidelineImage({
  imageURL,
  className,
}: {
  className: string;
  imageURL: string;
}) {
  return (
    <div
      className={css`
        margin: 40px 0px;
        background-image: url('${imageURL}');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        ${className}
      `}
    />
  );
}

GuidelineImage.displayName = 'GuidelineImage';

export default GuidelineImage;
