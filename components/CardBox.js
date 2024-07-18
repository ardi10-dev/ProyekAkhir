import { View, Text, StyleSheet, Image } from "react-native";
import React from 'react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};


function CardBox({ nama, nip, ketIn, ketOut, tanggal, jam_masuk, jam_keluar, bukti_masuk, bukti_keluar, tgl_out }) {
    const ketStyle = (ketIn) => {
        switch (ketIn) {
            case 'absen_berhasil':
                return { text: 'Absen Berhasil', backgroundColor: 'green', textColor: 'white' };
            case 'Telat':
                return { text: 'Telat', backgroundColor: '#FF7777', textColor: 'black' };
            case 'Cuti':
                return { text: 'Cuti', backgroundColor: '#478CCF', textColor: 'white' };
            case 'Izin':
                return { text: 'Izin', backgroundColor: '#478CCF', textColor: 'white' };
            default:
                return { text: 'Belum Keluar', backgroundColor: '#478CCF', textColor: 'white' };
        }
    }
    const ketStyle2 = (ketOut) => {
        switch (ketOut) {
            case 'Tepat Waktu':
                return { text: 'Tepat Waktu', backgroundColor: 'green', textColor: 'white' };
            case 'Telat':
                return { text: 'Telat', backgroundColor: '#FF7777', textColor: 'black' };
            case 'Cuti':
                return { text: 'Cuti', backgroundColor: '#478CCF', textColor: 'white' };
            case 'Izin':
                return { text: 'Izin', backgroundColor: '#478CCF', textColor: 'white' };
            default:
                return { text: 'Belum Keluar', backgroundColor: '#478CCF', textColor: 'white' };
        }
    }
    // console.log('Bukti Masuk:', bukti_masuk);
    console.log('Bukti keluar:', bukti_keluar);

    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn1}>
                        <Text style={styles.label}>Tanggal:</Text>
                    </View>
                    <View style={styles.rightColumn2}>
                        <Text style={styles.label}>{tanggal}</Text>
                    </View>

                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.label}>Nama:</Text>
                        <Text style={styles.value}>{nama}</Text>
                        <Text style={styles.value}>----------------------</Text>
                        <Text style={styles.label}>tgl Absen Masuk:</Text>
                        <Text style={styles.value}>{tanggal}</Text>
                        <Text style={styles.value}>----------------------</Text>
                    </View>
                    <View style={styles.centerColumn}>
                        <Text style={styles.label}>NIP:</Text>
                        <Text style={styles.value}>{nip}</Text>
                        <Text style={styles.value}>----------------------</Text>
                        <Text style={styles.label}>tgl Absen Keluar:</Text>
                        <Text style={styles.value}>{tgl_out}</Text>
                        <Text style={styles.value}>----------------------</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>foto Masuk :</Text>
                        {bukti_masuk && (
                            <Image source={{ uri: `https://hc.baktitimah.co.id/pegawaian/image/absen_masuk/${bukti_masuk}` }} style={styles.image}
                            />
                        )}


                    </View>

                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.label}>Jam Masuk:</Text>
                        <Text style={styles.value}>{jam_masuk}</Text>
                        <Text style={[styles.label, { marginTop: 10 }]}>Keterangan Absen</Text>
                    </View>
                    <View style={styles.centerColumn}>
                        <Text style={styles.label}>Jam  Keluar:</Text>
                        <Text style={styles.value}>{jam_keluar}</Text>

                        <View style={[styles.statusContainer, { backgroundColor: ketStyle(ketIn).backgroundColor }]}>
                            <Text style={[styles.statusText, { color: ketStyle(ketIn).textColor }]}>{ketStyle(ketIn).text}</Text>
                        </View>


                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>foto Keluar :</Text>

                        {bukti_keluar && (
                            <Image source={{ uri: `https://hc.baktitimah.co.id/pegawaian/image/absen_keluar/${bukti_keluar}` }} style={styles.image} />
                        )}

                    </View>

                </View>
            </View>
        </View>
    );
}

export default CardBox;

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
        marginBottom: 10,
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
        width: '30%',
    },
    rightColumn: {
        width: '30%',
    },
    centerColumn: {
        width: '30%',
    },
    leftColumn1: {
        width: '45%',
    },
    rightColumn2: {
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
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    image: {
        width: 100,
        height: 60,
        borderRadius: 5,
        margin: 5,
        borderColor: '#4C70C4',

    },
});
