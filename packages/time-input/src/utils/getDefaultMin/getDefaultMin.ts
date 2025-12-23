/**
 * The minimum number for each segment
 *
 * @param is12HourFormat - Whether the time input is in 12-hour format
 */
export const getDefaultMin = ({
  is12HourFormat,
}: {
  is12HourFormat: boolean;
}) => {
  return {
    hour: is12HourFormat ? 1 : 0,
    minute: 0,
    second: 0,
  } as const;
};
