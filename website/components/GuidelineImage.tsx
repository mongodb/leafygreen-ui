import React from 'react';
import { css } from 'emotion';

function GuidelineImage({
  width,
  height,
  imageURL,
}: {
  width: string;
  height: string;
  imageURL: string;
}) {
  return (
    <div
      className={css`
        margin: 40px 0px;
        width: ${width};
        height: ${height};
        background-image: url('${imageURL}');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
      `}
    />
  );
}

GuidelineImage.displayName = 'GuidelineImage';

export default GuidelineImage;
