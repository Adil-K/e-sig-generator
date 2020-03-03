import React from 'react';
import { renderToString } from 'react-dom/server';
import HtmlCode from './../../style/HtmlCode';
import Button from './../../style/Button';
import Signature from './Signature';

const SignatureHtml = ({ data, onCopy }) => {
  const htmlString = renderToString(<Signature data={data}></Signature>);
  return (
    <>
      <HtmlCode>
        <p>{htmlString}</p>
        <Button onClick={() => onCopy(htmlString)}>Kopiëren</Button>
      </HtmlCode>
    </>
  );
};

export default SignatureHtml;
