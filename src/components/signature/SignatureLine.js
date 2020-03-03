import React from 'react';

const SignatureLine = ({ value, bold }) => {
  if (value && value !== '' && value !== ' ') {
    return (
      <p
        style={{
          fontSize: '10pt',
          fontFamily: 'Calibri,sans-serif',
          margin: 0,
          lineHeight: '14.65pt',
          color: '#212121',
        }}
      >
        {bold ? <b>{value}</b> : value}
      </p>
    );
  }
  return null;
};

export default SignatureLine;
