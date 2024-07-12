import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Alert, TextInput, Platform, BackHandler } from "react-native";
import Inputan from "../../components/Inputan";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextPanjang from "../../components/TextPanjang";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function LemburScreen() {

    const navigation = useNavigation();

    const data = [
        { label: 'Hari Kerja', value: 'Hari Kerja' },
        { label: 'Hari Libur', value: 'Hari Libur' },
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [userData, setUserData] = useState(null);
    const [alasan, setAlasan] = useState('');


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

    const handlePengajuanLembur = async () => {
        try {
            if (!userData || !userData.id_pegawai) {
                Alert.alert('Error', 'User data is missing or invalid. Please try again.');
                return;
            }

            const requestData = {
                id_pegawai: userData.id_pegawai,
                tgl_pengajuan: new Date().toISOString().split('T')[0],
                tgl_lembur: startDate.toISOString().split('T')[0],
                waktu_mulai: startTime.toLocaleTimeString('en-US', { hour12: false }),
                waktu_akhir: endTime.toLocaleTimeString('en-US', { hour12: false }),
                jns_lembur: value,
                keterangan: alasan,
            };

            const waktuMulai = new Date(data.waktu_mulai).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            
            const waktuAkhir = new Date(data.waktu_akhir).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const url = 'https://hc.baktitimah.co.id/pegawaian/api/API_Lembur/insertLembur';

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
                    Alert.alert(
                        'Success',
                        'Cuti berhasil diajukan',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigation.navigate('RiwayatStackScreen', { screen: 'RiwayatLembur' });
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert('Insert failed', result.message || 'Gagal mengajukan cuti');
                }
            } else {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                Alert.alert('Insert failed', 'Invalid response from server');
            }
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('An error occurred', 'Please try again later');
        }
    };


    const handleStartDateChange = (event, newDate) => {
        setShowStartDatePicker(false); // Hide after selection
        if (newDate !== undefined) {
            setStartDate(newDate);
        }
    };

    const handleStartDatePress = () => {
        setShowStartDatePicker(true);
    };
    const formattedDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleStartTimeChange = (event, selectedTime) => {
        setShowStartTimePicker(false);
        if (Platform.OS === 'android') {
            const currentTime = selectedTime || startTime;
            setStartTime(currentTime);
        } else {
            const currentTime = selectedTime || startTime;
            setStartTime(currentTime);
        }
    };

    const handleEndTimeChange = (event, selectedTime) => {
        setShowEndTimePicker(false);
        if (Platform.OS === 'android') {
            const currentTime = selectedTime || endTime;
            setEndTime(currentTime);
        } else {
            const currentTime = selectedTime || endTime;
            setEndTime(currentTime);
        }
    };

    const handleStartTimePress = () => {
        setShowStartTimePicker(true);
    };

    const handleEndTimePress = () => {
        setShowEndTimePicker(true);
    };

    const formatTimeIndonesia = (date) => {
        return new Intl.DateTimeFormat('id-ID', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false, // Format 24 jam
        }).format(date);
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
        <SafeAreaView style={{ backgroundColor: '#E7F4FE', flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
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
                        <Text style={styles.text}>Tanggal Lembur : </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <View style={styles.column}>
                                <TextInput
                                    style={[styles.input, { color: 'black' }]}
                                    value={formattedDate(startDate)}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.column}>
                                <Pressable
                                    style={({ pressed }) => [styles.buttonJam, pressed && styles.pressedButton]}
                                    onPress={handleStartDatePress}
                                >
                                    <AntDesign name="calendar" size={24} color="black" />
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
                        <Text style={styles.text}>Lembur Pada Waktu </Text>
                        <Dropdown
                            style={[styles.input, isFocus && { borderColor: 'blue' }, styles.dropdown, { marginTop: 10 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Pilih Waktu Lembur' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
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
                        <Text style={styles.text}>Jam Lembur : </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={[styles.column3, { justifyContent: 'center' }]}>
                                <Text style={[{ fontWeight: 'bold' }]}>Mulai</Text>
                            </View>
                            <View style={styles.column}>
                            <TextInput
                                    style={[styles.input, { color: 'black' }]}
                                    value={formatTimeIndonesia(startTime)}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.column2}>
                            <Pressable
                                    style={({ pressed }) => [styles.buttonJam, pressed && styles.pressedButton]}
                                    onPress={handleStartTimePress}
                                >
                                    <AntDesign name="clockcircleo" size={24} color="black" />
                                </Pressable>
                                {showStartTimePicker && (
                                    <DateTimePicker
                                        value={startTime}
                                        mode="time"
                                        display="spinner"
                                        onChange={handleStartTimeChange}
                                    />
                                )}

                            </View>

                        </View>
                    </View>
                    <View style={[{ marginTop: 10 }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={[styles.column3, { justifyContent: 'center' }]}>
                                <Text style={[{ fontWeight: 'bold' }]}>Akhir</Text>
                            </View>
                            <View style={styles.column}>
                                <TextInput
                                    style={[styles.input, { color: 'black' }]}
                                    value={formatTimeIndonesia(endTime)}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.column2}>
                            <Pressable
                                    style={({ pressed }) => [styles.buttonJam, pressed && styles.pressedButton]}
                                    onPress={handleEndTimePress}
                                >
                                    <AntDesign name="clockcircleo" size={24} color="black" />
                                </Pressable>
                                {showEndTimePicker && (
                                    <DateTimePicker
                                        value={endTime}
                                        mode="time"
                                        display="spinner"
                                        onChange={handleEndTimeChange}
                                    />
                                )}

                            </View>

                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>Uraian Tugas Lembur: </Text>
                        <TextPanjang value={alasan} onChangeText={handleChangeAlasan} />
                    </View>
                    <View style={[{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                        <View style={[styles.column]}>

                        </View>
                        <View style={[styles.column]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                onPress={handlePengajuanLembur}
                            >
                                <Text style={styles.textButton}>Ajukan</Text>
                            </Pressable>
                        </View>

                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default LemburScreen;

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
        padding: 12,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        alignItems: 'center',
        fontSize: 15,
    },
    column: {
        width: '40%',
        height: 40,
        marginLeft: 20,
    },
    column2: {
        width: '30%',
        height: 40,
        marginLeft: 20,
    },
    column3: {
        width: '20%',
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
    buttonJam: {
        backgroundColor: '#008DDA',
        borderRadius: 10,
        alignItems: 'center',
        height: 40,
        width: 40,
        justifyContent: 'center'
    }

});
