import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import NavBottom from "../../components/NavBottom";


function HalamanAproval() {
    const navigation = useNavigation();


    function buttonAprovalIzinHandler() {
        navigation.navigate('AprovalIzin');
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
        <SafeAreaView style={[{ backgroundColor: '#E7F4FE', flex: 1, marginBottom: '10' }]}>
            <View style={styles.mainContent}>
                <View style={[{ marginRight: '20' }]} >
                    <Pressable
                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                        onPress={buttonAprovalIzinHandler}
                    >
                        <View style={styles.tataContainer2}>
                            <View style={[{ width: '90%' }]}  >
                                <Text style={styles.textButton}>Aproval Izin </Text>
                            </View>
                            <View>
                                <MaterialIcons name="navigate-next" size={30} color="white" />
                            </View>

                        </View>
                    </Pressable>
                </View>
                <View style={[{ marginTop: '15' }]} >
                    <Pressable
                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                    >
                        <View style={styles.tataContainer2}>
                            <View style={[{ width: '90%' }]}  >
                                <Text style={styles.textButton}>Aproval Cuti </Text>
                            </View>
                            <View >
                                <MaterialIcons name="navigate-next" size={30} color="white" />
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={[{ marginTop: '15' }]} >
                    <Pressable
                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                    >
                        <View style={styles.tataContainer2}>
                            <View style={[{ width: '90%' }]}  >
                                <Text style={styles.textButton}>Aproval Lembur</Text>
                            </View>
                            <View >
                                <MaterialIcons name="navigate-next" size={30} color="white" />
                            </View>

                        </View>
                    </Pressable>
                </View>
            </View>
            <NavBottom style={styles.posisiFixed} />

        </SafeAreaView>
    )
}

export default HalamanAproval;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    appContainer: {
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    tataContainer: {
        flexDirection: 'row',
    },
    tataContainer2: {
        flexDirection: 'row',
        marginLeft: '10'

    },
    column: {
        width: '40%',
        height: 40,
        margin: 5

    },
    column2: {
        width: '40%',
        height: 50,
        marginLeft: 20,

    },
    image1: {
        height: 40,
        width: 40,
    },
    bold: {
        fontWeight: 'bold',
    },
    rectangle: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'gray',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderColor: '#4C70C4'
    },
    centered: {
        alignSelf: 'center',
    },
    textTengah: {
        textAlign: 'center',
    },

    buttonContainer: {
        marginTop: 5,
        backgroundColor: '#008DDA',
        height: 50,
        justifyContent: 'center'
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        margin: 5,
    },
    pressedButton: {
        opacity: 0.25
    },
    mainContent: {
        flex: 1,
        // Gaya untuk konten utama
      },posisiFixed: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },



});