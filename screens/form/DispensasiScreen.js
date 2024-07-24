import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Alert, TextInput, KeyboardAvoidingView, Platform, BackHandler } from "react-native";
import Inputan from "../../components/Inputan";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextPanjang from "../../components/TextPanjang";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingAlert from "../../components/Loading/LoadingAlert";
import SuccessModal from "../../components/SuccessModal";
import GagalModal from "../../components/GagalModal";




function DispensasiScreen() {
    const navigation = useNavigation();


    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const [lamaIzin, setLamaIzin] = useState('');
    const [alasan, setAlasan] = useState('');

    const [userData, setUserData] = useState(null);
    const [jenisIzinData, setJenisIzinData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleGgl, setIsModalVisibleGgl] = useState(false);




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

        const fetchIzinData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data !== null) {
                    const userData = JSON.parse(data);
                    const idPegawai = userData.id_pegawai;

                    const apiUrl = `https://hc.baktitimah.co.id/pegawaian/api/API_Izin/getJenisIzin?id_pegawai=${idPegawai}`;
                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const responseData = await response.json();
                    // console.log(responseData);
                    setJenisIzinData(responseData.data);
                }
            } catch (error) {
                console.error('Error fetching riwayat izin:', error);
            }
        };

        fetchUserData();
        fetchIzinData();
    }, []);

    const handlePengajuanIzin = async () => {
        try {

            setLoading(true);
            if (!userData || !userData.id_pegawai) {
                Alert.alert('Error', 'User data is missing or invalid. Please try again.');
                setLoading(false);
                return;
            }

            const requestData = {
                id_pegawai: userData.id_pegawai,
                tgl_pengajuan: new Date().toISOString().split('T')[0],
                lama: lamaIzin,
                tgl_mulai: startDate.toISOString().split('T')[0],
                tgl_akhir: endDate ? endDate.toISOString().split('T')[0] : null,
                id_jenis_izin: value,
                keterangan: alasan,
            };

            const url = 'https://hc.baktitimah.co.id/pegawaian/api/API_Izin/insertIzin';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            console.log(requestData);

            const contentType = response.headers.get('content-type');
            if (response.ok && contentType && contentType.includes('application/json')) {
                const result = await response.json();
                // console.log('API Response:', result);

                if (result.status === 'success') {
                    setIsModalVisible(true);

                } else {
                    setIsModalVisibleGgl(true);
                }
            } else {
                const errorText = await response.text();
                setIsModalVisibleGgl(true);
            }
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('An error occurred', 'Please try again later');
        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        if (value) {
            const selectedData = jenisIzinData.find(item => item.id_jenis_izin === value);
            if (selectedData) {
                setLamaIzin(selectedData.lama_jenis_izin);
                setEndDate(addDays(startDate, parseInt(selectedData.lama_jenis_izin)));
            }
        }
    }, [value, startDate]);

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const formattedDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleStartDatePress = () => {
        setShowStartDatePicker(true);
    };

    const handleEndDatePress = () => {
        setShowEndDatePicker(true);
    };

    const handleStartDateChange = (event, newDate) => {
        setShowStartDatePicker(false); // Sembunyikan setelah dipilih
        if (newDate !== undefined) {
            setStartDate(newDate);
            if (value) {
                const selectedData = jenisIzinData.find(item => item.id_jenis_izin === value);
                if (selectedData) {
                    setEndDate(addDays(newDate, parseInt(selectedData.lama_jenis_izin)));
                }
            }
        }
    };

    const handleEndDateChange = (event, newDate) => {
        setShowEndDatePicker(false); // Sembunyikan setelah dipilih
        if (newDate !== undefined) {
            setEndDate(newDate);
        }
    };

    const handleChangeAlasan = (text) => {
        setAlasan(text);
    };

    const buttonLogOut2Handler = async (navigation) => {

        navigation.navigate("HalamanUtama");

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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ backgroundColor: '#E7F4FE', flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <View style={styles.card}>
                        {userData && (
                            <>
                                <View>
                                    <Text style={styles.text}>Nama Pekerja:</Text>
                                    <Inputan value={userData.nama} />
                                </View>

                                <View>
                                    <Text style={styles.text}>NIK : </Text>
                                    <Inputan value={userData.nik} />
                                </View>
                                <View>
                                    <Text style={styles.text}>Unit Level: </Text>
                                    <Inputan value={userData.nm_unit_level} />
                                </View>
                                <View>
                                    <Text style={styles.text}>Unit Kerja: </Text>
                                    <Inputan value={userData.nm_unit_organisasi} />
                                </View>
                                <View>
                                    <Text style={styles.text}>Sub Unit Kerja: </Text>
                                    <Inputan value={userData.nm_unit_kerja} />
                                </View>
                            </>
                        )}
                        <View>
                            <Text style={styles.text}>Jenis Izin : </Text>
                            <Dropdown
                                style={[styles.input, { height: 50, }, isFocus && { borderColor: 'blue', height: 60 }, styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={jenisIzinData}
                                search
                                maxHeight={300}
                                labelField="nm_jenis_izin"
                                valueField="id_jenis_izin"
                                placeholder={!isFocus ? 'Jenis Izin' : '...'}
                                searchPlaceholder="Cari..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={(item) => {
                                    setValue(item.id_jenis_izin);
                                    setIsFocus(false);
                                }}
                                renderLeftIcon={() => (
                                    <AntDesign
                                        style={styles.icon}
                                        color={isFocus ? 'blue' : 'black'}
                                        name="Safety"
                                        size={20}
                                    />
                                )}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Lama Izin: </Text>
                            <TextInput
                                style={[styles.input, { color: 'black' }]}
                                value={lamaIzin !== null ? `${lamaIzin} hari` : ''}
                                editable={false}

                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Tanggal Pelaksanaan : </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.column}>
                                    <Pressable
                                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton]}
                                        onPress={handleStartDatePress}
                                    >
                                        <Text style={styles.textButton}>Pilih Tanggal Mulai</Text>
                                    </Pressable>
                                    {showStartDatePicker && (
                                        <DateTimePicker
                                            value={startDate}
                                            mode="date"
                                            display="default"
                                            onChange={handleStartDateChange}
                                        />
                                    )}

                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.column}>
                                    <Text style={styles.text}>Tanggal Mulai</Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.text}>Tanggal Akhir</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.column}>
                                    <TextInput
                                        style={[styles.input, { color: 'black' }]}
                                        value={formattedDate(startDate)}
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.column}>
                                    <TextInput
                                        style={[styles.input, { color: 'black' }]}
                                        value={formattedDate(endDate)}
                                        editable={false}
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.text}>Alasan Izin/Dispensasi: </Text>
                            <TextPanjang value={alasan} onChangeText={handleChangeAlasan}
                            />
                        </View>

                        <View style={[{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                            <View style={[styles.column]}>

                            </View>
                            <View style={[styles.column]}>
                                <Pressable
                                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                    onPress={handlePengajuanIzin}
                                >
                                    <Text style={styles.textButton}>Ajukan</Text>
                                </Pressable>
                                <LoadingAlert visible={loading} />
                                <SuccessModal visible={isModalVisible} onClose={() => setIsModalVisible(false)}
                                    onConfirm={() => navigation.navigate('RiwayatStackScreen', { screen: 'RiwayatIzin' })}
                                />
                                <GagalModal visible={isModalVisibleGgl} onClose={() => setIsModalVisibleGgl(false)}
                                />
                            </View>

                        </View>


                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
}

export default DispensasiScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 30,
        paddingHorizontal: 0,
    },
    text: {
        marginTop: 15,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        fontSize: 15,
    },
    column: {
        width: '40%',
        height: 40,
        marginLeft: 20,
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
        opacity: 0.5,
    },
    PickerControl: {
        height: 40,
        padding: 12,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        marginTop: 10,
        fontSize: 15,
        justifyContent: 'center',
    },

});
