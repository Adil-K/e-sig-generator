import React from 'react';
import Toast from './../style/Toast';

const Toaster = ({ isShown, message }) => {
  if (isShown) {
    return <Toast>{message}</Toast>;
  }
  return null;
};

export default Toaster;
