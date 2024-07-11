import { NativeModules, Platform } from 'react-native';
import { useEffect, useState } from 'react';

const useDetectMockLocationApp = () => {
  useEffect(() => {
    console.log(NativeModules); // Tambahkan ini untuk melihat modul yang tersedia
    const checkMockLocationApp = async () => {
      if (Platform.OS === 'android') {
        const { PackageManager } = NativeModules;
        if (!PackageManager) {
          console.error('PackageManager tidak tersedia di NativeModules');
          return;
        }
        const mockApps = ['com.fakegps', 'com.fakegps.location', 'com.lexa.fakegps','com.blogspot.newapphorizons.fakegps'];
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
  
}
export default useDetectMockLocationApp;
