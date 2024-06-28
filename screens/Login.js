import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, Button, Pressable, Animated, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from 'react';
import { CommonActions } from "@react-navigation/native";
import { PEGAWAI } from "../data/dummy-data";



function Login({ navigation }) {

    const navigate = (route) => navigation.navigate(route);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    const buttonLoginHandler = async () => {
        setLoading(true); // Set loading indicator

        try {
            const url = `https://hc.baktitimah.co.id/pegawaian/api/Login_tryy/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const contentType = response.headers.get('content-type');
            if (response.ok && contentType && contentType.includes('application/json')) {
                const result = await response.json();
                setLoading(false); // Clear loading indicator
                console.log('API Response:', result);

                if (result.status === 'success') {
                   
                    const userData = {
                        email: result.data.email,
                        role_id: result.data.role_id,
                        id_application: result.data.id_application,
                        id_pegawai: result.data.id_pegawai,
                    };

                    await AsyncStorage.setItem('userData', JSON.stringify(userData));

                    // Navigasi ke HalamanUtama dengan data pengguna
                    navigation.navigate('HalamanUtama', { userData });

                } else {
                    // Login gagal, tampilkan pesan kesalahan
                    Alert.alert('Login failed', result.message || 'Invalid username or password');
                }
            } else {
                setLoading(false); // Clear loading indicator
                const errorText = await response.text(); // Read the response as text
                console.error('API Error:', errorText);
                Alert.alert('Login failed', 'Invalid response from server');
            }
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false); // Ensure loading indicator is cleared if an error occurs
            Alert.alert('An error occurred', 'Please try again later');
        }
        // navigation.navigate('HalamanUtama');

        // const foundUser = PEGAWAI.find(user => user.username === username && user.password === password);

        // if (foundUser) {
        //     await AsyncStorage.setItem('sessionId', foundUser.id);
        //     await AsyncStorage.setItem('username', foundUser.username);
        //     navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'HalamanUtama' }],
        //     });
        // } else {
        //     Alert.alert('Invalid Credentials', 'The username or password is incorrect.');
        // }

    };

    return (
        <SafeAreaView style={[styles.rootContainer, { backgroundColor: '#E7F4FE', flex: 1 }]}>
            <View style={[{ backgroundColor: '#E7F4FE', }]}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/ihc.png')}
                    />
                </View>
                <View style={[{ marginTop: 30 }]}>
                    <View>
                        <Text style={[styles.text]}>Username</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            placeholder="Masukkan Username"
                            returnKeyType="next"
                            value={email}
                        />
                        <Text style={[styles.text]}>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Masukkan Password"
                            secureTextEntry
                            returnKeyType="done"

                        />
                    </View>
                    {/* <View >
                        <Button style={styles.fixToText}
                        title="Left button"
                        onPress={() => Alert.alert('Left button pressed')}
                        />
                    </View> */}
                    <View style={[{ marginTop: 80, }]}>
                        <Pressable
                            style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                            onPress={buttonLoginHandler}
                        >
                            <Text style={styles.textButton}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
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