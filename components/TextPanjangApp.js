import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const TextPanjangApp = ({ value, onChangeText, }) => {

    return (
        <View>
            <TextInput
                style={styles.input2}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={value}
                onChangeText={onChangeText}
                editable={false}
                
            />
        </View>
    );
}

export default TextPanjangApp;

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
        borderColor: '#4C70C4',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        fontSize: 15,
        textAlignVertical: 'top',
        fontWeight: 'bold',
        color: 'black',
    },

});
