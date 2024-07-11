import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, TextInput, Alert } from "react-native";
import Inputan from "../../components/Inputan";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextPanjang from "../../components/TextPanjang";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DetailApprovalLembur({ route, navigation }){
    const [dataDetail, setDataDetail] = useState();
    const userData = route.params && route.params.userData ? route.params.userData : {};
    const [alasan, setAlasan] = useState('');



    // const fetchUserId = async () => {
    //     try {
    //         const data = await AsyncStorage.getItem('userData');
    //         if (data !== null) {
    //             const userData = JSON.parse(data);
    //             setUserId(userData.id_pegawai);
    //             setUserId(userData.role_id);
    //             // console.log(userData.id_pegawai); 
    //             // console.log(userData.role_id); 
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //     }
    // };
    const fetchData = async () => {
        try {
            const id_pegawai_lembur_req = route.params.id;
            console.log(id_pegawai_lembur_req);
            const response = await fetch('https://hc.baktitimah.co.id/pegawaian/api/API_Lembur/getDetailLemburApproval', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Perhatikan perubahan di sini
                },
                body: `id_pegawai_lembur_req=${encodeURIComponent(id_pegawai_lembur_req)}` // Dan di sini
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setDataDetail(data.data);
            // console.log(setDataDetail);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
        // fetchUserId();
    }, [])

    const buttonMenuDetail = async () => {
        try {
            const data = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(data);
            const id_pegawai_lembur_req = route.params.id;

            if (!id_pegawai_lembur_req) {
                throw new Error('id_pegawai_izin is missing');
            }

            if (dataDetail && (dataDetail[0]?.status === '1' || dataDetail[0]?.status === '2')) {
                Alert.alert('Tidak dapat diapprove lagi');
                return;
            }

            const formData = new FormData();
            formData.append('id_pegawai_lembur_req', id_pegawai_lembur_req);
            formData.append('id_pegawai', dataDetail[0]?.id_pegawai);
            formData.append('status', '1');
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

            const url = 'https://hc.baktitimah.co.id/pegawaian/api/API_Lembur/approveLembur';

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
                        'Approve Berhasil di Simpan',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigation.navigate('ApprovalLembur');
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert('Insert failed', result.message || 'Gagal Approve cuti');
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

    const buttonMenuDetailTolak = async () => {
        try {
            const data = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(data);
            const id_pegawai_lembur_req = route.params.id;

            if (!id_pegawai_lembur_req) {
                throw new Error('id_pegawai_izin is missing');
            }

            if (dataDetail && (dataDetail[0]?.status === '1' || dataDetail[0]?.status === '2')) {
                Alert.alert('Tidak dapat diapprove lagi');
                return;
            }

            const formData = new FormData();
            formData.append('id_pegawai_lembur_req', id_pegawai_lembur_req);
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

            const url = 'https://hc.baktitimah.co.id/pegawaian/api/API_Lembur/approveLembur';

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
                                    navigation.navigate('AprovalLembur');
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
                                <Text style={styles.text}>Tanggal Pengajuan : </Text>
                                <Inputan value={dataDetail[0]?.tgl_pengajuan || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>Tanggal Lembur : </Text>
                                <Inputan value={dataDetail[0]?.tgl_lembur || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>Jam Mulai : </Text>
                                <Inputan value={dataDetail[0]?.waktu_mulai || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>Sampai Jam : </Text>
                                <Inputan value={dataDetail[0]?.waktu_akhir || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>Dikerjakan Pada Saat : </Text>
                                <Inputan value={dataDetail[0]?.jenis_lembur || ''} />
                            </View>
                            <View>
                                <Text style={styles.text}>Dikerjakan Saat : </Text>
                                <TextPanjang value={dataDetail[0]?.keterangan || ''} onChangeText={handleChangeAlasan} />
                            </View>
                        </>
                    )}
                    <View>
                        <Text style={styles.text}>Catatan Dari Approve:: </Text>
                        <TextPanjang value={alasan} onChangeText={handleChangeAlasan} />
                    </View>

                    <View style={[{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                        <View style={[styles.column]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: 'red', }]}
                                onPress={buttonMenuDetailTolak}
                            >
                                <Text style={styles.textButton}>TOLAK</Text>
                            </Pressable>
                        </View>
                        <View style={[styles.column]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton, { backgroundColor: '#008DDA', }]}
                                onPress={buttonMenuDetail}
                            >
                                <Text style={styles.textButton}>APPROVE</Text>
                            </Pressable>
                        </View>

                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DetailApprovalLembur;
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

});