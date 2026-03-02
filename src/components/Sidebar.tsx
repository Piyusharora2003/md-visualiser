import { useRef, FC, ChangeEvent } from 'react';
import { Upload, FileText, Plus } from 'lucide-react';
import { MarkdownFile } from '../types/workspace';
import './Sidebar.css';

interface SidebarProps {
    files: MarkdownFile[];
    activeTabId: string | null;
    onUpload: (files: FileList) => void;
    onFileClick: (id: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({
    files,
    activeTabId,
    onUpload,
    onFileClick,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onUpload(e.target.files);
        }
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="sidebar-title">WORKSPACE</span>
                <button className="upload-btn" onClick={handleUploadClick} title="Upload Markdown">
                    <Plus size={18} />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept=".md"
                        style={{ display: 'none' }}
                    />
                </button>
            </div>

            <div className="file-list">
                {files.length === 0 ? (
                    <div className="empty-state">
                        <Upload size={32} className="empty-icon" />
                        <p>Upload .md files to start</p>
                    </div>
                ) : (
                    files.map((file) => (
                        <div
                            key={file.id}
                            className={`file-item ${activeTabId === file.id ? 'active' : ''}`}
                            onClick={() => onFileClick(file.id)}
                        >
                            <FileText size={16} className="file-icon" />
                            <span className="file-name">{file.name}</span>
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
};
