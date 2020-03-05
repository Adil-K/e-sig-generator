import styled from '@emotion/styled';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 15px;
  padding-left: 15px;
  padding-right: 15px;
  grid-template-areas:
    'signature signature'
    'form html';
  form {
    grid-area: form;
    button {
      margin: 5px;
    }
  }
  > div:nth-child(2) {
    grid-area: signature;
    align-self: center;
    justify-self: center;
  }
  > div:nth-child(3) {
    grid-area: html;
  }
`;

export default Layout;
