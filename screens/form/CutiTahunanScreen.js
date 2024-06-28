import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Button, TextInput, Platform } from "react-native";
import Inputan from "../../components/Inputan";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextPanjang from "../../components/TextPanjang";
import { Picker } from '@react-native-picker/picker';


function CutiTahunanScreen() {
    const data = [
        { label: 'Dalam Daerah', value: '1' },
        { label: 'Diluar Daerah', value: '2' },
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [lamaIzin, setLamaIzin] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());


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
                        <Text style={styles.text}>Unit Organisasi: </Text>
                        <Inputan />
                    </View>
                    <View>
                        <Text style={styles.text}>Unit Kerja: </Text>
                        <Inputan />
                    </View>
                    <View>
                        <Text style={styles.text}>Tahun Periode: </Text>
                        <View style={styles.PickerControl}>
                            <Picker
                                selectedValue={selectedYear}
                                onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
                                style={[styles.picker]}
                                mode="dropdown"
                            >
                                {years.map((year) => (
                                    <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>Lama Izin: </Text>
                        <TextInput
                            style={[styles.input, { color: 'black' }]}
                            value={lamaIzin !== null ? `${lamaIzin} hari` : ''}
                            onChangeText={(text) => setLamaIzin(text)}
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
                        <Text style={styles.text}>Sisa Cuti: </Text>
                        <Inputan />
                    </View>

                    <View style={[{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
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
