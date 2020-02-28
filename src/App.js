import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

const Input = styled.input`
  padding: 5px 10px;
  border: ${props => (props.invallid ? '1px solid red' : '1px solid #aaa')};
  border-radius: 3px;
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
  background-color: dodgerblue;
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

const SignatureLine = ({ value, bold, link }) => {
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
          color: 'dodgerblue',
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
      &nbsp;
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

const App = () => {
  const { register, handleSubmit, errors } = useForm();
  const [form, setForm] = useState({ firstName: '', lastName: '' });

  const onSubmit = data => {
    setForm(currentState => ({
      ...currentState,
      ...data,
    }));
  };

  let nameField;
  let adress;
  let adressPlace;

  if (form.firstName && form.lastName) {
    nameField = `${form.firstName} ${form.lastName}`;
  }
  if (form.street) {
    adress = form.street;
  }
  if (form.streetNumber) {
    adress += ' ' + form.streetNumber;
  }
  if (form.postalCode) {
    adressPlace = form.postalCode;
  }
  if (form.place) {
    adressPlace += ' ' + form.place;
  }

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
        {/* <FormRow>
          <FormInput
            labelValue={'Straatnaam'}
            inputName={'street'}
            register={register}
          ></FormInput>
          <FormInput
            labelValue={'Huisnummer'}
            inputName={'streetNumber'}
            register={register}
          ></FormInput>
        </FormRow>
        <FormRow>
          <FormInput
            labelValue={'Postcode'}
            inputName={'postalCode'}
            register={register}
          ></FormInput>
          <FormInput
            labelValue={'Plaatsnaam'}
            inputName={'place'}
            register={register}
          ></FormInput>
        </FormRow>
        <FormInput
          labelValue={'BTW Nummer'}
          inputName={'VATNumber'}
          register={register}
        ></FormInput> */}
        <Submit type="submit" value="Genereer"></Submit>
      </Form>

      <SignatureLine bold value={nameField}></SignatureLine>
      <SignatureLine value={form?.jobTitle}></SignatureLine>
      <SignatureLine value={form?.phoneNumber}></SignatureLine>
      <SignatureImage></SignatureImage>
      <SignatureLine value="Schaliënhoevedreef 20J"></SignatureLine>
      <SignatureLine value="2800 Mechelen"></SignatureLine>
      <SignatureLine value="BE 0465.357.302"></SignatureLine>
      <SignatureLink></SignatureLink>
    </>
  );
};

export default App;
