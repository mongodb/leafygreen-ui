import { codeSnippets } from './codeSnippets';
import { renderCodeEditor } from './testUtils';

export { codeSnippets, renderCodeEditor };

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
