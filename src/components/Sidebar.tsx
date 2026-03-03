import { useRef, FC, ChangeEvent, useState, DragEvent } from 'react';
import { Upload, FileText, Plus, X } from 'lucide-react';
import { MarkdownFile } from '../types/workspace';
import './Sidebar.css';

interface SidebarProps {
    files: MarkdownFile[];
    activeTabId: string | null;
    onUpload: (files: FileList) => void;
    onFileClick: (id: string) => void;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
    files,
    activeTabId,
    onUpload,
    onFileClick,
    isOpen,
    onClose,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onUpload(e.target.files);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUpload(e.dataTransfer.files);
        }
    };

    return (
        <aside
            className={`sidebar ${isOpen ? 'open' : ''} ${isDragging ? 'drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="sidebar-header">
                <span className="sidebar-title">WORKSPACE</span>
                <div className="header-actions-group">
                    <button className="upload-btn" onClick={handleUploadClick} title="Upload Markdown">
                        <Plus size={18} />
                    </button>
                    {onClose && (
                        <button className="sidebar-close-btn" onClick={onClose} title="Close Sidebar">
                            <X size={18} />
                        </button>
                    )}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept=".md"
                    style={{ display: 'none' }}
                />
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
