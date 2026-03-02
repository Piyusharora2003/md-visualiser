# Markdown Workspace -- Product Requirements Document (PRD)

## 1. Overview

Markdown Workspace is a frontend-only Progressive Web App (PWA) that
allows users to upload and preview multiple Markdown (.md) files in a
structured workspace environment.

The application provides: - GitHub-style Markdown rendering - Multi-file
sidebar explorer - Tab-based file switching (like VS Code) - Local-only
processing (no backend) - Optional offline capability via PWA

Phase 1 focuses purely on local preview functionality while establishing
architectural foundations that allow future AI-based document
enhancement without major refactoring.

------------------------------------------------------------------------

## 2. Goals (Phase 1)

### Primary Goals

-   Upload and preview one or multiple Markdown files
-   Display files in a sidebar explorer
-   Open files in tabs
-   Switch between open files
-   Render Markdown safely and beautifully
-   Provide offline capability (PWA)

### Non-Goals (Phase 1)

-   No authentication
-   No backend
-   No cloud storage
-   No AI enhancement yet
-   No collaboration features

------------------------------------------------------------------------

## 3. Target Users

-   Developers reviewing documentation
-   Engineers previewing README files locally
-   Writers drafting Markdown documents
-   Open-source contributors checking formatting

------------------------------------------------------------------------

## 4. Core Features

### 4.1 File Upload

-   Accept multiple `.md` files
-   Support drag & drop

### 4.2 Sidebar Explorer

-   Displays all uploaded files
-   Clicking a file opens it in a tab
-   Active file highlighted

### 4.3 Tabs System

-   Shows currently open files
-   Click to switch
-   Close individual tabs
-   Automatically switch to adjacent tab on close

### 4.4 Preview Rendering

-   GitHub-style Markdown rendering
-   Syntax highlighting for code blocks
-   Safe HTML sanitization
-   Dark / Light theme toggle

### 4.5 PWA Support

-   Installable
-   Offline access
-   Cached app shell

------------------------------------------------------------------------

## 5. Functional Workflow

### 5.1 Upload Workflow

User uploads file(s) ↓ Read file using FileReader ↓ Parse Markdown ↓
Sanitize HTML ↓ Store in workspace registry ↓ Open in tab

### 5.2 File Switching Workflow

User clicks file (Sidebar or Tab) ↓ Set activeTabId ↓ Render stored HTML

### 5.3 Tab Closing Workflow

User closes tab ↓ Remove from openTabs ↓ If closed tab is active:
Activate previous tab

------------------------------------------------------------------------

## 6. System Architecture (Phase 1)

### 6.1 Core Data Model

``` ts
type MarkdownFile = {
  id: string
  name: string
  rawContent: string
  enhancedContent: string
  renderedHtml: string
}

type WorkspaceState = {
  files: MarkdownFile[]
  openTabs: string[]
  activeTabId: string | null
}
```

### 6.2 Important Design Decision

Even though Phase 1 does not use AI, the system will maintain: -
rawContent - enhancedContent - renderedHtml

In Phase 1: enhancedContent = rawContent

This separation prevents refactoring when Phase 2 introduces enhancement
logic.

------------------------------------------------------------------------

## 7. Technical Stack (Suggested)

-   Vite + React
-   markdown-it
-   DOMPurify
-   highlight.js or Prism
-   GitHub Markdown CSS
-   Workbox (PWA)
-   Optional: IndexedDB for persistence

------------------------------------------------------------------------

## 8. UI Layout

  ------------------------------------------------------
  \| Sidebar \| Tabs: file1 \| file2 \| file3 \[x\] \|
  \|---------\|------------------------------------\|
  \| file1 \| \|
  \| file2 \| Preview Pane \|
  \| file3 \| \|
  ------------------------------------------------------

Components: - Sidebar - TabsBar - PreviewPane - Layout container

------------------------------------------------------------------------

## 9. Security Considerations

-   All rendered HTML must be sanitized
-   No script execution allowed
-   No external resource injection
-   All processing occurs locally

------------------------------------------------------------------------

## 10. Performance Considerations

-   Parse Markdown once during upload
-   Store renderedHtml
-   Do not re-parse on every tab switch
-   Lazy render only active tab

------------------------------------------------------------------------

## 11. Future-Ready Interface (Phase 2 Hint)

To support future AI-based enhancement without refactoring, Phase 1 must
include a placeholder enhancement interface.

### 11.1 Enhancement Engine Stub

``` ts
function enhancementEngine(markdown: string): string {
  return markdown
}
```

### 11.2 Future Enhancement Flow (Phase 2)

rawContent ↓ enhancementEngine() ↓ enhancedContent ↓ parse → sanitize ↓
renderedHtml

This ensures: - Enhancement logic is isolated - File lifecycle remains
stable - No architectural rewrite required

------------------------------------------------------------------------

## 12. Phase 2 (Preview Only -- Not in Scope Yet)

Planned expansion: - AI-based Markdown restructuring - LLM-optimized
formatting - Auto Table of Contents - Agent-friendly document export -
Structured JSON export - Documentation improvement suggestions

Phase 2 will plug into the existing enhancementEngine layer.

------------------------------------------------------------------------

## 13. Success Criteria (Phase 1)

-   Multiple files can be uploaded
-   Sidebar and tab switching works smoothly
-   Rendering matches GitHub-style expectations
-   No page reload required
-   App works offline
-   No security vulnerabilities from raw HTML

------------------------------------------------------------------------

## 14. Versioning

Phase 1 = Local Markdown Workspace\
No backend. No AI. No persistence required (optional).

------------------------------------------------------------------------

End of PRD -- Phase 1
