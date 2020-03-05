import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { useForm } from 'react-hook-form';
import copy from 'copy-html-to-clipboard';
import Button from './style/Button';
import { Form, FormRow } from './style/Form';
import SignatureCard from './style/SignatureCard';
import Layout from './style/Layout';
import Signature from './components/signature/Signature';
import SignatureHtml from './components/signature/SignatureHtml';
import FormInput from './components/FormInput';
import Toaster from './components/Toaster';

// custom Hook
const useConvertComponentToString = component => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    setValue(renderToString(component));
  }, [component]);
  return value;
};

const App = () => {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setForm] = useState({ firstName: '', lastName: '' });
  const [toastData, setToast] = useState({
    isShown: false,
    message: '',
  });

  const htmlString = useConvertComponentToString(generateSignature());

  const onSubmit = data => {
    setForm(currentState => ({
      ...currentState,
      ...data,
    }));
  };

  const onCopy = data => {
    setToast(currentState => ({
      ...currentState,
      message: 'Gekopieerd!',
    }));

    setTimeout(() => {
      setToast(currentState => ({
        ...currentState,
        message: null,
      }));
    }, 3000);

    copy(data);
  };

  function generateSignature() {
    return <Signature data={formData}></Signature>;
  }

  return (
    <>
      <Layout>
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
        <SignatureCard>{generateSignature()}</SignatureCard>
        <SignatureHtml signature={htmlString} onCopy={onCopy}></SignatureHtml>
        {toastData.message && <Toaster message={toastData.message}></Toaster>}
      </Layout>
    </>
  );
};

export default App;
