import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import copy from 'copy-html-to-clipboard';
import Button from './style/Button';
import { Form, FormRow } from './style/Form';
import SignatureCard from './style/SignatureCard';
import Signature from './components/signature/Signature';
import SignatureHtml from './components/signature/SignatureHtml';
import FormInput from './components/FormInput';
import Toaster from './components/Toaster';

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
        <Button type="submit">Genereer</Button>
      </Form>
      <SignatureCard>
        <Signature data={formData}></Signature>
      </SignatureCard>
      <SignatureHtml data={formData} onCopy={onCopy}></SignatureHtml>
      <Toaster
        isShown={toastData.isShown}
        message={toastData.message}
      ></Toaster>
    </>
  );
};

export default App;
