import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert, BackHandler } from "react-native";
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardMenu from "../components/CardMenu";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import { PEGAWAI } from '../data/dummy-data';
import { LinearGradient } from 'expo-linear-gradient';
import NavBottom from "../components/NavBottom";
import { ActivityIndicator } from 'react-native';
import DefaultProfileImage from '../assets/user.png';
import * as Location from 'expo-location';
// import useDetectMockLocationApp from "../library/useDetectMockLocationApp";


function HalamanUtama({ route }) {
    const navigation = useNavigation();
    const [isNavigating, setIsNavigating] = useState(false);
    const isMockLocationAppDetected = useDetectMockLocationApp();

    const [locationPermissionsInformation, requestPermission] = useForegroundPermissions();
    const [sessionId, setSessionId] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    const [profileUser, setProfileUser] = useState([]); // Initialize as empty array
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
    }, [navigation]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data !== null) {
                    const userData = JSON.parse(data);
                    setUserId(userData.id_pegawai);
                    setUserId(userData.role_id);
                    // console.log(userData.id_pegawai); 
                    // console.log(userData.role_id); 
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchProfileUser = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data !== null) {
                    const userData = JSON.parse(data);
                    const idPegawai = userData.id_pegawai;

                    const apiUrl = `https://hc.baktitimah.co.id/pegawaian/api/Login/profile?id_pegawai=${idPegawai}`;
                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const responseData = await response.json();

                    const imageUrl = `http://hc.baktitimah.co.id/pegawaian/image/profileuser/${responseData.data.image}`;

                    // Log the image URL http://hc.baktitimah.co.id/pegawaian/image/profileuser/6572eb41f44929edc64d000cee576ed3.jpg
                    // console.log("Image URL:", imageUrl);
                    setProfileUser(responseData.data);
                    setLoading(false);
                    // console.log("Data Profile:", responseData.data.image);

                }
            } catch (error) {
                console.error('Error fetching riwayat izin:', error);
                setLoading(false); // 
            }
        };

        fetchUserId();
        fetchProfileUser();
    }, []);
    useEffect(() => {
        const fetchDatajadwalMasuk = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(data);
                const idPegawai = userData.id_pegawai;

                const apiUrl = `https://hc.baktitimah.co.id/pegawaian/api/API_Absen/dataAbsen_get?id_pegawai=${idPegawai}`;
                const response = await fetch(apiUrl);
                const absenData = await response.json();
                // console.log(response);

                const filterdata = absenData.data;

                // Get today's date with Indonesia time zone in yyyy-MM-dd format
                const today = new Date().toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });

                let isTodayAbsen = false;
                filterdata.forEach((item) => {
                    // Assuming item[4] is in yyyy-MM-dd format
                    if (item[4] == today) {
                        isTodayAbsen = true;
                        // console.log(item[4]);
                    }
                    // console.log(item[4]);
                });

                setBtndisabel(isTodayAbsen);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error state if needed
            }
        };
        const fetchDatajadwalKeluar = async () => {
            const jamKeluar = await AsyncStorage.getItem('jam_keluar');
            const currentTime = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' });
            const partst = currentTime.split(".");
            const hour = partst[0];
            const minute = partst[1];
            const second = partst[2];
            const formattedTime = `${hour}:${minute}:${second}`;

            // console.log(jamKeluar);
            // console.log(formattedTime);


            if (formattedTime > jamKeluar) {
                setBtnPulangDisabel(false);
            } else {
                setBtnPulangDisabel(true);
            }

        };



        const focusSubscription = navigation.addListener('focus', () => {
            fetchDatajadwalMasuk();
            fetchDatajadwalKeluar();

        });

        return () => {
            focusSubscription();
        };
    }, [navigation, setBtndisabel, setBtnPulangDisabel]);

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

    async function isMockLocation() {
        const { isMocked } = await getCurrentPositionAsync({});
        return isMocked;
    }

    async function buttonAbsensHandler() {
        if (isNavigating) return; 
        setIsNavigating(true);
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                setIsNavigating(false);
                return;
            }

            const data = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(data);
            const idPegawai = userData.id_pegawai;

            const apiUrl = `https://hc.baktitimah.co.id/pegawaian/api/API_Absen/dataAbsen_get?id_pegawai=${idPegawai}`;
            const response = await fetch(apiUrl);
            const absenData = await response.json();
            // console.log(absenData);
            const filterdata = absenData.data;
            let tanggal_absen = [];

            filterdata.forEach((item) => {
                tanggal_absen.push(item[4]);
            });


            const location = await getCurrentPositionAsync({});
            console.log(location);

            const { latitude, longitude } = location.coords;
            // if (isMockLocationAppDetected) {
            //     Alert.alert('Warning', 'Detected usage of fake GPS location.');
            //     setIsNavigating(false);
            //     return;
            // }
            navigation.navigate('HalamanAbsensi', { latitude, longitude });
        } catch (error) {
            Alert.alert('Error', 'Failed to get location.');
        } finally {
            isNavigating = false;
        }
    };

    async function buttonAbsensPulangHandler() {
        try {
            if (isNavigating) return;

            isNavigating = true;
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                isNavigating = false;
                return;
            }

            const location = await getCurrentPositionAsync({});
            console.log(location);

            const { latitude, longitude } = location.coords;

            navigation.navigate('HalamanAbsenPulang', { latitude, longitude });
        } catch (error) {
            Alert.alert('Error', 'Failed to get location.');
        } finally {
            isNavigating = false; // Reset status navigasi setelah selesai
        }
    };


    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const buttonLogOut2Handler = async (navigation) => {
        try {
            await AsyncStorage.removeItem('userData');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => buttonLogOut2Handler(navigation) }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);

    const getImageSource = () => {
        if (profileUser && profileUser.image) {
            return { uri: `http://hc.baktitimah.co.id/pegawaian/image/profileuser/  ${userData.image}` };
        } else {
            // Jika tidak ada gambar profil atau gambar tidak ditemukan, tampilkan gambar default
            return DefaultProfileImage; // Ganti dengan sumber gambar default yang Anda miliki
        }
    };


    return (
        <SafeAreaView style={[{ backgroundColor: '#E7F4FE', flex: 1 }]}>

            <View style={{ height: 250, }}>
                <LinearGradient colors={['#4C3BCF', '#667BC6', '#FFC470']} style={styles.linearGradient}>
                    <View style={{ height: '85%', borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}>
                        <View style={styles.appContainer}>
                            <View style={styles.tataContainer}>
                                <View >
                                    <Text style={[styles.bold, { fontSize: 25, color: 'white', marginBottom: 20 }]}>Selamat Datang</Text>
                                </View>
                            </View>

                            <View style={styles.tataContainer}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image1}
                                        source={getImageSource()}
                                    />
                                </View>
                                <View style={styles.column}>
                                    {/* {userId ? <Text style={[styles.bold, { color: 'white' }]} >{userId}</Text>} */}
                                    {/* <Text>Welcome, {userEmail}</Text> */}
                                    <Text style={[styles.bold, { color: 'white', fontSize: 15, }]} >{profileUser.nama}</Text>
                                    <Text style={[styles.bold, { color: 'white', fontSize: 12, }]} >{profileUser.nm_unit_kerja}</Text>
                                </View>
                                <View style={[{ marginLeft: 10, }]}>

                                    <Text style={[styles.bold, { textAlign: 'right', color: 'white' }]}>{new Date().toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</Text>
                                    <Text style={[{ fontWeight: 'bold', textAlign: 'right', color: 'white', fontSize: 12, }]}> {new Date().toLocaleTimeString('id-ID')} WIB</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View >

            <View>
                <View style={[styles.rectangle, styles.centered]}>
                    <View style={styles.tataContainer2}>
                        <View style={[styles.column2]}>
                            <Text style={[styles.textTengah, { marginTop: 15, color: 'grey', fontWeight: 'bold' }]}>Absen Masuk</Text>
                        </View>
                        <View style={styles.column2}>
                            <Text style={[styles.textTengah, { marginTop: 15, color: 'grey', fontWeight: 'bold' }]}>Absen Pulang</Text>
                        </View>
                    </View>

                    <View style={styles.tataContainer2}>
                        <View style={[styles.column2]}>
                            <Text style={[styles.textTengah, { fontWeight: 'bold', fontSize: 15 }]}>{(jam_masukShift) ? jam_masukShift : "00:00:00"}</Text>
                        </View>
                        <View style={styles.column2}>
                            <Text style={[styles.textTengah, { fontWeight: 'bold', fontSize: 15 }]}>{(jam_KeluarShift) ? jam_KeluarShift : "00:00:00"}</Text>
                        </View>
                    </View>

                    <View style={styles.tataContainer2}>
                        <View style={[styles.column2]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: btndisabel ? 'gray' : 'blue' }]}
                                onPress={buttonAbsensHandler}
                                disabled={btndisabel}
                            >
                                <View style={styles.tataContainer2}>
                                    <View style={styles.absenContainer}>
                                        <MaterialCommunityIcons name="login" size={20} color="white" />
                                    </View>
                                    <View style={[]}>
                                        <Text style={styles.textButton}>Masuk</Text>
                                    </View>
                                </View>
                            </Pressable>
                        </View>

                        <View style={[styles.column2]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: btnPulangDisabel ? 'gray' : 'blue' }]}
                                onPress={buttonAbsensPulangHandler}
                                disabled={btnPulangDisabel}
                            >
                                <View style={styles.tataContainer2}>
                                    <View style={styles.absenContainer}>
                                        <MaterialCommunityIcons name="logout" size={20} color="white" />
                                    </View>
                                    <View style={[]}>
                                        <Text style={styles.textButton}>Pulang</Text>
                                    </View>
                                </View>
                            </Pressable>
                        </View>


                    </View>
                </View>
            </View>

            <ScrollView style={[{ marginTop: 20 }]}>
                <View style={{ alignItems: 'center' }}>
                    <CardMenu role_id={profileUser.role_id} />

                </View>
            </ScrollView>

            <NavBottom style={styles.posisiFixed} />


        </SafeAreaView >
    )
}

export default HalamanUtama;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '40%',
        height: 40,
        marginLeft: 20,

    },
    column2: {
        width: '40%',
        height: 50,
        marginLeft: 20,

    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 75,
        overflow: 'hidden',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    bold: {
        fontWeight: 'bold',
    },
    rectangle: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: -60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 5,
        elevation: 3,
        borderColor: '#4C70C4'
    },
    centered: {
        alignSelf: 'center',
    },
    textTengah: {
        textAlign: 'center',
    },

    buttonContainer: {
        borderRadius: 30,
        alignItems: 'center',
        height: 30,
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 12,
        marginTop: 8,
    },
    pressedButton: {
        opacity: 0.25
    },
    logoutContainer: {
        marginLeft: 180,
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    logoutText: {
        color: 'white',
        marginLeft: 8,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    absenContainer: {
        marginRight: 10,
        marginTop: 5
    },
    posisiFixed: {
        position: 'absolute',
    },



});