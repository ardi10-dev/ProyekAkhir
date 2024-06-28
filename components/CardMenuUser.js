import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';





function CardMenuUser() {
    const navigation = useNavigation();

    function buttonMenuAbsHandler() {
        navigation.navigate('MenuAbsensi');
    }
    function buttonIzinHandler() {
        navigation.navigate('DispensasiScreen');
    }
    function buttonCutiHandler() {
        navigation.navigate('CutiTahunanScreen');
    }
    function buttonRiwayatHandler() {
        navigation.navigate('HalamanRiwayat');
    }
    function buttonAprovHandler() {
        navigation.navigate('HalamanAproval');
    }
    function buttonLemburHandler() {
        navigation.navigate('LemburScreen');
    }

    return (
        <View >
            <View style={[{ flexDirection: 'row' }]}>
                <View style={[{margin:7}]}>
                    <Pressable
                        style={({ pressed }) => [style.gridItem, pressed && style.pressedButton,]}
                        onPress={buttonMenuAbsHandler} >
                        <AntDesign name="clockcircle" size={30} color="#03AED2" />
                        <Text>Absensi</Text>
                    </Pressable>
                </View>

                <View style={[{margin:7}]}>
                    <Pressable
                        style={({ pressed }) => [style.gridItem, pressed && style.pressedButton,]}
                        onPress={buttonCutiHandler} >
                        <FontAwesome6 name="calendar-day" size={30} color="#FDDE55" />
                        <Text>Cuti</Text>
                    </Pressable>
                </View>
                <View style={[{margin:7}]}>
                    <Pressable
                        style={({ pressed }) => [style.gridItem, pressed && style.pressedButton,]}
                        onPress={buttonIzinHandler} >
                        <MaterialCommunityIcons name="clipboard-list" size={30} color="#FC4100" />
                        <Text>Izin</Text>
                    </Pressable>
                </View>
            </View>

            <View style={[{ flexDirection: 'row' }]}>
                
                <View style={[{margin:7}]}>
                    <Pressable
                        style={({ pressed }) => [style.gridItem, pressed && style.pressedButton,]}
                        onPress={buttonLemburHandler} >
                        <FontAwesome6 name="user-clock" size={30} color="#DD5746" />
                        <Text>Lembur</Text>
                    </Pressable>
                </View>

                <View style={[{margin:7}]}>
                    <Pressable
                        style={({ pressed }) => [style.gridItem, pressed && style.pressedButton,]}
                        onPress={buttonRiwayatHandler} >
                       <MaterialIcons name="work-history" size={30} color="#10439F" />
                        <Text>Riwayat</Text>
                    </Pressable>
                </View>
                <View style={[{margin:7}]}>
                    <Pressable
                        style={({ pressed }) => [style.gridItem, pressed && style.pressedButton,]}
                        onPress={buttonAprovHandler} >
                        <MaterialIcons name="approval" size={30} color="#D20062" />
                        <Text>Approval</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    );
}

export default CardMenuUser;
const style = StyleSheet.create({
    gridItem: {
        margin: 16,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, width: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.25,
        backgroundColor: 'white',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    },
    button: {
        flex: 1,
    },
    buttonPrassed: {
        opacity: 0.5,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: 40,
        width: 40,
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white'
    },
    pressedButton: {
        opacity: 0.25
    },

})