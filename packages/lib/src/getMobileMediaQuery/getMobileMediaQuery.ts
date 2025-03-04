const _baseQuery = (size: number) =>
  `@media only screen and (max-width: ${size}px) and (hover: none)`;

/** Any screen with no pointer, or a coarse pointer and no hover capability (i.e. touch screen)
 * For more details, see: https://css-tricks.com/touch-devices-not-judged-size/
 * @param size - The maximum width of the screen
 */
export const getMobileMediaQuery = (size: number) =>
  `${_baseQuery(size)} and (pointer: coarse), ${_baseQuery(
    size,
  )} and (pointer: none)`;
