import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


function CardCutiApprove({ Id_pegawai_cuti, nama, nip, ket, jenisIzin, tanggal, tgl_mulai, tgl_akhir }) {

    const navigation = useNavigation();


    const ketStyle = (ket) => {
        switch (ket) {
            case '0':
                return { text: 'Diajukan', backgroundColor: '#FFD700', textColor: 'black' };
            case '1':
                return { text: 'Disetujui', backgroundColor: 'green', textColor: 'white' };
            case '2':
                return { text: 'Ditolak', backgroundColor: 'red', textColor: 'black' };
            default:
                return { text: 'Unknown', backgroundColor: 'white', textColor: 'black' };
        }
    }


    function buttonMenuDetail() {
        navigation.navigate('DetailApprovalCuti', { id: Id_pegawai_cuti });
        console.log(Id_pegawai_cuti);
    }



    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.label}>Tanggal:</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>{tanggal}</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.label}>Nama:</Text>
                        <Text style={styles.value}>{nama}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>NIP:</Text>
                        <Text style={styles.value}>{nip}</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={[styles.label, { marginTop: 10 }]}>Keterangan:</Text>
                        <View style={[styles.statusContainer, { backgroundColor: ketStyle(ket).backgroundColor }]}>
                            <Text style={[styles.statusText, { color: ketStyle(ket).textColor }]}>{ketStyle(ket).text}</Text>
                        </View>
                        {/* <View style={styles.statusContainer}>
                            <Text style={[styles.statusText]}>{ketStyle(ket).text}</Text>

                        </View> */}

                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={[styles.label, { marginTop: 10 }]}>Jenis Izin:</Text>
                        <Text style={styles.textTengah}>{jenisIzin}</Text>
                    </View>
                </View>


                <View style={styles.rowContainer}>
                    <View style={[styles.rightColumn, { marginTop: 10, }]}>
                        {/* <Pressable
                            style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: '#E4003A', }]}
                            onPress={''}
                        >
                            <Text style={styles.textButton}>TOLAK</Text>
                        </Pressable> */}
                    </View>
                    <View style={[styles.rightColumn, { marginTop: 10, }]}>
                        <Pressable
                            style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: '#008DDA', }]}
                            onPress={buttonMenuDetail}
                        >
                            <Text style={styles.textButton}>DETAIL</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default CardCutiApprove;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangle: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        marginTop: 5, 
        marginBottom: 5,
        padding: 16,
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    leftColumn: {
        width: '45%',
    },
    rightColumn: {
        width: '45%',
    },
    column: {
        width: '50%',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555',
        marginLeft: 15,
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 15,
    },
    textTengah: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 15,
    },
    statusContainer: {
        backgroundColor: 'yellow', // Warna latar belakang sesuai dengan status
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonContainer: {
        padding: 10,

        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white'
    },
    pressedButton: {
        opacity: 0.5,
    },
});