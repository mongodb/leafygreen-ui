import React from 'react';
import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { InlineCode } from '@leafygreen-ui/typography';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import formatType from 'utils/formatType';

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
  margin: 0 0 ${spacing[1]}px 0;
`;

const propBlockCodeStyle = css`
  font-weight: bold;
  white-space: pre-wrap;
  padding: 0 4px;
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
      {formatType(value)}
    </div>
  );
}

TypeBlock.displayName = 'TypeBlock';

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
  const showDefault = defaultValue !== '-';

  return (
    <div className={definitionContainer}>
      <div className={flexContainer}>
        <PropBlock header="Prop" value={prop} />
        <TypeBlock header="Type" value={type} />
        {showDefault && <PropBlock header="Default" value={defaultValue} />}
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

function PropDefinition({
  prop,
  type,
  defaultValue,
  description,
}: PropDefinitionProps) {
  return (
    <InlineDefinition
      className={inlineDefinitionStyle}
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
