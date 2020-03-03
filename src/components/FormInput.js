import React from 'react';
import Input from './../style/Input';
import Label from './../style/Label';
import { FormCol } from './../style/Form';

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

export default FormInput;
