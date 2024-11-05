export interface TooltipProps {
  sortDirection?: 'asc' | 'desc';
  sortKey?: 'name' | 'value';
  valueFormatter?: (value: number | string) => string;
}
