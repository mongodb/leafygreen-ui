const _baseQuery = (size: number) =>
  `@media only screen and (max-width: ${size}px) and (hover: none)`;
export const getMobileMediaQuery = (size: number) =>
  `${_baseQuery(size)} and (pointer: coarse), ${_baseQuery(
    size,
  )} and (pointer: none)`;
