import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';
import CardIzin from "../../components/CardIzin";
import { IZIN } from "../../data/dummy-data";


function RiwayatIzin() {

    function renderRiwayatIzin(itemData) {
        return (
            <CardIzin
                nama={itemData.item.nama}
                nip={itemData.item.nip}
                ket={itemData.item.ket}
                jenisIzin={itemData.item.jenisIzin}
            />
        )
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#E7F4FE', }]}>
            <FlatList data={IZIN}
                keyExtractor={(item) => item.id}
                renderItem={renderRiwayatIzin}
            />


        </SafeAreaView>
    )
}

export default RiwayatIzin;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    appContainer: {
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    tataContainer: {
        flexDirection: 'row',
    },
    tataContainer2: {
        flexDirection: 'row',
        marginLeft: '10'

    },
    column: {
        width: '40%',
        height: 40,
        margin: 5

    },
    column2: {
        width: '40%',
        height: 50,
        marginLeft: 20,

    },
    image1: {
        height: 40,
        width: 40,
    },
    bold: {
        fontWeight: 'bold',
    },
    rectangle: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'gray',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
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
        marginTop: 5,
        backgroundColor: '#008DDA',
        height: 50,
        justifyContent: 'center'
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        margin: 5,
    },
    pressedButton: {
        opacity: 0.25
    },



});