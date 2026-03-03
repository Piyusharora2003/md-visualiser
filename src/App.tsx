import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TabBar } from './components/TabBar';
import { PreviewPane } from './components/PreviewPane';
import { useWorkspace } from './hooks/useWorkspace';
import { Moon, Sun, Maximize, Minimize, Menu } from 'lucide-react';
import './App.css';

function App() {
    const { state, uploadFiles, openTab, closeTab, switchTab } = useWorkspace();
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeFile = state.files.find((f) => f.id === state.activeTabId);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div className={`app-container ${theme} ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar
                files={state.files}
                activeTabId={state.activeTabId}
                onUpload={uploadFiles}
                onFileClick={(id) => {
                    openTab(id);
                    setIsSidebarOpen(false);
                }}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="main-content">
                <header className="app-header">
                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        title="Toggle Sidebar"
                    >
                        <Menu size={20} />
                    </button>
                    <TabBar
                        openTabs={state.openTabs}
                        files={state.files}
                        activeTabId={state.activeTabId}
                        onTabClick={switchTab}
                        onTabClose={closeTab}
                    />
                    <div className="header-actions">
                        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button className="fullscreen-toggle" onClick={toggleFullscreen} title="Toggle Fullscreen">
                            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                        </button>
                    </div>
                </header>
                <PreviewPane renderedHtml={activeFile?.renderedHtml || null} />
            </main>
        </div>
    );
}

export default App;
