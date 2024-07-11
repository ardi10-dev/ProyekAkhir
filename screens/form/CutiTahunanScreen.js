import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Inputan from "../../components/Inputan";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';



function CutiTahunanScreen({ route }) {
    const navigation = useNavigation();

    const [data, setData] = useState([
        { label: 'Dalam Daerah', value: 'Dalam Daerah' },
        { label: 'Luar Daerah', value: 'Luar Daerah' },
        { label: 'Luar Pulau', value: 'Luar Pulau' },
    ]);

    const [datajns_cuti, setdatajns_cuti] = useState([
        { label: 'KHUSUS', value: 'KHUSUS' },
        { label: 'NORMAL', value: 'NORMAL' },
    ]);

    const [pelaksanaanCuti, setPelaksanaanCuti] = useState(null);
    const [jenisCuti, setJenisCuti] = useState(null);

    const [isFocus, setIsFocus] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [lamaIzin, setLamaIzin] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

    const [userData, setUserData] = useState(null);
    const [sisaCuti, setSisaCuti] = useState(null);
    const [cutiData, setCutiData] = useState(null);
    const [sisaCutiData, setSisaCutiData] = useState({});
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

        const fetchCutiData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data !== null) {
                    const userData = JSON.parse(data);
                    const idPegawai = userData.id_pegawai;

                    const apiUrl = `https://hc.baktitimah.co.id/pegawaian/api/API_Cuti/getJatahCuti?id_pegawai=${idPegawai}`;
                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const responseData = await response.json();
                    if (responseData.data && responseData.data.length > 0) {
                        setCutiData(responseData.data[0]);
                        setSisaCutiData(responseData.data[0]);
                    } else {
                        setCutiData({});
                    }
                    setCutiData(responseData.data[0]);
                    // console.log(setCutiData);
                }
            } catch (error) {
                console.error('Error fetching riwayat Cuti:', error);
                // setLoading(false);
            }
        };

        fetchUserData();
        fetchCutiData();
    }, []);

    const handleAjukanPress = async () => {
        try {
            if (!userData || !userData.id_pegawai) {
                Alert.alert('Error', 'User data is missing or invalid. Please try again.');
                return;
            }

            const requestData = {
                id_pegawai: userData.id_pegawai,
                tgl_pengajuan: new Date().toISOString().split('T')[0],
                lama: lamaIzin,
                tgl_mulai: startDate.toISOString().split('T')[0],
                tgl_akhir: endDate ? endDate.toISOString().split('T')[0] : null,
                jns_cuti: jenisCuti,
                pelaksanaan_cuti: pelaksanaanCuti,
                keterangan: "lll",
            };

            const url = 'https://hc.baktitimah.co.id/pegawaian/api/API_Cuti/insertCuti';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            // console.log(requestData);

            const contentType = response.headers.get('content-type');
            if (response.ok && contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('API Response:', result);

                if (result.status === 'success') {
                    Alert.alert(
                        'Success',
                        'Cuti berhasil diajukan',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    // navigation.navigate('HalamanRiwayat', { screen: 'RiwayatPCuti' });
                                    navigation.navigate('RiwayatStackScreen', { screen: 'RiwayatPCuti' });
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

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
        // Hitung tanggal akhir
        if (lamaIzin !== null) {
            const endDate = new Date(currentDate);
            endDate.setDate(endDate.getDate() + parseInt(lamaIzin));
            setEndDate(endDate);
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
    const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5) + i);

    useEffect(() => {
        if (cutiData && lamaIzin !== null) {
            const sisa = parseInt(cutiData.jatah_cuti) - parseInt(lamaIzin);
            setSisaCuti(sisa);
        }
    }, [cutiData, lamaIzin]);

    const handleLamaIzinChange = (text) => {
        if (!isNaN(text)) {
            setLamaIzin(text);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ backgroundColor: '#E7F4FE', flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
                            <Text style={styles.text}>Sisa Cuti Tahun: </Text>
                            <Inputan value={sisaCutiData.jatah_cuti ? sisaCutiData.jatah_cuti : ''}  />
                        </View>
                        <View>
                            <Text style={styles.text}>Lama Cuti: </Text>
                            <TextInput
                                style={[styles.input, { color: 'black' }]}
                                value={lamaIzin !== null ? lamaIzin.toString() : ''}
                                onChangeText={(text) => setLamaIzin(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Jenis Cuti: </Text>
                            <Dropdown
                                style={[styles.input, isFocus && { borderColor: 'blue' }, styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={datajns_cuti}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Pilih Jenis Cuti ' : '...'}
                                searchPlaceholder="Search..."
                                value={jenisCuti}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setJenisCuti(item.value);
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
                            <Text style={styles.text}>Pelaksanaan Cuti : </Text>
                            <Dropdown
                                style={[styles.input, isFocus && { borderColor: 'blue' }, styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Pilih Pelaksanaan Cuti' : '...'}
                                searchPlaceholder="Search..."
                                value={pelaksanaanCuti}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setPelaksanaanCuti(item.value);
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
                                        value={endDate ? formattedDate(endDate) : '-'}
                                        editable={false}
                                    />
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.text}>Sisa Cuti: </Text>
                            <Inputan value={sisaCuti !== null ? `${sisaCuti} hari` : ''}
                                editable={false} />
                        </View>

                        <View style={[{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                            <View style={[styles.column]}>

                            </View>
                            <View style={[styles.column]}>
                                <Pressable
                                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                    onPress={handleAjukanPress}
                                >
                                    <Text style={styles.textButton}>Ajukan</Text>
                                </Pressable>
                            </View>

                        </View>


                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
}

export default CutiTahunanScreen;

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
