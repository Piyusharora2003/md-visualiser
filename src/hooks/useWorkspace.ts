import { useState, useCallback } from 'react';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { WorkspaceState, MarkdownFile } from '../types/workspace';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }
        return ''; // use external default escaping
    },
});

export const useWorkspace = () => {
    const [state, setState] = useState<WorkspaceState>({
        files: [],
        openTabs: [],
        activeTabId: null,
    });

    const enhancementEngine = (content: string): string => {
        // Phase 1 stub
        return content;
    };

    const uploadFiles = useCallback(async (fileList: FileList) => {
        const newFiles: MarkdownFile[] = [];

        for (const file of Array.from(fileList)) {
            if (!file.name.endsWith('.md')) continue;

            const rawContent = await file.text();
            const enhancedContent = enhancementEngine(rawContent);
            const renderedHtml = DOMPurify.sanitize(md.render(enhancedContent));
            const id = crypto.randomUUID();

            newFiles.push({
                id,
                name: file.name,
                rawContent,
                enhancedContent,
                renderedHtml,
            });
        }

        setState((prev) => {
            const updatedFiles = [...prev.files, ...newFiles];
            const newTabIds = newFiles.map(f => f.id);
            const updatedOpenTabs = [...prev.openTabs, ...newTabIds];

            return {
                ...prev,
                files: updatedFiles,
                openTabs: updatedOpenTabs,
                activeTabId: newTabIds.length > 0 ? newTabIds[0] : prev.activeTabId,
            };
        });
    }, []);

    const openTab = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            openTabs: prev.openTabs.includes(id) ? prev.openTabs : [...prev.openTabs, id],
            activeTabId: id,
        }));
    }, []);

    const closeTab = useCallback((id: string) => {
        setState((prev) => {
            const newTabs = prev.openTabs.filter((tabId) => tabId !== id);
            let newActiveId = prev.activeTabId;

            if (prev.activeTabId === id) {
                if (newTabs.length > 0) {
                    const closedIndex = prev.openTabs.indexOf(id);
                    newActiveId = newTabs[Math.min(closedIndex, newTabs.length - 1)];
                } else {
                    newActiveId = null;
                }
            }

            return {
                ...prev,
                openTabs: newTabs,
                activeTabId: newActiveId,
            };
        });
    }, []);

    const switchTab = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            activeTabId: id,
        }));
    }, []);

    return {
        state,
        uploadFiles,
        openTab,
        closeTab,
        switchTab,
    };
};
