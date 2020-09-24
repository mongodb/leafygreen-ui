import { css, jsx } from '@emotion/core';
import { uiColors } from '@leafygreen-ui/palette';
import InlineDefinition from '@leafygreen-ui/inline-definition';

const flexContainer = css`
  display: flex;
  background-color: ${uiColors.gray.light3};
`;

function Definition() {
  return (
    <div>
      <div css={flexContainer}>
        <div>Prop:</div>
      </div>
    </div>
  );
}

function PropDefinition({ prop, type, defaultValue, description }) {
  return (
    <InlineDefinition
      definition={
        <Definition
          prop={prop}
          type={type}
          defaultvalue={defaultValue}
          description={description}
        />
      }
    >
      {prop}
    </InlineDefinition>
  );
}

export default PropDefinition;
