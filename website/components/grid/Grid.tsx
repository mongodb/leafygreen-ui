/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';

const getItemLayout = (val): SerializedStyles => {
  if (typeof val === 'number') {
    const width = (100 / 12) * val;
    const ratio = width > 100 ? '100%' : width < 0 ? '0' : `${width}%`;

    return css`
      flex-grow: 1;
      flex-basis: ${ratio};
      max-width: ${ratio};
      box-sizing: border-box;
      padding: 10px;
      margin: 0;
    `;
  }

  return css`
    flex-basis: auto;
    flex-grow: 0;
    max-width: none;
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
  `;
};

export function GridContainer({ children }) {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      `}
    >
      {children}
    </div>
  );
}

export function Grid({ children, ...rest }) {
  return (
    <div css={getItemLayout(4)} {...rest}>
      {children}
    </div>
  );
}
