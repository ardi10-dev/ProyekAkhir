import { NativeModules, Platform } from 'react-native';
import { useEffect, useState } from 'react';

const useDetectMockLocationApp = () => {
  const [isMockLocationAppDetected, setIsMockLocationAppDetected] = useState(false);

  useEffect(() => {
    const checkMockLocationApp = async () => {
      if (Platform.OS === 'android') {
        const { PackageManager } = NativeModules;
        const mockApps = ['com.fakegps', 'com.fakegps.location', 'com.lexa.fakegps']; 
        try {
          const installedApps = await PackageManager.getInstalledPackages(0);
          const isMockAppInstalled = installedApps.some(app => mockApps.includes(app.packageName));
          setIsMockLocationAppDetected(isMockAppInstalled);
        } catch (error) {
          console.error('Error checking mock location apps', error);
        }
      }
    };

    checkMockLocationApp();
  }, []);

  return isMockLocationAppDetected;
};

export default useDetectMockLocationApp;
