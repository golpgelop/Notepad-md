import { StyleSheet } from 'react-native';

export const main = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#434343ff',
    },

    buttonAdd: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        backgroundColor: '#393939cc',
        height: 50,
        width: 50,
        borderRadius: 50,
    },

    buttonAddImage: {
        height: 50,
        width: 50,
    },

    inputSearch: {
        position: 'absolute',
        backgroundColor: '#393939ff',
        top: 50,
        left: 10,
        right: 10,
        height: 50,
        borderRadius: 30,
        paddingLeft: 20,
        color: '#ffffffff',
        borderWidth: 0.2,
        borderColor: '#ffffffff',
    },
    cut: {
        position: 'absolute',
        backgroundColor: '#434343ff',
        top: 0,
        left: 0,
        right: 0,
        height: 110,
        
    }
});
