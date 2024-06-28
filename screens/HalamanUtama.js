import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
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





function HalamanUtama({route}) {
    const [locationPermissionsInformation, requestPermission] = useForegroundPermissions();
    const [sessionId, setSessionId] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    const userData = route.params && route.params.userData ? route.params.userData : {};
    const userEmail = userData.email || 'Guest';
    const role_id = userData.role_id; 

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        };

        fetchUserId();
    }, []);



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

    const navigation = useNavigation();

    async function buttonLogoutHandle() {

    }

    async function buttonAbsensHandler() {
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                return;
            }
            const location = await getCurrentPositionAsync({});
            console.log(location);

            const { latitude, longitude } = location.coords;
            navigation.navigate('HalamanAbsen', { latitude, longitude });
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
            console.log(location);

            const { latitude, longitude } = location.coords;
            navigation.navigate('HalamanAbsensPulang', { latitude, longitude });
        } catch (error) {
            Alert.alert('Error', 'Failed to get location.');
        }
    }


    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);



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
                                {userData && (
                                    <View style={styles.imageContainer}>
                                        <Image style={styles.image1}
                                            source={{ uri: userData.imageUrl }}

                                        />
                                    </View>
                                )}
                                    <View style={styles.column}>
                                        {/* {userId ? <Text style={[styles.bold, { color: 'white' }]} >{userId}</Text>} */}
                                        {/* <Text>Welcome, {userEmail}</Text> */}
                                        <Text style={[styles.bold, { color: 'white' }]} >{userEmail}</Text>
                                        <Text style={[styles.bold, { color: 'white' }]} >{userData.id_pegawai}</Text>
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
                            <Text style={[styles.textTengah, { fontWeight: 'bold', fontSize: 15 }]}>00:00:00</Text>
                        </View>
                        <View style={styles.column2}>
                            <Text style={[styles.textTengah, { fontWeight: 'bold', fontSize: 15 }]}>00:00:00</Text>
                        </View>
                    </View>

                    <View style={styles.tataContainer2}>
                        <View style={[styles.column2]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                onPress={buttonAbsensHandler}
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
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                onPress={buttonAbsensPulangHandler}
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
                     <CardMenu role_id={role_id} />

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
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        height: '100%',
        width: '100%a',
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
        backgroundColor: '#008DDA',
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