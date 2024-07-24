import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';

function CardLembur({ nama, nip, ket, jenisIzin, tanggal, waktu_mulai, waktu_akhir, tgl_lembur }) {

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

    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.label}>Tanggal Pengajuan:</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>{tanggal}</Text>
                    </View>
                    
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.label}>Tanggal Lembur:</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>{tgl_lembur}</Text>
                    </View>
                </View>
                
                <View style={[styles.rowContainer,{marginTop:9,}]}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.label}>Waktu Mulai:</Text>
                        <Text style={styles.value}>{waktu_mulai}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>Waktu Akhir:</Text>
                        <Text style={styles.value}>{waktu_akhir}</Text>
                    </View>
                </View>
                {/* <View style={[styles.rowContainer,{marginTop:10,}]}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.label}>Tanggal:</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>{tanggal}</Text>
                    </View>
                </View> */}
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={[styles.label, { marginTop: 10 }]}>Keterangan:</Text>
                        <View style={[styles.statusContainer, { backgroundColor: ketStyle(ket).backgroundColor}]}>
                            <Text style={[styles.statusText,{ color: ketStyle(ket).textColor }]}>{ketStyle(ket).text}</Text>
                        </View>
                    </View>
                    {/* <View style={styles.rightColumn}>
                        <Text style={[styles.label, { marginTop: 10 }]}>Jenis Lembur:</Text>
                        <Text style={styles.textTengah}>{jenisIzin}</Text>
                    </View> */}
                </View>
                
            </View>
        </View>
    )
}


export default CardLembur;

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
        marginTop: 10,
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
});