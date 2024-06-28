import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import NavBottom from "../../components/NavBottom";


function MenuAbsensi() {

    const [locationPermissionsInformation, requestPermission] = useForegroundPermissions();

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
                                        <Text style={[styles.textTengah]}>00:00:00</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={[styles.column2]}>
                                <Pressable
                                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                    onPress={buttonAbsensHandler}
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
                                        <Text style={[styles.textTengah]}>00:00:00</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={[styles.column2]}>
                                <Pressable
                                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                    onPress={buttonAbsensPulangHandler}
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
    )
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
        backgroundColor: '#008DDA',
        borderRadius: 10,
        height: 40,
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