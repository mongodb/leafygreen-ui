/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import InlineDefinition from '@leafygreen-ui/inline-definition';

const flexContainer = css`
  display: flex;
  flex-wrap: wrap;
  background-color: ${uiColors.gray.base};
  padding: 0;
  width: 360px;
`;

function PropBlock({ type, value }) {
  return (
    <div
      css={css`
        width: 50%;
        margin-bottom: ${spacing[3]}px;
      `}
    >
      <p
        css={css`
          margin: 0;
        `}
      >
        {type}
      </p>
      <code
        css={css`
          font-weight: bold;
        `}
      >
        {value}
      </code>
    </div>
  );
}

function Definition({ prop, type, defaultValue, description }) {
  return (
    <div
      css={css`
        width: 360px;
      `}
    >
      <div css={flexContainer}>
        <PropBlock type="Prop" value={prop} />
        <PropBlock type="Type" value={type} />
        <PropBlock type="Default" value={defaultValue} />
      </div>
      {description}
    </div>
  );
}

function PropDefinition({ prop, type, defaultValue, description }) {
  return (
    <InlineDefinition
      open={true}
      definition={
        <Definition
          prop={prop}
          type={type}
          defaultValue={defaultValue}
          description={description}
        />
      }
    >
      {prop}
    </InlineDefinition>
  );
}

export default PropDefinition;
