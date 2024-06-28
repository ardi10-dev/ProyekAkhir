import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';





function CardMenu({ role_id }) {
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

    const commonItems = [
        { icon: <AntDesign name="clockcircle" size={30} color="#03AED2" />, text: 'Absensi', handler: buttonMenuAbsHandler },
        { icon: <FontAwesome6 name="calendar-day" size={30} color="#FDDE55" />, text: 'Cuti', handler: buttonCutiHandler },
        { icon: <MaterialCommunityIcons name="clipboard-list" size={30} color="#FC4100" />, text: 'Izin', handler: buttonIzinHandler },
        { icon: <FontAwesome6 name="user-clock" size={30} color="#DD5746" />, text: 'Lembur', handler: buttonLemburHandler },
        { icon: <MaterialIcons name="work-history" size={30} color="#10439F" />, text: 'Riwayat', handler: buttonRiwayatHandler },
    ];

    const pimpinanItems = [
        ...commonItems,
        { icon: <MaterialIcons name="approval" size={30} color="#D20062" />, text: 'Approval', handler: buttonAprovHandler },
    ];
    let itemsToRender;

    if (['1', '2', '3'].includes(role_id)) {
        itemsToRender = pimpinanItems;
    } else {
        itemsToRender = commonItems;
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {itemsToRender.map((item, index) => (
                    <View key={index} style={styles.itemWrapper}>
                        <Pressable
                            style={({ pressed }) => [styles.gridItem, pressed && styles.pressedButton]}
                            onPress={item.handler}
                        >
                            {item.icon}
                            
                        </Pressable>
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default CardMenu;
const styles = StyleSheet.create({
    itemWrapper: {
        padding: 15,
        alignItems: 'center',
        margin: 7,
    },
    gridItem: {
        margin: 10,
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
        backgroundColor: 'white',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
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
    text : {
        marginTop: - 8,
        textAlign: 'center',
    }

})