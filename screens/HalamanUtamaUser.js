import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardMenu from "../components/CardMenu";
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import DispensasiScreen from "./form/DispensasiScreen";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import { PEGAWAI } from '../data/dummy-data';



function HalamanUtamaUser() {
    const [locationPermissionsInformation, requestPermission] = useForegroundPermissions();
    const [sessionId, setSessionId] = useState('');
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchSessionData = async () => {
            const id = await AsyncStorage.getItem('sessionId');
            const user = await AsyncStorage.getItem('username');
            setSessionId(id);
            setUsername(user);
            if (id) {
                const foundUser = PEGAWAI.find(pegawai => pegawai.id === id);
                setUserData(foundUser);
            }
        };

        fetchSessionData();
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
        await AsyncStorage.clear();

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
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

            <View style={{ backgroundColor: '#FFC470', height: 220, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
                <View style={{ backgroundColor: '#10439F', height: '85%', borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}>
                    <View style={styles.appContainer}>
                        <View style={styles.tataContainer}>
                            <View >
                                <Text style={[styles.bold, { fontSize: 20, color: 'white' }]}>Selamat Datang</Text>
                            </View>
                            <Pressable
                                style={({ pressed }) => [styles.logoutContainer, pressed && styles.pressedButton,]}
                                onPress={buttonLogoutHandle}
                            >
                                <AntDesign name="logout" size={24} color="white" />
                            </Pressable>

                        </View>

                        <View style={styles.tataContainer}>
                            {userData && (
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image1}
                                        source={{ uri: userData.imageUrl }}
                                        
                                    />
                                </View>
                            )}
                            {userData && (

                                <View style={styles.column}>
                                    <Text style={[styles.bold, { color: 'white' }]} > {userData.nama}</Text>
                                    <Text style={[styles.bold, { color: 'white' }]} > {userData.staff}</Text>
                                </View>
                            )}
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

            </View>

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
                                    <View style={[{ margin: 5 }]}>
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
                                    <View style={[{ margin: 5 }]}>
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
                    <CardMenu />
                </View>
            </ScrollView>


        </SafeAreaView>
    )
}

export default HalamanUtamaUser;
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
        marginTop: 30,
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
        margin: 5,
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



});