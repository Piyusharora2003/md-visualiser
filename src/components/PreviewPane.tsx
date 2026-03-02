import { FC } from 'react';
import 'github-markdown-css/github-markdown-dark.css';
import './PreviewPane.css';

interface PreviewPaneProps {
    renderedHtml: string | null;
}

export const PreviewPane: FC<PreviewPaneProps> = ({ renderedHtml }) => {
    if (!renderedHtml) {
        return (
            <div className="preview-pane empty">
                <div className="empty-message">
                    <h2>Markdown Workspace</h2>
                    <p>Select a file from the sidebar or upload new ones to preview.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="preview-pane">
            <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
        </div>
    );
};
