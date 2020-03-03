import styled from '@emotion/styled';

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

export default Toast;
