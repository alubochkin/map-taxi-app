/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { DashBoardComponent } from './components/DashBoard/DashBoard.component';
import { YmapsComponent } from './components/Ymaps/Ymaps.component';
import { cars } from './utils/cars';
// import { PATH } from './utils/constants';

function App() {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <DashBoardComponent />
      <YmapsComponent />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  margin: 0 auto;
  height: 100vh;
  align-items: center;
  overflow: hidden;
`;
