/**
 * The maximum number for each segment
 *
 * @param is12HourFormat - Whether the time input is in 12-hour format
 */
export const getDefaultMax = ({
  is12HourFormat,
}: {
  is12HourFormat: boolean;
}) => {
  return {
    hour: is12HourFormat ? 12 : 23,
    minute: 59,
    second: 59,
  } as const;
};
