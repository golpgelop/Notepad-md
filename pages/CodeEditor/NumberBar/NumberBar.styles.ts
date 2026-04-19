import { StyleSheet } from 'react-native';

export const numberBar = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: '#595959ff',
        width: 40,
        alignItems: 'flex-end',
        paddingRight: 5,
    },

    lineNumber: {
        color: '#b4b4b4ff',
        lineHeight: 20,
        fontSize: 14, 
        fontFamily: 'monospace',
    },

    activeLine: {
        color: '#ffffffff',
    },


});
