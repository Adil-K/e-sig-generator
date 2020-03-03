import styled from '@emotion/styled';

const Input = styled.input`
  padding: 10px 10px;
  border: ${props => (props.invallid ? '1px solid red' : '1px solid #eee')};
  border-radius: 3px;
  background-color: #eee;
  margin: 5px;
  font-size: 1em;
`;

export default Input;
