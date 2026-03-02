export interface MarkdownFile {
  id: string;
  name: string;
  rawContent: string;
  enhancedContent: string;
  renderedHtml: string;
}

export interface WorkspaceState {
  files: MarkdownFile[];
  openTabs: string[]; // Array of file IDs
  activeTabId: string | null;
}
