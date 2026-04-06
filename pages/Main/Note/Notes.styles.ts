import { StyleSheet } from 'react-native';

export const notes = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#449b07ff',
    },

    note: {
        position: 'absolute',
        backgroundColor: '#393939ff',
        top: 130,
        left: 10,
        right: 10,
        height: 150,
        borderRadius: 30,
        paddingLeft: 20,
        color: '#ffffffff',
    }
});
