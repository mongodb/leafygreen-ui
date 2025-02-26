export interface AssetsType {
  [key: string]: React.ComponentType<any>;
};

export const Name = {
  AppDeveloper: 'AppDeveloper',
  Build: 'Build',
  CloudSync: 'CloudSync',
  Developer: 'Developer',
} as const;
export type Name = (typeof Name)[keyof typeof Name];

export const Color = {
  None: 'None',
  Forest: 'Forest',
  Lavender: 'Lavender',
  Mist: 'Mist',
  Spring: 'Spring',
} as const;
export type Color = (typeof Color)[keyof typeof Color];

export interface IllustrationProps {
  name: Name;

  color?: Color;
};
