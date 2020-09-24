/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { spacing } from '@leafygreen-ui/tokens';
import { InlineCode } from '@leafygreen-ui/typography';
import InlineDefinition from '@leafygreen-ui/inline-definition';

interface PropDefinitionProps {
  defaultValue: string;
  prop: string;
  type: string;
  description: string;
}

const propBlockContainer = css`
  width: 50%;
  margin-bottom: ${spacing[3]}px;
`;

const propBlockPStyle = css`
  margin: 0;
`;

const propBlockCodeStyle = css`
  font-weight: bold;
`;

function PropBlock({ header, value }: { header: string; value: string }) {
  return (
    <div css={propBlockContainer}>
      <p css={propBlockPStyle}>{header}</p>
      <InlineCode css={propBlockCodeStyle}>{value}</InlineCode>
    </div>
  );
}

const flexContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

const definitionContainer = css`
  width: 360px;
`;

const descriptionContainer = css`
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: -14px;
  background-color: white;
  padding: 10px 20px;
`;

function Definition({
  prop,
  type,
  defaultValue,
  description,
}: PropDefinitionProps) {
  return (
    <div css={definitionContainer}>
      <div css={flexContainer}>
        <PropBlock header="Prop" value={prop} />
        <PropBlock header="Type" value={type} />
        <PropBlock header="Default" value={defaultValue} />
      </div>
      <div css={descriptionContainer}>{description}</div>
    </div>
  );
}

const inlineDefinitionStyle = css`
  padding: 0;
`;

function PropDefinition({
  prop,
  type,
  defaultValue,
  description,
}: PropDefinitionProps) {
  return (
    <InlineDefinition
      open
      css={inlineDefinitionStyle}
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
