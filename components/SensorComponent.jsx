import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import styled from 'styled-components/native';
import { Image } from 'react-native';

// ==========================
// = Functions
const isShaking = (data) => {
  // x,y,z CAN be negative, force is directional
  // We take the absolute value and add them together
  // This gives us the total combined force on the device
  const totalForce = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);

  // If this force exceeds some threshold, return true, otherwise false
  // Increase this threshold if you need your user to shake harder
  return totalForce > 1.78;
};

// ==========================
// = Styled components
const ShakeView = styled.View`
  display: flex;
  flex-direction: column;
`;

const ShakeAlert = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: #61eff7;
`;
const ShakeDataView = styled.View``;
const ShakeDataTitle = styled.Text`
  font-weight: bold;
  color: #61eff7;
`;
const ShakeData = styled.Text`
  color: #61eff7;
`;

const ShowAnswer = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: #61eff7;
  text-align: center;
`;

const MovieContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SensorComponent = () => {
  // This function determines how often our program reads the accelerometer data in milliseconds
  // https://docs.expo.io/versions/latest/sdk/accelerometer/#accelerometersetupdateintervalintervalms
  Accelerometer.setUpdateInterval(400);

  // The accelerometer returns three numbers (x,y,z) which represent the force currently applied to the device
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  // This keeps track of whether we are listening to the Accelerometer data
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    // Save the subscription so we can stop using the accelerometer later
    setSubscription(
      // This is what actually starts reading the data
      Accelerometer.addListener((accelerometerData) => {
        // Whenever this function is called, we have received new data
        // The frequency of this function is controlled by setUpdateInterval
        setData(accelerometerData);
      })
    );
  };

  // This will tell the device to stop reading Accelerometer data.
  // If we don't do this our device will become slow and drain a lot of battery
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    // Start listening to the data when this SensorComponent is active
    _subscribe();

    // Stop listening to the data when we leave SensorComponent
    return () => _unsubscribe();
  }, []);
  
  const filmArray = ['464052', '458576', '529203', '522444', '527774', '587807', '464052', '544401', '755812', '602269', '412656', '399566', '791373']
  const [film, setFilm] = useState(null);

  useEffect(() => {
    !isShaking(data) && 
    fetch(`https://api.themoviedb.org/3/movie/${filmArray[Math.floor(Math.random()*filmArray.length)]}?api_key=d1212c48c1a2b13b12dd27882d072960&language=en-US&page=1`)
      .then((res) => res.json())
      .then(json => setFilm(json))
  }, [isShaking(data)]);

  return (
      <ShakeView>
        {isShaking(data) && <ShakeAlert>Shaking</ShakeAlert>}
        { film && 
        <MovieContainer>
          <Image 
          style={{
            width: 51,
            height: 51,
            resizeMode: 'contain',
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${film.poster_path}`
          }} />
          <ShowAnswer>{film.title}</ShowAnswer> 
        </MovieContainer>
        }
      </ShakeView>
  );
};
