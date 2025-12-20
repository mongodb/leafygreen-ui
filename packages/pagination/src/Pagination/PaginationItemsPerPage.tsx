import React from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import {
  DropdownWidthBasis,
  Option,
  RenderMode,
  Select,
  Size,
} from '@leafygreen-ui/select';
import { Body } from '@leafygreen-ui/typography';

import { DEFAULT_ITEMS_PER_PAGE_OPTIONS } from './constants';
import { flexSectionStyles } from './Pagination.styles';
import { PaginationItemsPerPageProps } from './Pagination.types';
import { validateItemsPerPage } from './utils';

function PaginationItemsPerPage<T extends number>({
  id: idProp,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE_OPTIONS[0] as T,
  itemsPerPageOptions = DEFAULT_ITEMS_PER_PAGE_OPTIONS,
  onItemsPerPageOptionChange,
}: PaginationItemsPerPageProps) {
  const itemsPerPageLabelId = useIdAllocator({
    prefix: 'lg-pagination-items-per-page-label',
    id: idProp,
  });

  const itemsPerPageSelectId = useIdAllocator({
    prefix: 'lg-pagination-items-per-page-select',
    id: idProp,
  });

  if (validateItemsPerPage({ itemsPerPage, itemsPerPageOptions })) {
    console.error(
      `Value of the 'itemsPerPage' prop is not a valid option specified in 'itemsPerPageOptions'.`,
    );
  }

  return (
    <div className={flexSectionStyles}>
      {onItemsPerPageOptionChange !== undefined && (
        <>
          <Body
            as="label"
            id={itemsPerPageLabelId}
            htmlFor={itemsPerPageSelectId}
          >
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
        </>
      )}
    </div>
  );
}

export default PaginationItemsPerPage;
