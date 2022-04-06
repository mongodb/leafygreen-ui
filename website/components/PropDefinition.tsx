import React from 'react';
import { css } from '@emotion/css';
import { spacing } from '@leafygreen-ui/tokens';
import { InlineCode } from '@leafygreen-ui/typography';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import formatType from 'utils/formatType';
import { palette } from '@leafygreen-ui/palette';

interface PropDefinitionProps {
  defaultValue: string;
  prop: string;
  type: string;
  description: string;
}

const propBlockContainer = css`
  margin-bottom: ${spacing[3]}px;
`;

const propBlockPStyle = css`
  margin: 0 0 ${spacing[1]}px 0;
`;

const propBlockCodeStyle = css`
  font-weight: bold;
  white-space: pre-wrap;
  padding: 0 4px;
  background-color: ${palette.gray.dark3};
  border-color: ${palette.gray.dark2};
  color: ${palette.gray.light1};
`;

function PropBlock({ header, value }: { header: string; value: string }) {
  return (
    <div className={propBlockContainer}>
      <p className={propBlockPStyle}>{header}</p>
      <InlineCode className={propBlockCodeStyle}>{value}</InlineCode>
    </div>
  );
}

PropBlock.displayName = 'PropBlock';

function TypeBlock({ header, value }: { header: string; value: string }) {
  return (
    <div className={propBlockContainer}>
      <p className={propBlockPStyle}>{header}</p>
      {formatType(value, undefined, propBlockCodeStyle)}
    </div>
  );
}

TypeBlock.displayName = 'TypeBlock';

const flexContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${spacing[3]}px;
`;

const definitionContainer = css`
  width: 360px;
`;

const descriptionContainer = css`
  background-color: ${palette.black};
  padding-top: 10px;
  color: ${palette.gray.light1};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: calc(100% + ${spacing[3]}px * 2);
    top: 0;
    left: -${spacing[3]}px;
    background-color: ${palette.gray.dark2};
  }
`;

function Definition({
  prop,
  type,
  defaultValue,
  description,
}: PropDefinitionProps) {
  const showDefault = defaultValue !== '-';

  return (
    <div className={definitionContainer}>
      <div className={flexContainer}>
        <div>
          <PropBlock header="Prop" value={prop} />
          {showDefault && <PropBlock header="Default" value={defaultValue} />}
        </div>
        <div>
          <TypeBlock header="Type" value={type} />
        </div>
      </div>
      <div className={descriptionContainer}>{description}</div>
    </div>
  );
}

Definition.displayName = 'Definition';

const inlineDefinitionStyle = css`
  padding: 0;
  font-weight: 600;
`;

const tooltipStyle = css`
  max-width: inherit;
`;

function PropDefinition({
  prop,
  type,
  defaultValue,
  description,
}: PropDefinitionProps) {
  return (
    <InlineDefinition
      className={inlineDefinitionStyle}
      tooltipClassName={tooltipStyle}
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

PropDefinition.displayName = 'PropDefinition';

export default PropDefinition;
