import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert, BackHandler } from "react-native";
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import NavBottom from "../../components/NavBottom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native';



function MenuAbsensi({ route }) {

    const navigation = useNavigation();

    const [locationPermissionsInformation, requestPermission] = useForegroundPermissions();
    const [sessionId, setSessionId] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [profileUser, setProfileUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const userData = route.params && route.params.userData ? route.params.userData : {};
    const userEmail = userData.email || 'Guest';
    const role_id = userData.role_id;
    const id_pegawai = userData.id_pegawai;

    const [shiftData, setShiftData] = useState(null);
    const [jam_masukShift, setJam_masukShift] = useState();
    const [jam_KeluarShift, setJam_KeluarShift] = useState();
    const [btndisabel, setBtndisabel] = useState(false);
    const [btnPulangDisabel, setBtnPulangDisabel] = useState(false);

    useEffect(() => {
        const setJamShift = async () => {
            let masukJamshift = await AsyncStorage.getItem('jam_masuk');
            let keluarJamshift = await AsyncStorage.getItem('jam_keluar');
            setJam_masukShift(masukJamshift);
            setJam_KeluarShift(keluarJamshift);
        }
        const focusSubscription = navigation.addListener('focus', () => {
            setJamShift();
        });
        return () => {
            focusSubscription();
        };
    }, [navigation]);

    useEffect(() => {
        const fetchDatajadwalMasuk = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(data);
                const idPegawai = userData.id_pegawai;

                const apiUrl = `https://hc.baktitimah.co.id/pegawaian/api/API_Absen/dataAbsen_get?id_pegawai=${idPegawai}`;
                const response = await fetch(apiUrl);
                const absenData = await response.json();

                const filterdata = absenData.data;
                const today = new Date().toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });

                let isTodayAbsen = false;
                let isTodayAbsen2 = false;
                filterdata.forEach((item) => {
                    if (item[4] === today || item[15] === null) {
                        isTodayAbsen = true;
                    }
                    // console.log(item[4]);
                    // console.log('tgl', item[15]);
                });

                setBtndisabel(isTodayAbsen);
            } catch (error) {
                console.error('Error fetching absence data:', error);
            }
        };
        const fetchAbsenceDataKel = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(data);
                const idPegawai = userData.id_pegawai;

                const apiUrl = `https://hc.baktitimah.co.id/pegawaian/api/API_Absen/dataAbsen_get?id_pegawai=${idPegawai}`;
                const response = await fetch(apiUrl);
                const absenData = await response.json();

                const filterdata = absenData.data;
                const today = new Date().toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });

                let isTodayAbsen2 = false;
                let hasNull = false;

                filterdata.forEach((item) => {
                    if (item[15] === null) {
                        hasNull = true;
                        isTodayAbsen2 = false;
                    }
                    // console.log(item[4]);
                    console.log('tgl', item[15]);
                });

                if (!hasNull) {
                    setBtnPulangDisabel(true);
                } else {
                    setBtnPulangDisabel(isTodayAbsen2);
                }
            } catch (error) {
                console.error('Error fetching absence data:', error);
            }
        };


        const focusSubscription = navigation.addListener('focus', () => {
            fetchDatajadwalMasuk();
            fetchAbsenceDataKel();
            
        });

        return () => {
            focusSubscription();
        };
    }, [navigation]);

    async function verifyPermissions() {
        if (locationPermissionsInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionsInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }
        return true;
    }

    async function buttonAbsensHandler() {
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                return;
            }
            const location = await getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            navigation.navigate('HalamanAbsensi', { latitude, longitude });
        } catch (error) {
            Alert.alert('Error', 'Failed to get location.');
        }
    }

    async function buttonAbsensPulangHandler() {
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                return;
            }
            const location = await getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            navigation.navigate('HalamanAbsensPulang', { latitude, longitude });
        } catch (error) {
            Alert.alert('Error', 'Failed to get location.');
        }
    }

    useEffect(() => {
        const backAction = () => {

            navigation.navigate("HalamanUtama");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        // Cleanup listener saat komponen unmount
        return () => backHandler.remove();
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContent}>
                <View>
                    <View style={[styles.rectangle]}>
                        <View style={styles.tataContainer2}>
                            <View style={[styles.column2]}>
                                <View style={styles.tataContainer2}>
                                    <View style={[{ justifyContent: 'center' }]}>
                                        <MaterialCommunityIcons name="login" size={50} color="black" />
                                    </View>
                                    <View style={[styles.column]}>
                                        <Text style={[styles.textTengah]}>Absen Masuk</Text>
                                        <Text style={[styles.textTengah]}>{jam_masukShift || "00:00:00"}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.column2]}>
                                <Pressable
                                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: btndisabel ? 'gray' : 'blue' }]}
                                    onPress={buttonAbsensHandler}
                                    disabled={btndisabel}
                                >
                                    <Text style={styles.textButton}>Absen Masuk</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={[styles.rectangle]}>
                        <View style={styles.tataContainer2}>
                            <View style={[styles.column2]}>
                                <View style={styles.tataContainer2}>
                                    <View style={[{ justifyContent: 'center' }]}>
                                        <MaterialCommunityIcons name="logout" size={50} color="black" />
                                    </View>
                                    <View style={[styles.column]}>
                                        <Text style={[styles.textTengah]}>Absen Pulang</Text>
                                        <Text style={[styles.textTengah]}>{jam_KeluarShift || "00:00:00"}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.column2]}>
                                <Pressable
                                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: btnPulangDisabel ? 'gray' : 'blue' }]}
                                    onPress={buttonAbsensPulangHandler}
                                    disabled={btnPulangDisabel}
                                >
                                    <Text style={styles.textButton}>Absen Pulang</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <NavBottom style={styles.posisiFixed} />
        </SafeAreaView>
    );
}

export default MenuAbsensi;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        flex: 1,
        // Gaya untuk konten utama
    },
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    tataContainer: {
        flexDirection: 'row',
    },
    tataContainer2: {
        flexDirection: 'row',
    },
    column: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    column2: {
        width: '40%',
        height: 50,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    rectangle: {
        backgroundColor: 'white',
        height: 100,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderColor: '#4C70C4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTengah: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        width: '100',
    },

    buttonContainer: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 150,
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        margin: 6,
    },
    pressedButton: {
        opacity: 0.25
    },
    posisiFixed: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },

});