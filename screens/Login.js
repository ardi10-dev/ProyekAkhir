import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, ScrollView, Pressable, Platform, Alert, KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from 'react';
import { CommonActions } from "@react-navigation/native";
import { PEGAWAI } from "../data/dummy-data";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';




function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    useEffect(() => {
        const loadTexts = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('text1');
                const storedPassword = await AsyncStorage.getItem('text2');
                if (storedEmail !== null) {
                    setEmail(storedEmail); // Set email dari AsyncStorage
                }
                if (storedPassword !== null) {
                    setPassword(storedPassword); // Set password dari AsyncStorage
                }
            } catch (error) {
                console.error('Error loading texts:', error);
            }
        };
        const checkToken = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                const userData = storedUserData ? JSON.parse(storedUserData) : null;

                if (!userData || !userData.token) {
                    if (navigation.getState().routes[navigation.getState().index].name !== 'Login') {
                        navigation.navigate('Login');
                    }
                    return;
                }
                const response = await fetch('https://hc.baktitimah.co.id/pegawaian/api/Login/CekToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: userData.token
                    })
                })
                const data = await response.json();
                if (data.status == 200) {
                    navigation.navigate("HalamanUtama");
                } else if (data.status == 404) {
                    if (navigation.getState().routes[navigation.getState().index].name !== 'Login') {
                        navigation.navigate("Login");
                    }
                }
            } catch (error) {
                console.error('Error checking token:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadTexts();
        checkToken();
    }, [navigation]);

    const handleEmailChange = async (text) => {
        setEmail(text);
        await AsyncStorage.setItem('text1', text);
    };

    const handlePasswordChange = async (text) => {
        setPassword(text);
        await AsyncStorage.setItem('text2', text);
    };

    const buttonLoginHandler = async () => {
        setLoading(true);

        try {
            const url = `https://hc.baktitimah.co.id/pegawaian/api/Login/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const contentType = response.headers.get('content-type');
            if (response.ok && contentType && contentType.includes('application/json')) {
                const result = await response.json();
                setLoading(false);

                if (result.status === 'success') {
                    const userData = {
                        email: result.data.email,
                        role_id: result.data.role_id,
                        id_application: result.data.id_application,
                        id_pegawai: result.data.id_pegawai,
                        nik: result.data.nik,
                        nama: result.data.nama,
                        nm_pgl: result.data.nm_pgl,
                        nm_unit_bisnis: result.data.nm_unit_bisnis,
                        nm_unit_kerja: result.data.nm_unit_kerja,
                        nm_unit_level: result.data.nm_unit_level,
                        nm_unit_organisasi: result.data.nm_unit_organisasi,
                        nm_unit_usaha: result.data.nm_unit_usaha,
                        image: result.data.image,
                        token: result.token,
                    };
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    navigation.navigate('HalamanUtama', { userData });
                } else {
                    Alert.alert('Login failed', result.message || 'Invalid username or password');
                }
            } else {
                setLoading(false);
                const errorText = await response.text();
                console.error('API Error:', errorText);
                Alert.alert('Login failed', 'Invalid response from server');
            }
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
            Alert.alert('An error occurred', 'Please try again later');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={[styles.rootContainer, { backgroundColor: '#E7F4FE', flex: 1 }]}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={[{ backgroundColor: '#E7F4FE' }]}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../assets/ihc.png')} />
                        </View>
                        <View style={[{ marginTop: 30 }]}>
                            <View>
                                <Text style={[styles.text]}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleEmailChange}
                                    placeholder="Masukkan Email"
                                    returnKeyType="next"
                                    value={email}
                                />
                                <Text style={[styles.text]}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handlePasswordChange}
                                    value={password}
                                    placeholder="Masukkan Password"
                                    secureTextEntry
                                    returnKeyType="done"
                                />
                            </View>
                            <View style={[{ marginTop: 80 }]}>
                                <Pressable
                                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                                    onPress={buttonLoginHandler}
                                >
                                    <Text style={styles.textButton}>Login</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default Login;
const styles = StyleSheet.create({
    rootContainer: {
        padding: 12,
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 18,
    },
    imageContainer: {
        paddingTop: '40%'
    },
    image: {
        width: 200,
        height: 200,
    },
    input: {
        height: 50,
        padding: 12,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        fontSize: 15,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        border: 0,
        borderRadius: 16,
        padding: 15,

    },
    buttonContainer: {
        padding: 12,
        backgroundColor: '#008DDA',
        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white'
    },
    pressedButton: {
        opacity: 0.25
    },
    utama: {

    }

});