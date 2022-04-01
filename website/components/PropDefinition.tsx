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
  background-color: ${palette.black};
  padding: 10px 20px;
  color: ${palette.white};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid ${palette.gray.dark2};
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
