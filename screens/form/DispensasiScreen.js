import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Button, TextInput, Platform } from "react-native";
import Inputan from "../../components/Inputan";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextPanjang from "../../components/TextPanjang";

function DispensasiScreen() {
    const data = [
        { label: 'Cuti Sakit/Haid', value: '1', duration: 3 },
        { label: 'Cuti Bersalin / Keguguran', value: '2', duration: 3 },
        { label: 'Dispensasi', value: '3', duration: 3 },
        { label: 'Cuti Ibadah Keagamaan', value: '4', duration: 3 },
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const [lamaIzin, setLamaIzin] = useState('');

    useEffect(() => {
        if (value) {
            const selectedData = data.find(item => item.value === value);
            if (selectedData) {
                setLamaIzin(selectedData.duration);
                setEndDate(addDays(startDate, selectedData.duration));
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
        setShowStartDatePicker(false); // Hide after selection
        if (newDate !== undefined) {
            setStartDate(newDate);
            setEndDate(addDays(newDate, selectedDuration));
        }
    };

    const handleEndDateChange = (event, newDate) => {
        setShowEndDatePicker(false); // Hide after selection
        if (newDate !== undefined) {
            setEndDate(newDate);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#E7F4FE', flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.text}>Nama Pekerja : </Text>
                        <Inputan />
                    </View>
                    <View>
                        <Text style={styles.text}>NIK : </Text>
                        <Inputan />
                    </View>
                    <View>
                        <Text style={styles.text}>Jabatan: </Text>
                        <Inputan />
                    </View>
                    <View>
                        <Text style={styles.text}>Unit Kerja: </Text>
                        <Inputan />
                    </View>
                    <View>
                        <Text style={styles.text}>Jenis Cuti/Izin : </Text>
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
                            placeholder={!isFocus ? 'Select item' : '...'}
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
                        <TextPanjang/>
                    </View>

                    <View style={[{ marginTop: 20,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'  }]}>
                        <View style={[styles.column]}>
                           
                        </View>
                        <View style={[styles.column]}>
                            <Pressable
                                style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                                onPress={''}
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
        padding: 12,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        fontSize: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 8,
        shadowRadius: 0.8,
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
    
});
