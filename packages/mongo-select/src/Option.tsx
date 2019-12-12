import React from 'react';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { Variant, ProjectData, OrganizationData } from './MongoSelect';

const optionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 15px);
`;

const nameStyle = css`
  font-size: 14px;
  color: ${uiColors.gray.dark3};
`;

const projectNameStyle = css`
  max-width: 48%;
  white-space: normal;
  overflow-wrap: break-word;
`;

const productStyle = css`
  font-size: 12px;
  color: ${uiColors.gray.dark2};
  font-weight: bolder;
  white-space: nowrap;
`;

const projectDetailsStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`;

interface OptionProps {
  variant: Variant;
  datum: ProjectData | OrganizationData;
  selected?: string;
}

function Option({ variant, datum, selected }: OptionProps) {
  const checkPlural = (number: number) => {
    return number > 1 ? 's' : '';
  };

  if (variant === Variant.Organization) {
    const { name, product } = datum as OrganizationData;
    return (
      <div className={optionStyle}>
        <span className={nameStyle}>{name}</span>
        <span className={productStyle}>{product}</span>
      </div>
    );
  }

  const {
    name,
    details: { clusters, apps, dashboards },
  } = datum as ProjectData;
  return (
    <div className={optionStyle}>
      <span className={cx(nameStyle, projectNameStyle)}>
        {name} {name === selected ? '(current)' : ''}
      </span>
      <div className={projectDetailsStyle}>
        {clusters && (
          <span className={productStyle}>
            {'Cluster' + checkPlural(clusters)}: {clusters}
          </span>
        )}
        {apps && (
          <span className={productStyle}>
            {'App' + checkPlural(apps)}: {apps}
          </span>
        )}
        {dashboards && (
          <span className={productStyle}>
            {'Dashboard' + checkPlural(dashboards)}: {dashboards}
          </span>
        )}
      </div>
    </div>
  );
}

Option.displayName = 'Option';

export default Option;
