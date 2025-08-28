import { codeSnippets } from './codeSnippets';
import {
  defaultPanelContextFunctions,
  PanelSelectors,
  renderPanel,
} from './panelTestUtils';
import { renderCodeEditor } from './testUtils';

export {
  codeSnippets,
  defaultPanelContextFunctions,
  PanelSelectors,
  renderCodeEditor,
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
