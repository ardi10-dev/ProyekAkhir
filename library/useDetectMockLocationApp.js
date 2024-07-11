import { NativeModules, Platform } from 'react-native';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useDetectMockLocationApp = () => {
  const [isMockLocation, setIsMockLocation] = useState(false);

  useEffect(() => {
    const checkMockLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location.mocked) {
        setIsMockLocation(true);
        Alert.alert('Warning', 'Detected usage of fake GPS location.');
      } else {
        setIsMockLocation(false);
      }
    };

    checkMockLocation();
  }, []);

  return isMockLocation;
  
}
export default useDetectMockLocationApp;
