import React,{ useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';



import Login from './screens/Login';
import HalamanUtama from './screens/HalamanUtama';
import HalamanAbsensi from './screens/absensi/HalamanAbsensi';
import DispensasiScreen from './screens/form/DispensasiScreen';
import HalamanRiwayat from './screens/riwayat/HalamanRiwayat';
import HalamanAproval from './screens/approval/HalamanAproval';
import CutiTahunanScreen from './screens/form/CutiTahunanScreen';
import LemburScreen from './screens/form/LemburScreen';
// import HalamanAbsensPulang from './screens/absensi/HalamanAbsensPulang';
import MenuAbsensi from './screens/absensi/MenuAbsensi';
import RiwayatAbsen from './screens/riwayat/RiwayatAbsen';
import RiwayatIzin from './screens/riwayat/RiwayatIzin';
import AprovalIzin from './screens/approval/AprovalIzin';
import DetailAprovalIzin from './screens/approval/DetailAprovalIzin';
import RiwayatLembur from './screens/riwayat/RiwayatLembur';
import RiwayatPCuti from './screens/riwayat/RiwayatPCuti';
import HalamanAbsenPulang from './screens/absensi/HalamanAbsenPulang';
import ApprovalCuti from './screens/approval/ApprovalCuti';
import DetailApprovalCuti from './screens/approval/DetailApprovalCuti';
import ApprovalLembur from './screens/approval/ApprovalLembur';
import DetailApprovalLembur from './screens/approval/DetailApprovalLembur';
import SplashScreen from './screens/SplashScreen';
import DetailApproveCutiUbah from './screens/approval/DetailApproveCutiUbah';

const Stack = createNativeStackNavigator();
const RiwayatStack = createNativeStackNavigator();
const AprovalStack = createNativeStackNavigator();

const handleNavigation = async () => {
  try {
    // Simpan data yang diperlukan ke AsyncStorage sebelum navigasi
    const userData = { name: 'John Doe' }; // Contoh data
    await AsyncStorage.setItem('userData', JSON.stringify(userData));

    // Navigasi ke HalamanUtama
    navigation.replace('HalamanUtama');
  } catch (error) {
    console.error(error);
  }
};

function RiwayatStackScreen({ navigation }) {
  return (
    <RiwayatStack.Navigator
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
      <RiwayatStack.Screen
        name="HalamanRiwayatScreen"
        component={HalamanRiwayat}
        options={{
          title: 'Riwayat',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HalamanUtama')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <RiwayatStack.Screen
        name="RiwayatPCuti"
        component={RiwayatPCuti}
        options={{
          title: 'Riwayat Pengajuan Cuti',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HalamanRiwayatScreen')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <RiwayatStack.Screen
        name="RiwayatAbsen"
        component={RiwayatAbsen}
        options={{
          title: 'Riwayat Absensi',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HalamanRiwayatScreen')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <RiwayatStack.Screen
        name="RiwayatIzin"
        component={RiwayatIzin}
        options={{
          title: 'Riwayat Izin Dispensasi',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HalamanRiwayatScreen')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <RiwayatStack.Screen
        name="RiwayatLembur"
        component={RiwayatLembur}
        options={{
          title: 'Riwayat Pengajuan Lembur',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('HalamanRiwayatScreen')}
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </RiwayatStack.Navigator>
  );
}

function AprovalStackScreen({ navigation }) {
  return (
    <AprovalStack.Navigator
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
      <AprovalStack.Screen
        name="HalamanAproval"
        component={HalamanAproval}
        options={{
          title: 'Aproval',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HalamanUtama')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <AprovalStack.Screen
        name="AprovalIzin"
        component={AprovalIzin}
        options={{
          title: 'Aproval Izin Dispensasi',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HalamanAproval' }],
                  })
                )
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <AprovalStack.Screen
        name="DetailAprovalIzin"
        component={DetailAprovalIzin}
        options={{
          title: 'Detail Approval Izin',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AprovalIzin')
              }

              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <AprovalStack.Screen
        name="ApprovalCuti"
        component={ApprovalCuti}
        options={{
          title: 'Approval Cuti Tahunan',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HalamanAproval')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <AprovalStack.Screen
        name="DetailApprovalCuti"
        component={DetailApprovalCuti}
        options={{
          title: 'Detail Approval Cuti',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ApprovalCuti')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <AprovalStack.Screen
        name="DetailApproveCutiUbah"
        component={DetailApproveCutiUbah}
        options={{
          title: 'Detail Approval Cuti',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ApprovalCuti')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <AprovalStack.Screen
        name="ApprovalLembur"
        component={ApprovalLembur}
        options={{
          title: 'Approval Lembur',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HalamanAproval')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <AprovalStack.Screen
        name="DetailApprovalLembur"
        component={DetailApprovalLembur}
        options={{
          title: 'Detail Approval Lembur',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ApprovalLembur')
              }
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </AprovalStack.Navigator>
  );
}

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
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HalamanUtama"
        component={HalamanUtama}
        // options={{ headerShown: false }}
        options={{
          title: 'Halaman Utama',
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Logout',
                  'Apakah Anda yakin ingin logout?',
                  [
                    { text: 'Batal', style: 'cancel' },
                    { text: 'Ya', onPress: () => handleLogout(navigation) },
                  ],
                  { cancelable: false }
                );
              }}
              style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 5,
                borderColor: '#fff',
              }}
            >
              <Ionicons name="return-up-back" size={30} color="#fff" style={{ marginRight: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="HalamanAbsensi"
        component={HalamanAbsensi}
        options={{ title: 'Absensi' }}
      />
      <Stack.Screen
        name="HalamanAbsenPulang"
        component={HalamanAbsenPulang}
        options={{ title: 'Absensi Pulang' }}
      />
      <Stack.Screen
        name="MenuAbsensi"
        component={MenuAbsensi}
        options={{ title: 'Menu Absensi' }}
      />
      <Stack.Screen
        name="RiwayatStackScreen"
        component={RiwayatStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AprovalStackScreen"
        component={AprovalStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DispensasiScreen"
        component={DispensasiScreen}
        options={{ title: 'Pengajuan Dispensasi' }}
      />
      <Stack.Screen
        name="CutiTahunanScreen"
        component={CutiTahunanScreen}
        options={{ title: 'Pengajuan Cuti Tahunan' }}
      />
      <Stack.Screen
        name="LemburScreen"
        component={LemburScreen}
        options={{ title: 'Pengajuan Lembur' }}
      />

    </Stack.Navigator>
  );
}

export default function App() {

 
  const [isNavigating, setIsNavigating] = useState(false);

  async function verifyPermissions() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }
    return true;
  }

  async function checkAndSetPermission() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      setIsNavigating(false);
    }
  }

  // Call checkAndSetPermission on component mount or as needed
  useEffect(() => {
    checkAndSetPermission();
  }, []);


  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
