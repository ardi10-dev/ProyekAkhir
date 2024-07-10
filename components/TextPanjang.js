import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const TextPanjang = ({ value, onChangeText }) => {

    return (
        <View>
            <TextInput
                style={styles.input2}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default TextPanjang;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        minHeight: 100, // Tinggi minimum untuk memuat beberapa baris teks
    },

});
