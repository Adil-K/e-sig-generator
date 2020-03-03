import React from 'react';
import SignatureLine from './SignatureLine';
import SignatureLink from './SignatureLink';
import SignatureImage from './SignatureImage';

const Signature = ({ data }) => {
  let nameField;
  if (data?.firstName && data?.lastName) {
    nameField = `${data.firstName} ${data.lastName}`;
  }

  return (
    <>
      <SignatureLine bold value={nameField}></SignatureLine>
      <SignatureLine value={data.jobTitle}></SignatureLine>
      <SignatureLine value={data.phoneNumber}></SignatureLine>
      &nbsp;
      <SignatureImage></SignatureImage>
      <SignatureLine value="Schaliënhoevedreef 20J"></SignatureLine>
      <SignatureLine value="2800 Mechelen"></SignatureLine>
      <SignatureLine value="BE 0465.357.302"></SignatureLine>
      <SignatureLink></SignatureLink>
    </>
  );
};

export default Signature;
