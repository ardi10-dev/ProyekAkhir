import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBottom from "../../components/NavBottom";

function HalamanAproval() {
    const navigation = useNavigation();

    function buttonAprovalIzinHandler() {
        navigation.navigate('AprovalIzin');
    }
    function buttonAprovalCutiHandler() {
        navigation.navigate('ApprovalCuti');
    }
    function buttonAprovalLemburHandler() {
        navigation.navigate('ApprovalLembur');
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContent}>
                <View style={styles.buttonWrapper}>
                    <Pressable
                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                        onPress={buttonAprovalIzinHandler}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={styles.textButton}>Aproval Izin</Text>
                            <MaterialIcons name="navigate-next" size={30} color="white" />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                        onPress={buttonAprovalCutiHandler}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.textButton}>Aproval Cuti</Text>
                            <MaterialIcons name="navigate-next" size={30} color="white" />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                        onPress={buttonAprovalLemburHandler}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.textButton}>Aproval Lembur</Text>
                            <MaterialIcons name="navigate-next" size={30} color="white" />
                        </View>
                    </Pressable>
                </View>
            </View>
            <NavBottom style={styles.navBottom} />
        </SafeAreaView>
    );
}

export default HalamanAproval;

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
