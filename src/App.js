import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { renderToString } from 'react-dom/server';
import copy from 'copy-html-to-clipboard';

const Input = styled.input`
  padding: 10px 10px;
  border: ${props => (props.invallid ? '1px solid red' : '1px solid #eee')};
  border-radius: 3px;
  background-color: #eee;
  margin: 5px;
  font-size: 1em;
`;

const Submit = styled.input`
  padding: 10px;
  border: none;
  border-radius: 3px;
  margin: 5px;
  margin-top: 15px;
  font-size: 1em;
  background-color: #1e90ff;
  color: white;
  font-weight: 600;
  &:hover {
    background-color: #1476d6;
  }
`;

const Label = styled.label`
  margin: 5px;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormCol = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const HtmlCode = styled.div`
  position: relative;
  display: flex:
  flex-direction: column;
  width: 80%;
  margin: 5px;
  p {
    border: 1px solid #ddd;
    border-radius: 3px;
    max-height: 400px;
    overflow: auto;
    padding: 10px;
    font-size: 10px;
    font-family: monospace;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  line-height: 1em;
  font-size: 1em;
  background-color: #1e90ff;
  color: white;
  font-weight: 600;
  &:hover {
    background-color: #1476d6;
  }
`;

const Toast = styled.div`
  position: fixed;
  animation: slideUpDisolve 3s ease-out;
  bottom: -50px;
  height: 50px;
  line-height: 50px;
  padding: 0 40px;
  left: 50%;
  width: fit-content;
  color: #ccc;
  background-color: #333;
  border-radius: 7px;
  transform: translateX(-50%);
`;

const SignatureCard = styled.div`
  width: fit-content;
  margin: 25px;
  padding: 15px;
  border-radius: 7px;
  background: #fff;
  box-shadow: 12px 12px 24px #0002, -12px -12px 24px #eee1;
`;

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

const SignatureLink = () => {
  return (
    <p
      style={{
        margin: 0,
      }}
    >
      <a
        href="http://www.euri.com/"
        target="_blank"
        rel="noopener noreferrer"
        data-auth="NotApplicable"
        id="LPlnk500367"
        style={{
          fontSize: '10pt',
          fontFamily: 'Calibri,sans-serif',
          margin: 0,
          lineHeight: '14.65pt',
          color: '#1e90ff',
        }}
      >
        www.euri.com
      </a>
    </p>
  );
};

const SignatureImage = () => {
  return (
    <>
      <p
        style={{
          margin: 0,
        }}
      >
        <span>
          <img
            data-imagetype="AttachmentByCid"
            naturalheight="80"
            naturalwidth="315"
            src="data:image/png;base64,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"
            alt="A close up of a logo Description automatically generated"
            style={{
              width: '189pt',
              height: '47.99pt',
              cursor: 'pointer',
            }}
            crossorigin="use-credentials"
          />
        </span>
      </p>
    </>
  );
};

const FormInput = ({ labelValue, inputName, register, invallid }) => {
  return (
    <FormCol>
      <Label>{labelValue}</Label>
      <Input
        type="text"
        name={inputName}
        ref={register}
        invallid={invallid}
      ></Input>
    </FormCol>
  );
};

const RawHtml = ({ data, onCopy }) => {
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

const Toaster = ({ isShown, message }) => {
  if (isShown) {
    return <Toast>{message}</Toast>;
  }
  return null;
};

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

const App = () => {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setForm] = useState({ firstName: '', lastName: '' });
  const [toastData, setToast] = useState({
    isShown: false,
    message: '',
  });

  const onSubmit = data => {
    setForm(currentState => ({
      ...currentState,
      ...data,
    }));
  };

  const onCopy = data => {
    setToast(currentState => ({
      ...currentState,
      isShown: true,
      message: 'Gekopieerd!',
    }));

    console.log('Gekopieerd', toastData);
    copy(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <FormInput
            labelValue={'Voornaam'}
            inputName={'firstName'}
            register={register({ required: true })}
            invallid={errors.firstName}
          ></FormInput>
          <FormInput
            labelValue={'Achternaam'}
            inputName={'lastName'}
            register={register({ required: true })}
            invallid={errors.lastName}
          ></FormInput>
        </FormRow>
        <FormInput
          labelValue={'Job Titel'}
          inputName={'jobTitle'}
          register={register}
        ></FormInput>
        <FormInput
          labelValue={'Telefoon Nummer'}
          inputName={'phoneNumber'}
          register={register}
        ></FormInput>
        <Submit type="submit" value="Genereer"></Submit>
      </Form>
      <SignatureCard>
        <Signature data={formData}></Signature>
      </SignatureCard>
      <RawHtml data={formData} onCopy={onCopy}></RawHtml>
      <Toaster
        isShown={toastData.isShown}
        message={toastData.message}
      ></Toaster>
    </>
  );
};

export default App;
