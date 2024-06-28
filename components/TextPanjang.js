import { View, Text, TextInput, StyleSheet } from 'react-native';

function TextPanjang({

}) {
    return (
        <View>
            <TextInput
                style={styles.input2}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
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
