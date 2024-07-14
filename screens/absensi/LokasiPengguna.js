import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

function LokasiPengguna() {
    const route = useRoute();
    const navigation = useNavigation();

    const { latitude, longitude } = route.params;

    const [targetLocation, setTargetLocation] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isInArea, setIsInArea] = useState(false); // Tambahkan state ini
    const radius = 0.1;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataJson = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(userDataJson);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data from AsyncStorage:', error);
            }
        };

        const fetchData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data !== null) {
                    const userData = JSON.parse(data);
                    const nm_unit_usaha = userData.nm_unit_usaha;
                    const apiUrl = `https://hc.baktitimah.co.id/pegawaian/api/API_Absen/LocationPosisi?nm_unit_usaha=${nm_unit_usaha}`;

                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
                    }

                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        const responseData = await response.json();
                        setTargetLocation(responseData.data[0]);
                    } else {
                        throw new Error('Response is not in JSON format');
                    }
                } else {
                    throw new Error('No user data found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        fetchUserData();
    }, []);

    const isWithinBounds = (lat, lon, targetLocation, radius) => {
        if (!targetLocation) return false;

        const lat_a = parseFloat(targetLocation.lat_a);
        const long_a = parseFloat(targetLocation.long_a);
        const lat_b = parseFloat(targetLocation.lat_b);
        const long_b = parseFloat(targetLocation.long_b);

        const centerLat = (lat_a + lat_b) / 2;
        const centerLon = (long_a + long_b) / 2;

        const distance = haversine(lat, lon, centerLat, centerLon);

        return distance <= radius;
    };

    const haversine = (lat1, lon1, lat2, lon2) => {
        const toRadians = (degree) => degree * (Math.PI / 180);
        const R = 6371;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
        if (!isLoading && !isError && targetLocation) {
            const inArea = isWithinBounds(parseFloat(latitude), parseFloat(longitude), targetLocation, radius);
            setIsInArea(inArea); // Set state isInArea
            if (inArea) {
                navigation.navigate('HalamanAbsenPulang', { latitude, longitude, isInArea: true });
            } else {
                Alert.alert('Peringatan!', 'Anda berada di luar area absen.');
            }
        }
    }, [isLoading, isError, targetLocation, latitude, longitude, navigation]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (isError || !targetLocation) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Terjadi kesalahan saat memuat data lokasi.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Latitude: {latitude}</Text>
            <Text style={styles.text}>Longitude: {longitude}</Text>
            {isInArea ? (
                <Text style={styles.inAreaText}>Anda berada di dalam area absen.</Text>
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
