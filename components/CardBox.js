import { View, Text, StyleSheet } from "react-native";
import React from 'react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};


function CardBox({ tanggal, ketAbsen, jamMasuk, jamPulang }) {

    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        <View style={styles.container}>
            <View style={styles.rectangle}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.textTengah}>Tanggal:</Text>
                        <Text style={styles.textTengah}>{formattedDate}</Text>

                        <Text style={styles.textTengah}>Keterangan Absen: </Text>
                        <Text style={styles.textTengah}>{ketAbsen}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.textTengah}>Absen Masuk</Text>
                        <Text style={styles.textTengah}>{jamMasuk}</Text>
                        <Text style={styles.textTengah}>Absen Pulang</Text>
                        <Text style={styles.textTengah}>{jamPulang}</Text>
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
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rectangle: {
        backgroundColor: 'white',
        height: 120,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderColor: '#4C70C4',
        justifyContent: 'center',
    },
    textTengah: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
