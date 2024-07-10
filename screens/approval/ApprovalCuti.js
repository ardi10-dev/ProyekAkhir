import React, { useState, useEffect, useFocusEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardIzin from '../../components/CardIzin';
import { ActivityIndicator } from 'react-native';
import CardIzinApprove from '../../components/CardIzinApprove';
import CardCutiApprove from '../../components/CardCutiApprove';



function ApprovalCuti({ route, navigation }) {

    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const [riwayatAppCuti, setRiwayatAppCuti] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [userData, setUserData] = useState(null);




    const years = ['all', ...Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString())];
    const months = ['All', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];


    useEffect(() => {
        const fetchRiwayatAppCuti = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');

                if (data !== null) {
                    const userData = JSON.parse(data);
                    const idPegawai = userData.id_pegawai;
                    console.log(idPegawai);

                    const response = await fetch('https://hc.baktitimah.co.id/pegawaian/api/API_Cuti/getCutiApproval', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded', // Perhatikan perubahan di sini
                        },
                        body: `id_pegawai=${idPegawai}` // Dan di sini
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const responseData = await response.json();
                    const sortedData = responseData.data.sort((a, b) => parseDate(b[4]) - parseDate(a[4]));
                    setRiwayatAppCuti(responseData.data);
                    setFilteredData(responseData.data);
                    setLoading(false);
                    // console.log(responseData.data);
                }
            } catch (error) {
                console.error('Error fetching riwayat izin:', error);
                setLoading(false);
            }
        };

        const focusSubscription = navigation.addListener('focus', () => {
            fetchRiwayatAppCuti();
        });

        return focusSubscription;
    }, [navigation])


    const handleFilter = () => {
        if (!riwayatAppCuti.length) return;

        const filtered = riwayatAppCuti.filter(item => {
            const itemDate = parseDate(item[4]);
            const yearMatch = selectedYear === 'all' || itemDate.getFullYear().toString() === selectedYear;
            const monthMatch = selectedMonth === 'all' || (itemDate.getMonth() + 1).toString() === selectedMonth;

            return yearMatch && monthMatch;
        });

        setFilteredData(filtered);
    };

    const parseDate = (dateString) => {
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const [day, month, year] = dateString.split(' ');
        const monthIndex = monthNames.indexOf(month);
        if (monthIndex === -1) {
            throw new Error(`Invalid month name: ${month}`);
        }
        return new Date(year, monthIndex, day);
    };

    function renderRiwayatIzin({ item }) {
        const Id_pegawai_cuti = item[11] || '';
        const nama = item[3] || '';
        const nip = item[2] || '';
        const ket = item[1] || '';
        const jenisIzin = item[8] || '';
        const tanggal = item[4] || '';
        const tgl_mulai = item[6] || '';
        const tgl_akhir = item[7] || '';

        // console.log(Id_pegawai_cuti);


        return (
            <CardCutiApprove
                key={item[0]}
                Id_pegawai_cuti={Id_pegawai_cuti}
                nama={nama}
                nip={nip}
                ket={ket}
                jenisIzin={jenisIzin}
                tanggal={tanggal}
                tgl_mulai={tgl_mulai}
                tgl_akhir={tgl_akhir}
            />
        );
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#E7F4FE' }]}>
            <View style={styles.filterContainer}>
                <View style={styles.column}>
                    <Text style={styles.text}>Tahun Periode:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedYear}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedYear(itemValue)}
                        >
                            {years.map(year => (
                                <Picker.Item key={year} label={year === 'all' ? 'All' : year} value={year} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.column}>
                    <Text style={styles.text}>Bulan:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedMonth}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                        >
                            {months.map((month, index) => (
                                <Picker.Item key={index.toString()} label={month} value={index === 0 ? 'all' : (index).toString()} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressedButton]}
                    onPress={handleFilter}
                >
                    <Ionicons name="search" size={20} color="white" />
                </Pressable>
            </View>

            <FlatList
                data={filteredData.length > 0 ? filteredData : []} // Only display filteredData if available
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRiwayatIzin}
                ListEmptyComponent={<Text>No data found</Text>} // Display message when there's no data
            />
        </SafeAreaView>
    );
}

export default ApprovalCuti;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    column: {
        flex: 1,
        margin: 5,
    },
    text: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pickerContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white', // Optional: to ensure the picker is on a white background
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 0.8,
    },
    picker: {
        height: 40,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#008DDA',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 30,
        height: 40,
        width: 40,
    },
    pressedButton: {
        opacity: 0.7,
    },


});