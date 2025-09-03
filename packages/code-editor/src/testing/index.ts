import { codeSnippets } from './codeSnippets';
import {
  defaultPanelContextFunctions,
  PanelSelectors,
  renderPanel,
} from './panelTestUtils';

export {
  codeSnippets,
  defaultPanelContextFunctions,
  PanelSelectors,
  renderPanel,
};

// Extension testing utilities
export {
  createComprehensiveFakeModules,
  createDefaultTestProps,
  createLanguageModuleFactory,
  createMockAutoCompleteModule,
  createMockExtension,
  createMockHyperLinkModule,
  createMockLanguageModule,
  createMockLezerHighlightModule,
  createMockLintModule,
  createMockStateModule,
  createMockViewModule,
  FakeCompartment,
} from './extensionTestUtils';
