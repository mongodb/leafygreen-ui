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
