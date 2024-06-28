import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';
import CardIzinAprov from "../../components/CardIzinAprov";
import { IZINAPP } from "../../data/dummy-data";



function AprovalIzin({navigation}) {

    

    function renderAprovIzin(itemData) {
        function pressHandler(){
            navigation.navigate('DetailAprovalIzin', {
                id:itemData.item.id,
            });
            console.log("ID:", itemData.item.id);
        }

        return (
            < CardIzinAprov
                nama={itemData.item.nama}
                nik={itemData.item.nik}
                jenisIzin={itemData.item.jenisIzin}
                onPress={pressHandler}
            />
        )
        
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#E7F4FE', }]}>
            <FlatList data={IZINAPP}
                keyExtractor={(item) => item.id}
                renderItem={renderAprovIzin}
            />


        </SafeAreaView>
    )
}

export default AprovalIzin;
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