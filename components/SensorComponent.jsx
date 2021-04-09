import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import styled from 'styled-components/native';
import { Image } from 'react-native';

const isShaking = (data) => {
  const totalForce = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);

  return totalForce > 1.78;
};

const ShakeView = styled.View`
  display: flex;
  flex-direction: column;
`;

const ShowAnswer = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const MovieContainer = styled.View`
  
`;

export const SensorComponent = () => {
  Accelerometer.setUpdateInterval(400);

  const [subscription, setSubscription] = useState(null);
  const filmArray = ['464052', '458576', '529203', '522444', '527774', '587807', '464052', '544401', '755812', '602269', '412656', '399566', '791373']
  const [film, setFilm] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        if (isShaking(accelerometerData)) {
          fetch(`https://api.themoviedb.org/3/movie/${filmArray[Math.floor(Math.random()*filmArray.length)]}?api_key=d1212c48c1a2b13b12dd27882d072960&language=en-US&page=1`)
            .then((res) => res.json())
            .then(json => setFilm(json))
        }
      })
    )}


  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  
   return (
      <ShakeView>
        { film && 
        <MovieContainer>
          <Image 
          style={{
            width: 400,
            height: 500,
            resizeMode: 'contain',
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${film.poster_path}`
          }} />
        </MovieContainer>
        }
        <ShowAnswer>👋🏻 Shake for a movie 👋🏻</ShowAnswer> 
      </ShakeView>
  );
};
