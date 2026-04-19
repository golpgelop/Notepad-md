import { StyleSheet } from 'react-native';

export const popup = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        left: 20,
        right: 20,
        height: 200,
        backgroundColor: '#727272ff',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#6b6a6aff',
    },

    Button: {
        width: 100,
        height: 100,
        backgroundColor: '#3c3c3cff',
        borderWidth: 0.2,
        borderRadius: 15,
        borderColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Text: {
        color: '#ffffffff',
    },

    inputAdd: {
        backgroundColor: '#303030ff',
        height: 50,
        width: 200,
        borderRadius: 30,
        color: '#ffffffff',
        borderWidth: 0.2,
        borderColor: '#ffffffff',
    },


});
