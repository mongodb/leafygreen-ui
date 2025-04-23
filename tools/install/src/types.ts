import { ALL_PACKAGES } from './ALL_PACKAGES';

export interface InstallCommandOptions {
  dry?: boolean;
  verbose?: boolean;
  essentials?: boolean;
  basic?: boolean;
  ui?: boolean;
  charts?: boolean;
  chat?: boolean;
}

export type PACKAGE_NAME = (typeof ALL_PACKAGES)[number];
