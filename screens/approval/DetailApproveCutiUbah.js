import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, TextInput, Alert, BackHandler } from "react-native";
import Inputan from "../../components/Inputan";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextPanjang from "../../components/TextPanjang";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingAlert from "../../components/Loading/LoadingAlert";



function DetailApproveCutiUbah({ route, navigation }) {

    const [dataDetail, setDataDetail] = useState();
    const userData = route.params && route.params.userData ? route.params.userData : {};
    const [alasan, setAlasan] = useState('');
    const [loading, setLoading] = useState(false);
    const [isStatusOne, setIsStatusOne] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [endDate, setEndDate] = useState(new Date());




    const buttonLogOut2Handler = async (navigation) => {

        navigation.navigate("ApprovalCuti");

    };


    const parseCustomDate = (dateString) => {
        const months = {
            'Januari': 0,
            'Februari': 1,
            'Maret': 2,
            'April': 3,
            'Mei': 4,
            'Juni': 5,
            'Juli': 6,
            'Agustus': 7,
            'September': 8,
            'Oktober': 9,
            'November': 10,
            'Desember': 11,
        };

        const parts = dateString.split(' ');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = months[parts[1]];
            const year = parseInt(parts[2], 10);

            return new Date(year, month, day);
        }
        return null; // Jika format tidak valid
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



    const fetchData = async () => {
        try {
            const id_pegawai_cuti = route.params.id;
            const response = await fetch('https://hc.baktitimah.co.id/pegawaian/api/API_Cuti/getDetailCutiApproval', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id_pegawai_cuti=${encodeURIComponent(id_pegawai_cuti)}`
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setDataDetail(data.data);
            if (data.data[0]?.status === '1') {
                setIsStatusOne(true);
            }

            const InitialEndDate = data.data[0]?.tgl_akhir;
            if (InitialEndDate) {
                const parsedEndDate = parseCustomDate(InitialEndDate);
                if (parsedEndDate && !isNaN(parsedEndDate.getTime())) {
                    setEndDate(parsedEndDate);
                } else {
                    console.warn('Parsed end date is invalid:', InitialEndDate);
                }
            }
            console.log('tanggal dari database', InitialEndDate);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    

    const buttonMenuUbahTolak = async () => {
        try {
            if (!alasan.trim()) {
                Alert.alert('Peringatan', 'Silakan isi catatan sebelum menyetujui.');
                return;
            }

            setLoading(true);

            const data = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(data);
            const id_pegawai_cuti = route.params.id;

            if (!id_pegawai_cuti) {
                throw new Error('id_pegawai_izin is missing');
            }

            if (dataDetail && (dataDetail[0]?.status === '1' || dataDetail[0]?.status === '2')) {
                Alert.alert('Tidak dapat diapprove lagi');
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('id_pegawai_cuti', id_pegawai_cuti);
            formData.append('id_pegawai', dataDetail[0]?.id_pegawai);
            formData.append('status', '2');
            formData.append('id_pegawai_app', userData.id_pegawai);
            formData.append('catatan_app', alasan);


            // const requestData = {
            //     id_pegawai_izin: encodeURIComponent(id_pegawai_izin),
            //     id_pegawai: dataDetail[0]?.id_pegawai,
            //     status: dataDetail[0]?.status,
            //     id_pegawai_app: userData.id_pegawai, 
            //     keterangan: alasan,
            // };
            console.log('requesy', formData);

            const url = 'https://hc.baktitimah.co.id/pegawaian/api/API_Cuti/approveCuti';

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            // console.log(requestData);

            const contentType = response.headers.get('content-type');
            if (response.ok && contentType && contentType.includes('application/json')) {
                const result = await response.json();
                // console.log('API Response:', result);

                if (result.status === 'success') {
                    Alert.alert(
                        'Success',
                        'Berhasil Di Simpan',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigation.navigate('ApprovalCuti');
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
        } finally {
            setLoading(false);
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    };


    let isPressingEnd = false;

    const formattedDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };
    const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5) + i);

    const handleEndDatePress = () => {
        if (!showEndDatePicker && !isPressingEnd) {
            isPressingEnd = true;
            setShowEndDatePicker(true);
            setTimeout(() => {
                isPressingEnd = false;
            }, 300); // Delay 300 ms
        }
    };



    const handleChangeAlasan = (text) => {
        setAlasan(text);
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#E7F4FE', flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    {dataDetail && (
                        <>
                            <View>
                                <Text style={styles.text}>Nama Pekerja:</Text>
                                <Inputan value={dataDetail[0]?.nama || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>NIK : </Text>
                                <Inputan value={dataDetail[0]?.nik || ''} />
                            </View>

                            <View>
                                <Text style={styles.text}>Jenis Izin : </Text>
                                <Inputan value={dataDetail[0]?.jenis_cuti || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>Lama Izin : </Text>
                                <Inputan value={dataDetail[0]?.lama || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>Tanggal Mulai : </Text>
                                <Inputan value={dataDetail[0]?.tgl_mulai || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>Tanggal Akhir : </Text>
                                {/* <Inputan value={dataDetail[0]?.tgl_akhir || ''} />
                                 */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <View style={styles.column}>
                                        <Inputan value={formattedDate(endDate)} editable={false} />
                                    </View>
                                    <View style={styles.column}>
                                        <Pressable
                                            style={({ pressed }) => [styles.buttonJam, pressed && styles.pressedButton]}
                                            onPress={handleEndDatePress}
                                        >
                                            <AntDesign name="calendar" size={24} color="white" />
                                        </Pressable>
                                        {showEndDatePicker && (
                                            <DateTimePicker
                                                value={endDate}
                                                mode="date"
                                                display="default"
                                                onChange={handleEndDateChange}
                                                editable={false}
                                            />
                                        )}

                                    </View>

                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>Alasan Cuti : </Text>
                                <TextPanjang value={dataDetail[0]?.keterangan || ''} onChangeText={handleChangeAlasan} />
                            </View>
                        </>
                    )}
                    <View>
                        <Text style={styles.text}>Catatan Dari Approve:: </Text>
                        <TextPanjang value={alasan} onChangeText={handleChangeAlasan} />
                    </View>

                    <View style={[{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                        {/* <View style={[styles.column]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: 'red', }]}
                                onPress={buttonMenuDetailTolak}
                            >
                                <Text style={styles.textButton}>TOLAK</Text>
                            </Pressable>
                        </View> */}
                        <View style={[styles.column]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: '#008DDA', }]}
                                onPress={buttonMenuUbahTolak}
                            >
                                <Text style={styles.textButton}>SIMPAN</Text>
                            </Pressable>
                            <LoadingAlert visible={loading} />
                        </View>

                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DetailApproveCutiUbah;

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
    buttonJam: {
        backgroundColor: '#008DDA',
        borderRadius: 10,
        alignItems: 'center',
        height: 40,
        width: 40,
        justifyContent: 'center',
        marginTop: 10,
    }

});
