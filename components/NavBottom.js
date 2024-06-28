import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import { Animated } from 'react-native';
import ModalLogout from './ModalLogout';


function NavBottom() {
    const navigation = useNavigation();
    const [showAlert, setShowAlert] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    function buttonBeranda() {
        navigation.navigate('HalamanUtama');
    }
    function buttonAbsensiHandler() {
        navigation.navigate('MenuAbsensi');

    }
    async function buttonLogOutHandler() {
        toggleModal(); // Menampilkan modal konfirmasi


    }
    async function buttonLogOut2Handler() {
        

        // Reset navigasi ke halaman login
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
    }


    return (
        <View style={[styles.container]}>
            <View>
                <View style={[styles.rectangle]}>
                    <View style={styles.tataContainer2}>
                        <View style={[styles.column]}>
                            <Pressable
                                style={({ pressed }) => [styles.gridItem, pressed && styles.pressedButton]}
                                onPress={buttonBeranda}
                            >
                                <AntDesign name="home" size={30} color="#4C70C4" />
                                <Text style={styles.textTengah}>Beranda</Text>
                            </Pressable>
                        </View>
                        <View style={[styles.column2]}>
                            <Pressable
                                style={({ pressed }) => [styles.gridItem2, {
                                    backgroundColor: pressed ? '#white' : '#4C70C4', // Ubah warna tombol saat ditekan
                                }, pressed && styles.pressedButton]}
                                onPress={buttonAbsensiHandler}
                            >
                                <AntDesign name="clockcircleo" size={35} color="white" />

                            </Pressable>
                            <Text style={[styles.textTengah, { marginTop: 6, }]}>Absensi</Text>
                        </View>
                        <View style={[styles.column]}>
                            <Pressable
                                style={({ pressed }) => [styles.gridItem, pressed && styles.pressedButton]}
                                onPress={buttonLogOutHandler}
                            >
                                {/* <AntDesign name="logout" size={24} color="white" /> */}
                                <AntDesign name="logout" size={30} color="#4C70C4" />
                                <Text style={styles.textTengah}>Keluar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <ModalLogout visible={isModalVisible} closeModal={toggleModal} logoutHandler={buttonLogOut2Handler} />
            </View>
        </View>
    );
}

export default NavBottom;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tataContainer2: {
        flexDirection: 'row',
    },
    column: {
        margin: 25,
        height: 50,
        width: 100,
    },
    pressedButton: {
        opacity: 0.25
    },
    rectangle: {
        backgroundColor: '#E7F4FE',
        height: 60,
        borderWidth: 0.2,
        borderRadius: 10,
        borderColor: 'gray',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 3,
        borderColor: '#4C70C4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTengah: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4C70C4',
    },
    gridItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridItem2: {
        marginTop: -10,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40, // Half of height and width to make it circular
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.25,
        backgroundColor: '#03AED2',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    }

});