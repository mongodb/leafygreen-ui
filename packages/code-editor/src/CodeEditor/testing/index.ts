import { codeSnippets } from './codeSnippets';
import { renderCodeEditor } from './testUtils';

export { codeSnippets, renderCodeEditor };

// Extension testing utilities
export {
  createComprehensiveFakeModules,
  createDefaultTestProps,
  createMockAutoCompleteModule,
  createMockExtension,
  createMockHyperLinkModule,
  createMockLanguageModule,
  createMockLezerHighlightModule,
  createMockLintModule,
  createMockStateModule,
  createMockViewModule,
  createLanguageModuleFactory,
  FakeCompartment,
} from './extensionTestUtils';
