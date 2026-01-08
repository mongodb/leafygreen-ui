import React from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import { consoleOnce } from '@leafygreen-ui/lib';
import {
  DropdownWidthBasis,
  Option,
  RenderMode,
  Select,
  Size,
} from '@leafygreen-ui/select';
import { Body } from '@leafygreen-ui/typography';

import { DEFAULT_ITEMS_PER_PAGE_OPTIONS } from '../constants';
import { getSectionStyles } from '../Pagination.styles';
import { areItemsPerPageValid } from '../utils';

import { PageSizeProps } from './PageSize.types';
import { getLgIds } from '../getLgIds';

/**
 * PageSize is a component that displays the number of items per page.
 */
function PageSize<T extends number>({
  'data-lgid': dataLgId,
  id: idProp,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE_OPTIONS[0] as T,
  itemsPerPageOptions = DEFAULT_ITEMS_PER_PAGE_OPTIONS as Array<T>,
  onItemsPerPageOptionChange,
  className,
}: PageSizeProps<T>) {
  const lgIds = getLgIds(dataLgId);
  const itemsPerPageLabelId = useIdAllocator({
    prefix: 'lg-pagination-items-per-page-label',
    id: idProp,
  });

  const itemsPerPageSelectId = useIdAllocator({
    prefix: 'lg-pagination-items-per-page-select',
    id: idProp,
  });

  if (!areItemsPerPageValid({ itemsPerPage, itemsPerPageOptions })) {
    consoleOnce.error(
      `Value of the 'itemsPerPage' prop is not a valid option specified in 'itemsPerPageOptions'.`,
    );
  }

  if (!onItemsPerPageOptionChange)
    return <div className={getSectionStyles({ className })} />;

  return (
    <div
      className={getSectionStyles({ className })}
      data-testid={lgIds.pageSize}
      data-lgid={lgIds.pageSize}
    >
      <Body as="label" id={itemsPerPageLabelId} htmlFor={itemsPerPageSelectId}>
        Items per page:
      </Body>
      <Select
        onChange={onItemsPerPageOptionChange}
        aria-labelledby={itemsPerPageLabelId}
        value={String(itemsPerPage)}
        id={itemsPerPageSelectId}
        allowDeselect={false}
        size={Size.XSmall}
        dropdownWidthBasis={DropdownWidthBasis.Option}
        renderMode={RenderMode.TopLayer}
      >
        {itemsPerPageOptions.map((option: number) => (
          <Option key={option} value={String(option)}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
}

PageSize.displayName = 'PageSize';

export default PageSize;
