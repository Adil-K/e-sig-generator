import React from 'react';
import HtmlCode from './../../style/HtmlCode';
import Button from './../../style/Button';

const SignatureHtml = ({ signature, onCopy }) => {
  return (
    <>
      <HtmlCode>
        <p>{signature}</p>
        <Button onClick={() => onCopy(signature)}>Kopiëren</Button>
      </HtmlCode>
    </>
  );
};

export default SignatureHtml;
