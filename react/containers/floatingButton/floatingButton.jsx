import styled from 'styled-components'

const floatingButton = styled.button`
  border: none;
  border-radius: 50%;
  position: fixed;
  bottom: 40px;
  right: 25px;
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #287ef6;
  color: #fff;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  outline: none;
`;

export default floatingButton;