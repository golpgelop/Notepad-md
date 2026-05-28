import { StyleSheet } from 'react-native';

export const textBar = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 5,
        backgroundColor: '#3c3c3cff',
        paddingBottom: 100,
        flex: 1
    },

    lineNumber: {
        color: '#b4b4b4ff',
        lineHeight: 20,
        fontSize: 14, 
        fontFamily: 'monospace',
        bottom: 10
    },

    activeLine: {
        color: '#ffffffff',
    },


});
