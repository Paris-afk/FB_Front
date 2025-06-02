import * as React from "react";
import { usePosts } from "../../hooks/usePosts";

interface StorageManagerProps {
  isVisible?: boolean;
  onDataChange?: () => void;
}

function StorageManager({ isVisible = false, onDataChange }: StorageManagerProps) {
  const { clearStorage, resetToInitialData, exportData, refreshPosts } = usePosts();
  const [showManager, setShowManager] = React.useState(isVisible);
  const [exportedData, setExportedData] = React.useState<string | null>(null);

  const handleRefreshPosts = () => {
    refreshPosts();
    onDataChange?.();
  };

  const handleResetToInitialData = () => {
    resetToInitialData();
    onDataChange?.();
  };

  const handleClearStorage = () => {
    clearStorage();
    onDataChange?.();
  };

  const handleExportData = () => {
    const data = exportData();
    if (data) {
      setExportedData(data);
    }
  };

  const handleCopyToClipboard = () => {
    if (exportedData) {
      navigator.clipboard.writeText(exportedData);
      alert('Data copied to clipboard!');
    }
  };

  const handleDownloadData = () => {
    if (exportedData) {
      const blob = new Blob([exportedData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facebook_clone_data_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!showManager) {
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 1000 
      }}>
        <button
          onClick={() => setShowManager(true)}
          style={{
            background: '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
          title="Storage Manager"
        >
          ⚙️
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      zIndex: 1000,
      minWidth: '300px',
      maxHeight: '500px',
      overflow: 'auto'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h4 style={{ margin: 0, color: '#1877f2' }}>Storage Manager</h4>
        <button 
          onClick={() => setShowManager(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          onClick={handleRefreshPosts}
          style={{
            background: '#42b883',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh Posts
        </button>

        <button 
          onClick={handleExportData}
          style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📤 Export Data
        </button>

        <button 
          onClick={handleResetToInitialData}
          style={{
            background: '#ff9800',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 Reset to Initial Data
        </button>

        <button 
          onClick={handleClearStorage}
          style={{
            background: '#f44336',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🗑️ Clear Storage
        </button>

        {exportedData && (
          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '4px',
            maxHeight: '150px',
            overflow: 'auto'
          }}>
            <h5 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Exported Data:</h5>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
              <button 
                onClick={handleCopyToClipboard}
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                📋 Copy
              </button>
              <button 
                onClick={handleDownloadData}
                style={{
                  background: '#FF9800',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                💾 Download
              </button>
              <button 
                onClick={() => setExportedData(null)}
                style={{
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✕ Close
              </button>
            </div>
            <pre style={{ 
              fontSize: '10px', 
              whiteSpace: 'pre-wrap', 
              wordBreak: 'break-all',
              margin: 0
            }}>
              {exportedData.substring(0, 300)}...
            </pre>
          </div>
        )}

        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          <div><strong>Storage Info:</strong></div>
          <div>Key: facebook_clone_data</div>
          <div>
            Size: {localStorage.getItem('facebook_clone_data')?.length || 0} chars
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorageManager;
