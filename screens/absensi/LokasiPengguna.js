import { View, Text, StyleSheet } from "react-native";
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { LOKASI } from "../../data/dummy-data";

function LokasiPengguna() {
    const route = useRoute();
    const { latitude, longitude, address } = route.params;

    const targetLocation = LOKASI[0]; // Asumsikan hanya ada satu lokasi di LOKASI
    const radius = 1.0; // Radius dalam kilometer (misalnya 0.5 km)

    const isWithinBounds = (lat, lon, targetLocation, radius) => {
        const lat1 = parseFloat(targetLocation.lat1);
        const lon1 = parseFloat(targetLocation.long1);
        const lat2 = parseFloat(targetLocation.lat2);
        const lon2 = parseFloat(targetLocation.long2);

        const centerLat = (lat1 + lat2) / 2;
        const centerLon = (lon1 + lon2) / 2;

        // Haversine formula untuk menghitung jarak dalam kilometer
        const distance = haversine(lat, lon, centerLat, centerLon);

        return distance <= radius;
    };

    // Haversine formula untuk menghitung jarak antara dua titik koordinat dalam kilometer
    const haversine = (lat1, lon1, lat2, lon2) => {
        const toRadians = (degree) => degree * (Math.PI / 180);
        const R = 6371; // Radius bumi dalam kilometer
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Jarak dalam kilometer
        return distance;
    };

    const isInArea = isWithinBounds(parseFloat(latitude), parseFloat(longitude), targetLocation, radius);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Latitude: {latitude}</Text>
            <Text style={styles.text}>Longitude: {longitude}</Text>
            {isInArea ? (
                <Text style={styles.inAreaText}>Anda berada di area absen.</Text>
            ) : (
                <Text style={styles.outsideAreaText}>Anda berada di luar area absen.</Text>
            )}
        </View>
    );
}

export default LokasiPengguna;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        marginVertical: 4,
    },
    inAreaText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 10,
    },
    outsideAreaText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 10,
    },
});
