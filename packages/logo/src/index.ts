// Company Logo
export { AtlasNavGraphic } from './Logos/AtlasNavGraphic';
export { MongoDBLogo } from './Logos/MongoDBLogo';
export { MongoDBLogoMark } from './Logos/MongoDBLogoMark';

// Product Family Logo Lockups
export { AtlasForGovernmentLogoLockup } from './Logos/AtlasForGovernmentLogoLockup';
export { AtlasLogoLockup } from './Logos/AtlasLogoLockup';
export { CommunityEditionLogoLockup } from './Logos/CommunityEditionLogoLockup';
export { EnterpriseAdvancedLogoLockup } from './Logos/EnterpriseAdvancedLogoLockup';
export { UniversityLogoLockup } from './Logos/UniversityLogoLockup';

// Deprecated Product Logo Marks
export {
  /**
   * @deprecated Use named export `{ Logo }` instead. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.
   */
  default,
  default as Logo,
} from './Logo';
export { SupportedColors } from './Logo.types';
export { AtlasLogoMark } from './Logos/AtlasLogoMark';
export { ChartsLogoMark } from './Logos/ChartsLogoMark';
export { default as RealmLogoMark } from './Logos/RealmLogoMark';

// Types
export { type LogoName, type LogoProps } from './Logo.types';
