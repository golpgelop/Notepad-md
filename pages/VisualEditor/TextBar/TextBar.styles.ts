import { StyleSheet } from 'react-native';

export const textbar = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3c3c3cff',
        padding: 10,
    },
    input: {
        color: '#b4b4b4ff',
        fontFamily: 'monospace',
        flex: 1,
        textAlignVertical: 'top',
        padding: 0,
    },
    preview: {
        flex: 1,
    },
});