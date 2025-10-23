// FILE: src/components/common/LoadingSpinner.jsx
// ============================================
const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg',
  };

  return (
    <div className="loading-spinner-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px',
      minHeight: '200px'
    }}>
      <div className={`spinner-border ${sizeClasses[size]}`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
      {text && <p className="loading-text" style={{ marginTop: '16px' }}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;