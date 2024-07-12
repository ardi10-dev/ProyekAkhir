import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert , BackHandler} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBottom from "../../components/NavBottom";

function HalamanRiwayat() {
    const navigation = useNavigation();

    function buttonRiwayatAbsenHandler() {
        navigation.navigate('RiwayatAbsen');
    }
    function buttonRiwayatIzinHandler() {
        navigation.navigate('RiwayatIzin');
    }
    function buttonRiwayatCutiHandler() {
        navigation.navigate('RiwayatPCuti');
    }
    function buttonRiwayatLemburHandler() {
        navigation.navigate('RiwayatLembur');
    }

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("HalamanUtama");
            return true; 
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove(); // Cleanup on unmount
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContent}>
                <View style={styles.buttonWrapper}>
                    <Pressable
                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                        onPress={buttonRiwayatAbsenHandler}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.textButton}>Riwayat Absen</Text>
                            <MaterialIcons name="navigate-next" size={30} color="white" />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable
                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                        onPress={buttonRiwayatIzinHandler}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.textButton}>Riwayat Izin</Text>
                            <MaterialIcons name="navigate-next" size={30} color="white" />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                        onPress={buttonRiwayatCutiHandler}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.textButton}>Riwayat Cuti Tahunan</Text>
                            <MaterialIcons name="navigate-next" size={30} color="white" />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                        onPress={buttonRiwayatLemburHandler}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.textButton}>Riwayat Lembur</Text>
                            <MaterialIcons name="navigate-next" size={30} color="white" />
                        </View>
                    </Pressable>
                </View>
            </View>
            <NavBottom style={styles.navBottom} />
        </SafeAreaView>
    )
}

export default HalamanRiwayat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7F4FE',
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    buttonWrapper: {
        marginTop: 15,
    },
    buttonContainer: {
        backgroundColor: '#008DDA',
        height: 50,
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 2,
    },
    pressedButton: {
        opacity: 0.75,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    navBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});
