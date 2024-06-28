import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList } from "react-native";
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import CardBox from "../../components/CardBox";
import { RIWAYAT } from "../../data/dummy-data";

function RiwayatAbsen() {
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [filteredData, setFilteredData] = useState(RIWAYAT);

    const years = ['all', ...Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString())];
    const months = ['All', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const handleFilter = () => {
        const filtered = RIWAYAT.filter(item => {
            const itemDate = new Date(item.tanggal);
            const yearMatch = selectedYear === 'all' || itemDate.getFullYear().toString() === selectedYear;
            const monthMatch = selectedMonth === 'all' || (itemDate.getMonth() + 1).toString() === selectedMonth;

            return yearMatch && monthMatch;
        });
        setFilteredData(filtered);
    };

    const renderRiwayat = (itemData) => {
        return (
            <CardBox
                tanggal={itemData.item.tanggal}
                ketAbsen={itemData.item.ketAbsen}
                absenMasuk={itemData.item.absenMasuk}
                jamMasuk={itemData.item.jamMasuk}
                absenPulang={itemData.item.absenPulang}
                jamPulang={itemData.item.jamPulang}
            />
        );
    };

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
                                <Picker.Item key={index} label={month} value={index === 0 ? 'all' : (index).toString()} />
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
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderRiwayat}
            />
        </SafeAreaView>
    );
}

export default RiwayatAbsen;

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