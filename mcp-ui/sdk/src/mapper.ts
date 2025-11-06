export const MCP_UI_TOOLS = {
  listDatabases: 'list-databases',
} as const;

export type MCP_UI_TOOLS_TYPE =
  (typeof MCP_UI_TOOLS)[keyof typeof MCP_UI_TOOLS];

export const MCP_UI_TOOL_MAPPINGS: Record<MCP_UI_TOOLS_TYPE, string> = {
  'list-databases': '/list-databases',
};
