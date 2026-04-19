import { StyleSheet } from 'react-native';

export const codeEditor = StyleSheet.create({ 
    container: {
        backgroundColor: '#626262ff',
        flexDirection: 'row',
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

    scrollView: {
        flex: 1,
    }
});
