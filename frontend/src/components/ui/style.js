// styles.js

export const buttonStyle = {
  padding: '12px 24px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
  margin: '10px 0', // Add margin for spacing
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add subtle shadow for 3D effect
};

export const buttonHoverStyle = {
  backgroundColor: '#0056b3', // Darken on hover
};

export const inputStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  width: '60%',
  marginBottom: '10px', // Add margin for spacing
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)', // Inner shadow for depth
};

export const selectStyle = {
  ...inputStyle,
};

export const detailsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Enhanced shadow for card effect
  margin: '20px 0',
  width: '100%',
};

export const navButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '20px',
};

export const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px',
  margin: '20px auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Deeper shadow for form
};

export const navButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
  margin: '10px', // Add margin for spacing
};

export const labelStyle = {
  fontSize: '16px',
  marginBottom: '8px',
  color: '#333',
  fontWeight: 'bold',
};

export const centeredContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'top',
  minHeight: '100vh', // Full-height for centering
  padding: '20px',
};

export const searchContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
};
