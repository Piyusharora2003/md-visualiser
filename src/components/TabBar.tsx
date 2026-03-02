import { FC } from 'react';
import { X } from 'lucide-react';
import { MarkdownFile } from '../types/workspace';
import './TabBar.css';

interface TabBarProps {
    openTabs: string[];
    files: MarkdownFile[];
    activeTabId: string | null;
    onTabClick: (id: string) => void;
    onTabClose: (id: string) => void;
}

export const TabBar: FC<TabBarProps> = ({
    openTabs,
    files,
    activeTabId,
    onTabClick,
    onTabClose,
}) => {
    if (openTabs.length === 0) return null;

    return (
        <div className="tab-bar">
            {openTabs.map((id) => {
                const file = files.find((f) => f.id === id);
                if (!file) return null;

                return (
                    <div
                        key={id}
                        className={`tab ${activeTabId === id ? 'active' : ''}`}
                        onClick={() => onTabClick(id)}
                    >
                        <span className="tab-name">{file.name}</span>
                        <button
                            className="tab-close"
                            onClick={(e) => {
                                e.stopPropagation();
                                onTabClose(id);
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
