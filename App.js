import React from 'react';
import styled from 'styled-components/native';
import { SensorComponent, Text } from './components/SensorComponent';

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  color: palevioletred;
`;

const ShakeTitle = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
`;

const App = () => {
  return (
    <Container>
      <ShakeTitle>Shake Me For Advice!</ShakeTitle>
      <SensorComponent></SensorComponent>
    </Container>
  );
};

export default App;
