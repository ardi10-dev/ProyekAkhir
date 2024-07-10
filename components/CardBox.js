import { View, Text, StyleSheet } from "react-native";
import React from 'react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};


function CardBox({ nama, nip, ketIn, ketOut, tanggal, jam_masuk, jam_keluar }) {
    const ketStyle = (ketIn) => {
        switch (ketIn) {
            case 'Tepat Waktu':
                return { text: 'Tepat Waktu', backgroundColor: 'green', textColor: 'white' };
            case 'Telat':
                return { text: 'Telat', backgroundColor: 'red', textColor: 'black' };
            default:
                return { text: 'Belum Keluar', backgroundColor: 'blue', textColor: 'black' };
        }
    }
    const ketStyle2 = (ketOut) => {
        switch (ketOut) {
            case 'Tepat Waktu':
                return { text: 'Tepat Waktu', backgroundColor: 'green', textColor: 'white' };
            case 'Pulang Cepat':
                return { text: 'Pulang Cepat', backgroundColor: 'red', textColor: 'black' };
            default:
                return { text: 'Belum Keluar', backgroundColor: 'blue', textColor: 'white' };
        }
    }

    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
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
                        <Text style={styles.label}>Jam Masuk:</Text>
                        <Text style={styles.value}>{jam_masuk}</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.label}>Jam  Keluar:</Text>
                        <Text style={styles.value}>{jam_keluar}</Text>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.leftColumn}>
                        <Text style={[styles.label, { marginTop: 10 }]}>Keterangan Absen Pulang</Text>
                        <View style={[styles.statusContainer, { backgroundColor: ketStyle(ketIn).backgroundColor }]}>
                            <Text style={[styles.statusText, { color: ketStyle(ketIn).textColor }]}>{ketStyle(ketIn).text}</Text>
                        </View>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={[styles.label, { marginTop: 10 }]}>Keterangan Absen Pulang</Text>
                        {/* <Text style={styles.textTengah}>{ketOut}</Text> */}
                        <View style={[styles.statusContainer, { backgroundColor: ketStyle2(ketOut).backgroundColor }]}>
                            <Text style={[styles.statusText, { color: ketStyle2(ketOut).textColor }]}>{ketStyle2(ketOut).text}</Text>
                        </View>
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
});
