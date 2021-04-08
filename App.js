import React, { useState } from 'react';
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
  font-size: 25px;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  background-color: #e03031;
  padding: 10px 30px;
  border-radius: 40px;
`;

const BtnText = styled.Text`
  font-size: 20px;
  font-weight: 900;
  color: white;
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
        <ShakeTitle>🍿 Shake For a Movie Tip 🍿</ShakeTitle>
        <Button onPress={() => setView(false)}>
          <BtnText>START</BtnText>
        </Button>
      </TitleContainer>}
      {!view && <SensorContainer>
        <RestartBtn onPress={() => setView(true)}>
          <BtnText>BACK</BtnText>
        </RestartBtn>
        <SensorComponent></SensorComponent>        
      </SensorContainer>}
    </Container>
  );
};

export default App;
