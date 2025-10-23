// FILE: src/components/common/ErrorMessage.jsx
// ============================================
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message-container" style={{
      textAlign: 'center',
      padding: '40px',
      minHeight: '200px'
    }}>
      <div className="error-icon" style={{ fontSize: '48px', color: '#dc3545', marginBottom: '16px' }}>
        <i className="fa fa-exclamation-circle"></i>
      </div>
      <h4>Oops! Something went wrong</h4>
      <p>{message || 'An unexpected error occurred. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} style={{ marginTop: '16px' }}>
          <i className="fa fa-redo" style={{ marginRight: '8px' }}></i>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;