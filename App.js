import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import HalamanUtama from './screens/HalamanUtama';
import HalamanAbsen from './screens/absensi/HalamanAbsensi';
import DispensasiScreen from './screens/form/DispensasiScreen';
import HalamanRiwayat from './screens/riwayat/HalamanRiwayat';
import HalamanAproval from './screens/approval/HalamanAproval';
import CutiTahunanScreen from './screens/form/CutiTahunanScreen';
import LemburScreen from './screens/form/LemburScreen';
import HalamanAbsensPulang from './screens/absensi/HalamanAbsensPulang';
import MenuAbsensi from './screens/absensi/MenuAbsensi';
import RiwayatAbsen from './screens/riwayat/RiwayatAbsen';
import RiwayatIzin from './screens/riwayat/RiwayatIzin';
import AprovalIzin from './screens/approval/AprovalIzin';
import DetailAprovalIzin from './screens/approval/DetailAprovalIzin';


const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#10439F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HalamanUtama"
        component={HalamanUtama}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HalamanAbsen"
        component={HalamanAbsen}
        options={{ title: 'Halaman Absensi' }}
      />
      <Stack.Screen
        name="MenuAbsensi"
        component={MenuAbsensi}
        options={{ title: 'Absensi' }}
      />
      <Stack.Screen
        name="HalamanAbsensPulang"
        component={HalamanAbsensPulang}
        options={{ title: 'Halaman Absensi Pulang' }}
      />
      <Stack.Screen
        name="DispensasiScreen"
        component={DispensasiScreen}
        options={{ title: 'Pengajuan Izin Dispensasi' }}
      />
      <Stack.Screen
        name="HalamanRiwayat"
        component={HalamanRiwayat}
        options={{ title: 'Riwayat' }}
      />
      <Stack.Screen
        name="RiwayatAbsen"
        component={RiwayatAbsen}
        options={{ title: 'Riwayat Absensi' }}
      />
      <Stack.Screen
        name="RiwayatIzin"
        component={RiwayatIzin}
        options={{ title: 'Riwayat Izin Dispensasi' }}
      />
      <Stack.Screen
        name="HalamanAproval"
        component={HalamanAproval}
        options={{ title: 'Aproval' }}
      />
      <Stack.Screen
        name="AprovalIzin"
        component={AprovalIzin}
        options={{ title: 'Aproval Izin Dispensasi' }}
      />
      <Stack.Screen
        name="DetailAprovalIzin"
        component={DetailAprovalIzin}
        options={{ title: 'Detail Aproval Izin' }}
      />
      <Stack.Screen
        name="CutiTahunanScreen"
        component={CutiTahunanScreen}
        options={{ title: 'Pengajuan Cuti Tahunan' }}
      />
      <Stack.Screen
        name="LemburScreen"
        component={LemburScreen}
        options={{ title: 'Pengajuan Lembur Kerja' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
