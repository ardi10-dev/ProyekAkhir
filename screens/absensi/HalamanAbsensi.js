import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import HalamanGambar from "./HalamanGambar";
import LokasiPengguna from "./LokasiPengguna";
import ModalAbsen from "../../components/ModalAbsen";




function HalamanAbsen({ navigation }) {
    const navigate = (route) => navigation.navigate(route)

    const data = [
        { label: 'office 1 (08:00 - 17:00)', value: '1' },
        { label: 'office  (14:00 - 17:00)', value: '2' },
        { label: 'office 1 (08:00 - 12:00)', value: '3' },
        { label: 'office 1 (16:00 - 24:00)', value: '4' },
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleAbsensiSubmit = () => {
        // Lakukan logika absensi submit di sini
        // Misalnya, simpan data absensi ke server dan set state modalVisible menjadi true

        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('HalamanUtama');
    };

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#E7F4FE', flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View >
                    <Text style={[{ textAlign: 'Left', color: 'black', fontWeight: 'bold', marginLeft: 10, }]}>{new Date().toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</Text>
                </View>
                <View style={styles.text}>
                    <LokasiPengguna />
                </View>
                <View style={styles.text}>
                    <Text >Alamat : </Text>
                    <Text >Jl. Umban Sari</Text>
                </View>

                <View style={styles.ket}>
                    <Text style={[{ fontWeight: 'bold' }]}>Pilih jam Kerja</Text>
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

                <View style={styles.photo}>
                    <HalamanGambar />
                </View>

                <View >
                    <Pressable
                        style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                        onPress={handleAbsensiSubmit}>
                        <Text style={styles.textButton}>Submit</Text>
                    </Pressable>
                </View>
                <ModalAbsen visible={modalVisible} closeModal={closeModal} />
                {/* <SuccessModal  /> */}
            </ScrollView>
        </SafeAreaView>
    );
}
export default HalamanAbsen;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 0,
    },
    text: {
        alignItems: 'center',
        marginTop: 15,
        fontWeight: 'bold',
    },
    ket: {
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    photo: {
        marginTop: 20,
        padding: 10,
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
        width: '60%',
        marginTop: 150,
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
        marginTop: 20,
        marginRight: 30,
        marginLeft: 30,
        padding: 12,
        backgroundColor: '#10439F',
        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    },
    pressedButton: {
        opacity: 0.5,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%'
    }

});
