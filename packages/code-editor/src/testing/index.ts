import { codeSnippets } from './codeSnippets';
import {
  mockPanelFunctions,
  PanelSelectors,
  renderPanel,
} from './panelTestUtils';
import { renderCodeEditor } from './testUtils';

export {
  codeSnippets,
  mockPanelFunctions,
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
