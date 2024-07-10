import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const useCheckMockLocation = () => {
  const [isMockLocation, setIsMockLocation] = useState(false);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        if (position.mocked) {
          setIsMockLocation(true);
          Alert.alert('Warning', 'Detected use of mock location!');
        } else {
          setIsMockLocation(false);
        }
      },
      error => console.error(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return isMockLocation;
};

export default useCheckMockLocation;
