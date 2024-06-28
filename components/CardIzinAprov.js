import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';

function CardIzinAprov({ nama, nik, jenisIzin, onPress }) {

    return (
        <View style={styles.container}>
            <View>
                <View style={[styles.rectangle]}>
                    <View style={styles.tataContainer}>
                        <View style={[styles.column2]}>
                            <View style={styles.tataContainer}>
                                <View style={[styles.column]}>
                                    <Text style={[styles.textTengah]}>{nama}</Text>
                                    <Text style={[styles.textTengah]}> {nik} </Text>
                                    <Text style={[styles.textTengah]}> jenis izin :  * {jenisIzin}</Text>
                                </View>
                            </View>

                        </View>
                        <View style={[styles.column2]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                onPress={onPress}
                            >
                                <Text style={styles.textButton}>Detail Izin</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CardIzinAprov;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tataContainer: {
        flexDirection: 'row',
    },
    column: {
        width: '100%',
        height: 50,
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

});