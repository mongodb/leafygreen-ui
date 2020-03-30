import React, { useState, useEffect } from 'react';
import Button from '@leafygreen-ui/button';
import Input from './Input';
import { css, cx } from '@leafygreen-ui/emotion';
import ProjectTrigger from './ProjectTrigger';
import { useOnElementClick } from '../on-element-click-provider';
import { onKeyDown } from './selectHelpers';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import { BaseMongoSelectProps } from './types';
import {
  ProjectInterface,
  CurrentProjectInterface,
  NavElement,
  MongoNavInterface,
} from '../types';
import {
  menuContainerStyle,
  menuItemContainerStyle,
  ulStyle,
  nameStyle,
} from './styles';

const projectButtonStyle = css`
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
`;

interface ProjectMongoSelectProps extends BaseMongoSelectProps {
  data?: Array<ProjectInterface>;
  current?: CurrentProjectInterface;
  constructProjectURL: NonNullable<MongoNavInterface['constructProjectURL']>;
}

function ProjectSelect({
  current,
  onChange: onChangeProp,
  data,
  onClick,
  constructProjectURL,
  urls,
  loading = false,
}: ProjectMongoSelectProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const onElementClick = useOnElementClick();

  useEffect(() => {
    if (!open) {
      setValue('');
    }
  }, [open]);

  let renderedData = data;

  const filterData = () => {
    const sanitizedValue = value.replace(/\\/g, '\\\\');
    const search = new RegExp(String(sanitizedValue), 'i');

    const filtered = data?.filter(datum => {
      return search.test(datum.projectName);
    });

    return filtered;
  };

  if (!onChangeProp) {
    renderedData = filterData();
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);

    if (onChangeProp) {
      onChangeProp(value, e);
      return;
    }
  };

  const renderProjectOption = (datum: ProjectInterface) => {
    const { projectId, projectName } = datum;

    return (
      <MenuItem
        data-testid="project-option"
        key={projectId}
        className={cx(menuItemContainerStyle, nameStyle)}
        onClick={onClick}
        href={constructProjectURL(datum)}
      >
        {projectName}
      </MenuItem>
    );
  };

  return (
    <ProjectTrigger
      placeholder={current?.projectName ?? ''}
      open={open}
      loading={loading}
      onClick={onElementClick(NavElement.ProjectNavProjectSelectTrigger, () =>
        setOpen(curr => !curr),
      )}
    >
      <Menu
        usePortal={false}
        className={menuContainerStyle}
        justify="start"
        spacing={0}
        open={open}
        setOpen={setOpen}
        data-testid="project-select-project-list"
      >
        <FocusableMenuItem>
          <Input
            data-testid="project-filter-input"
            onChange={onChange}
            onKeyDown={(e: React.KeyboardEvent) => onKeyDown(e, setValue)}
            variant="project"
            value={value}
          />
        </FocusableMenuItem>

        <ul className={ulStyle}>
          {renderedData?.map(datum => renderProjectOption(datum))}
        </ul>

        <MenuSeparator />

        <li
          onKeyDown={(e: React.KeyboardEvent) => onKeyDown(e, setValue)}
          role="none"
          className={projectButtonStyle}
        >
          <FocusableMenuItem>
            <Button
              href={urls.viewAllProjects as string}
              data-testid="project-select-view-all-projects"
              onClick={onElementClick(NavElement.ProjectNavViewAllProjects)}
            >
              View All Projects
            </Button>
          </FocusableMenuItem>
          <FocusableMenuItem>
            <Button
              href={urls.newProject as string}
              data-testid="project-select-add-new-project"
              onClick={onElementClick(NavElement.ProjectNavAddProject)}
            >
              + New Project
            </Button>
          </FocusableMenuItem>
        </li>
      </Menu>
    </ProjectTrigger>
  );
}

ProjectSelect.displayName = 'ProjectSelect';

export default ProjectSelect;
