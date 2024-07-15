import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert, BackHandler } from "react-native";
import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import HalamanGambar from "./HalamanGambar";
import LokasiPengguna from "./LokasiPengguna";
import ModalAbsen from "../../components/ModalAbsen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingAlert from "../../components/Loading/LoadingAlert";


function HalamanAbsensi() {
    const navigation = useNavigation();
    const navigate = (route) => navigation.navigate(route);
    const route = useRoute();
    const [isNavigating, setIsNavigating] = useState(false);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [jamKerja, setJamKerja] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [pickedImage, setPickedImage] = useState(null);
    const [pengaturanAbsen, setPengaturanAbsen] = useState(null);
    const { latitude, longitude, isInArea } = route.params;

    const [loading, setLoading] = useState(false);


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

       

        fetchUserData();
       

    }, []);

   

    const handleAbsensiSubmit = async () => {
        try {
            setLoading(true);
            
            const inAreaValue = await AsyncStorage.getItem('in_area');
            const isInArea = inAreaValue !== null ? JSON.parse(inAreaValue) : false;

            if (!pickedImage) {
                throw new Error('Wajib Mengupload Foto');
            }
            if (!isInArea) {
                throw new Error('Tidak bisa mengajukan absen karena berada di luar area absen.');
            }

            
            const formData = new FormData();
            formData.append('photo', {
                uri: pickedImage,
                type: 'image/jpeg',
                name: 'photo.jpg'
            });
            // console.log('Picked Image URI:', pickedImage);

            formData.append('nm_unit_usaha', userData.nm_unit_usaha);
            formData.append('id_pegawai', userData.id_pegawai);
            formData.append('tgl_absen', new Date().toISOString().split('T')[0]);
            formData.append('longitude', longitude.toString());
            formData.append('latitude', latitude.toString());

            console.log("FormData content:", formData);

            const apiUrl = 'https://hc.baktitimah.co.id/pegawaian/api/API_Absen/fotoMasuk';
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorMessage}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            await AsyncStorage.setItem('jam_masuk', new Date().toLocaleTimeString('en-US', { hour12: false }));
            setModalVisible(true);
        } catch (error) {
            // console.error('Error submitting absensi:', error);
            Alert.alert('Peringatan!!', error.message);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        // navigation.navigate('RiwayatAbsen');
        navigation.navigate('RiwayatStackScreen', { screen: 'RiwayatAbsen' });
    };


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleImageTaken = (imageUri) => {
        console.log('Image URI received:', imageUri);
        setPickedImage(imageUri);
    };

    const buttonLogOut2Handler = async (navigation) => {
        try {
            setLoading(true);
            navigation.navigate("HalamanUtama");
        } catch {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        // if (!isMainPage) return;
        const backAction = () => {
            Alert.alert("Peringatan!", "Apakah Anda ingin keluar? ", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => buttonLogOut2Handler(navigation) }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);





    return (
        <SafeAreaView style={{ backgroundColor: '#E7F4FE', flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.tataContainer2}>
                    <View style={styles.column}>
                        <Text style={[{ textAlign: 'Left', color: 'black', fontWeight: 'bold', marginLeft: 10, }]}>{new Date().toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={[{ fontWeight: 'bold', textAlign: 'right', color: 'black', fontSize: 12, }]}> {new Date().toLocaleTimeString('id-ID')} WIB</Text>

                    </View>

                </View>

                <View style={styles.text}>
                    <LokasiPengguna />
                </View>
                <View style={styles.text}>
                    <Text >Alamat : </Text>
                    <Text >Jl. Umban Sari</Text>
                </View>

              

                <View style={styles.photo}>
                    <HalamanGambar onImageTaken={handleImageTaken} />
                </View>

                <View >
                    <Pressable
                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                        onPress={handleAbsensiSubmit}>
                        <Text style={styles.textButton}>Submit</Text>
                    </Pressable>
                </View>
                <LoadingAlert visible={loading} />
                <ModalAbsen visible={modalVisible} closeModal={closeModal} />

                {/* <SuccessModal  /> */}
            </ScrollView>
        </SafeAreaView>
    );
}
export default HalamanAbsensi;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 0,
    },
    text: {
        alignItems: 'center',
        marginTop: 15,
        fontWeight: 'bold',
    },
    ket: {
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    photo: {
        marginTop: 20,
        padding: 10,
    },
    input: {
        height: 40,
        padding: 12,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        fontSize: 15,
    },
    column: {
        width: '60%',
        marginTop: 150,
    },
    card: {
        marginTop: 5,
        marginHorizontal: 25,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 0.8,
        elevation: 5,
    },
    buttonContainer: {
        marginTop: 20,
        marginRight: 30,
        marginLeft: 30,
        padding: 12,
        backgroundColor: '#10439F',
        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    },
    pressedButton: {
        opacity: 0.5,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    tataContainer2: {
        flexDirection: 'row',
    },
    column: {
        width: '40%',
        height: 40,
        marginLeft: 20,

    },

});
