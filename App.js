import React, { useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { SensorComponent } from './components/SensorComponent';

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TitleContainer = styled.View`
  flex: 1;
  font-size: 24px;
  color: palevioletred;
  justify-content: space-evenly;
  align-items: center;
`;

const ShakeTitle = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  background-color: #57E2E5;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 20px;
  font-weight: bold;
`;

const SensorContainer = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

const  RestartBtn = styled(Button)`
  width 30%;
`;



const App = () => {
  const [view, setView] = useState(true)

  return (
    <Container>
      {view && <TitleContainer accessible={true}>
        <ShakeTitle>I'm Your Magic 8 Ball Shake Me For Advice!</ShakeTitle>
        <Button onPress={() => setView(false)}>
          <Text>Start</Text>
        </Button>
      </TitleContainer>}
      {!view && <SensorContainer>
        <SensorComponent></SensorComponent>        
        <RestartBtn onPress={() => setView(true)}>
          <Text>Re-start</Text>
        </RestartBtn>
      </SensorContainer>}
    </Container>
  );
};

export default App;
