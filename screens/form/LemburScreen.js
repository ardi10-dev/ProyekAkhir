import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Button, TextInput, Platform } from "react-native";
import Inputan from "../../components/Inputan";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextPanjang from "../../components/TextPanjang";
import { Picker } from '@react-native-picker/picker';


function LemburScreen() {
    const data = [
        { label: 'Hari Kerja', value: '1' },
        { label: 'Hari Libur', value: '2' },
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);


    const handleStartDateChange = (event, newDate) => {
        setShowStartDatePicker(false); // Hide after selection
        if (newDate !== undefined) {
            setStartDate(newDate);
            setEndDate(addDays(newDate, selectedDuration));
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
        const currentTime = selectedTime || startTime;
        setShowStartTimePicker(false);
        setStartTime(currentTime);
    };

    const handleEndTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || endTime;
        setShowEndTimePicker(false);
        setEndTime(currentTime);
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
                                    <AntDesign name="clockcircleo" size={24} color="white" />
                                </Pressable>
                                {showStartTimePicker && (
                                    <DateTimePicker
                                        value={startTime}
                                        mode="time"
                                        display="default"
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
                                    <AntDesign name="clockcircleo" size={24} color="white" />
                                </Pressable>
                                {showEndTimePicker && (
                                    <DateTimePicker
                                        value={endTime}
                                        mode="time"
                                        display="default"
                                        onChange={handleEndTimeChange}
                                    />
                                )}

                            </View>

                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>Uraian Tugas Lembur: </Text>
                        <TextPanjang />
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
