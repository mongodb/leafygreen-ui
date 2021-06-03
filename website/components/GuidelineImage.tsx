import React from 'react';
import { css } from 'emotion';

function GuidelineImage({
  width,
  height,
  imageURL,
  className,
}: {
  width: string;
  height: string;
  imageURL: string;
}) {
  console.log(width);

  return (
    <div
      className={css`
        margin: 40px 0px;
        // width: ${width};
        ${typeof width === 'string' ? 'width: auto;' : width}
        height: ${height};
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
