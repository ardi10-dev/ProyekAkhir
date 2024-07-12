import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, Platform, BackHandler } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import { Animated } from 'react-native';
import ModalLogout from './ModalLogout';
import { MaterialIcons } from '@expo/vector-icons';


function NavBottom() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const buttonBeranda = () => {
        navigation.navigate('HalamanUtama');
    };

    const buttonAbsensiHandler = () => {
        navigation.navigate('RiwayatStackScreen', { screen: 'RiwayatAbsen' });
    };

    const buttonLogOutHandler = () => {
        toggleModal();
    };

    const buttonLogOut2Handler = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('userData');
            const response = await fetch('https://hc.baktitimah.co.id/pegawaian/api/Login/HapusToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: storedUserData
                })
            })
            const data = await response.json();
            console.log(data);
            if (data.status == 200) {
                navigation.navigate("Login")
            }
           
            // if (storedUserData) {
            //     const userDataParsed = JSON.parse(storedUserData);
            //     setUserData(userDataParsed);
            // }

            // const token = userData ? userData.token : null;
            // console.log('token yang di HU', token);

            // if (!token) {
            //     navigation.replace('Login');
            //     return;
            // }
        } catch (error) {
            console.error('Error checking token:', error);
        } 
        // try {

        //     await AsyncStorage.removeItem('userData');
        //     navigation.dispatch(
        //         CommonActions.reset({
        //             index: 0,
        //             routes: [{ name: 'Login' }],
        //         })
        //     );
        // } catch (error) {
        //     console.error(error);
        // }
    };

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to log out?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: buttonLogOut2Handler }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);

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
                                    backgroundColor: pressed ? '#white' : '#4C70C4',
                                }, pressed && styles.pressedButton]}
                                onPress={buttonAbsensiHandler}
                            >
                                {/* <AntDesign name="clockcircleo" size={35} color="white" /> */}
                                <MaterialIcons name="work-history" size={35} color="white" />

                            </Pressable>
                            <Text style={[styles.textTengah, { marginTop: 6, }]}>Riwayat</Text>
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
        borderWidth: 0.5,
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