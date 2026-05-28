import { StyleSheet } from 'react-native';

export const ui = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#434343ff',
        height: 60,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        paddingTop: 5
    },

    buttonAdd: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        backgroundColor: '#393939ff',
        height: 50,
        width: 50,
        borderRadius: 50,
    },

    buttonAddImage: {
        height: 50,
        width: 50,
    },

    Button: {
        backgroundColor: '#3c3c3cff',
        borderWidth: 0.2,
        borderRadius: 15,
        borderColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
    },

    ButtonText: {
        color: '#ffffffff',
    },

    
});
