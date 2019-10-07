// We transform 'middle' into 'center-vertical' or 'center-horizontal' for internal use,
// So both Justify and Justification are needed, where the same is not true for Alignment.
const Justification = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  CenterVertical: 'center-vertical',
  CenterHorizontal: 'center-horizontal',
} as const;

type Justification = typeof Justification[keyof typeof Justification];

export default Justification;
