import { View, Text, TextInput, StyleSheet } from 'react-native';

function Input({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid,
}) {
    return (
        <View>
            <TextInput
                style={[styles.input]}
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    text: {
        marginTop: 10,
        fontSize: 18,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        alignItems: 'center',
        fontSize: 25,
    },

});
