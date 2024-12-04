/**
 * All `@leafygreen-ui/*` packages as of November 2024 that can be identified in
 * import declarations to determine if a codemod should be run on them.
 */
export const LGPackage = {
  A11y: '@leafygreen-ui/a11y',
  Avatar: '@leafygreen-ui/avatar',
  Badge: '@leafygreen-ui/badge',
  Banner: '@leafygreen-ui/banner',
  Box: '@leafygreen-ui/box',
  Button: '@leafygreen-ui/button',
  Callout: '@leafygreen-ui/callout',
  Card: '@leafygreen-ui/card',
  Checkbox: '@leafygreen-ui/checkbox',
  Chip: '@leafygreen-ui/chip',
  Code: '@leafygreen-ui/code',
  Combobox: '@leafygreen-ui/combobox',
  ConfirmationModal: '@leafygreen-ui/confirmation-modal',
  Copyable: '@leafygreen-ui/copyable',
  DatePicker: '@leafygreen-ui/date-picker',
  DateUtils: '@leafygreen-ui/date-utils',
  Descendants: '@leafygreen-ui/descendants',
  Emotion: '@leafygreen-ui/emotion',
  EmptyState: '@leafygreen-ui/empty-state',
  ExpandableCard: '@leafygreen-ui/expandable-card',
  FormField: '@leafygreen-ui/form-field',
  FormFooter: '@leafygreen-ui/form-footer',
  GuideCue: '@leafygreen-ui/guide-cue',
  Hooks: '@leafygreen-ui/hooks',
  Icon: '@leafygreen-ui/icon',
  IconButton: '@leafygreen-ui/icon-button',
  InfoSprinkle: '@leafygreen-ui/info-sprinkle',
  InlineDefinition: '@leafygreen-ui/inline-definition',
  InputOption: '@leafygreen-ui/input-option',
  LeafyGreenProvider: '@leafygreen-ui/leafygreen-provider',
  Lib: '@leafygreen-ui/lib',
  LoadingIndicator: '@leafygreen-ui/loading-indicator',
  Logo: '@leafygreen-ui/logo',
  MarketingModal: '@leafygreen-ui/marketing-modal',
  Menu: '@leafygreen-ui/menu',
  Modal: '@leafygreen-ui/modal',
  NumberInput: '@leafygreen-ui/number-input',
  Pagination: '@leafygreen-ui/pagination',
  Palette: '@leafygreen-ui/palette',
  PasswordInput: '@leafygreen-ui/password-input',
  Pipeline: '@leafygreen-ui/pipeline',
  Polymorphic: '@leafygreen-ui/polymorphic',
  Popover: '@leafygreen-ui/popover',
  Portal: '@leafygreen-ui/portal',
  RadioBoxGroup: '@leafygreen-ui/radio-box-group',
  RadioGroup: '@leafygreen-ui/radio-group',
  Ripple: '@leafygreen-ui/ripple',
  SearchInput: '@leafygreen-ui/search-input',
  SegmentedControl: '@leafygreen-ui/segmented-control',
  Select: '@leafygreen-ui/select',
  SideNav: '@leafygreen-ui/side-nav',
  SkeletonLoader: '@leafygreen-ui/skeleton-loader',
  SplitButton: '@leafygreen-ui/split-button',
  Stepper: '@leafygreen-ui/stepper',
  Table: '@leafygreen-ui/table',
  Tabs: '@leafygreen-ui/tabs',
  TestingLib: '@leafygreen-ui/testing-lib',
  TextArea: '@leafygreen-ui/text-area',
  TextInput: '@leafygreen-ui/text-input',
  Toast: '@leafygreen-ui/toast',
  Toggle: '@leafygreen-ui/toggle',
  Tokens: '@leafygreen-ui/tokens',
  Tooltip: '@leafygreen-ui/tooltip',
  Typography: '@leafygreen-ui/typography',
} as const;
export type LGPackage = (typeof LGPackage)[keyof typeof LGPackage];