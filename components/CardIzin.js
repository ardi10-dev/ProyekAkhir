import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';

function CardIzin({ nama, nip, ket, jenisIzin }) {

    function ketStyle(ket) {
        switch (ket.toLowerCase()) {
            case 'ditolak':
                return { color: 'red' };
            case 'disetujui':
                return { color: 'green' };
            case 'diajukan':
                return { color: 'gray' };
            default:
                return {};
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={[styles.rectangle]}>
                    <View style={styles.tataContainer2}>
                        <View style={[styles.column]}>
                            <Text style={[styles.textTengah]}>{nama}</Text>
                            <Text style={[styles.textTengah]}>{nip}</Text>
                            <Text style={[styles.textTengah, ketStyle(ket)]}>{ket}</Text>
                        </View>
                        <View style={[styles.column]}>
                            <View style={[styles.column2]}>
                                <Text style={[styles.textTengah]}>Jenis Izin :</Text>
                                <Text style={[styles.textTengah]}>{jenisIzin}</Text>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default CardIzin;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tataContainer2: {
        flexDirection: 'row',
    },
    column: {
        width: '40%',
        height: 50,
        marginLeft: 20,
    },

    column2: {
        width: '70%',
        height: 50,
    },

    rectangle: {
        backgroundColor: 'white',
        height: 100,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        marginTop: 10,
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
        fontSize: 15,
        fontWeight: 'bold',
        width: '100',
    },
    image1: {
        height: 70,
        width: 70,
    },

});