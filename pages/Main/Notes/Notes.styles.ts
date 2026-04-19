import { StyleSheet } from 'react-native';

export const notes = StyleSheet.create({
    container: {
        paddingBottom: 200
    },

    note: {
        backgroundColor: '#393939ff',
        top: 130,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 150,
        borderRadius: 30,
        paddingLeft: 20,
        color: '#ffffffff',
        borderWidth: 0.5,
        borderColor: '#ffffffff',
    },

    head: {
        position: 'absolute',
        color: '#ffffffff',
        fontSize: 20,
        left: 20,
        top: 10
    },

    description: {
        position: 'absolute',
        color: '#ffffffff',
        left: 20,
        right: 20,
        top: 40
    },

    deleteNote: {
        position: 'absolute',
        color: '#ffffffff',
        right: 10,
        top: 10,
        borderColor: '#ffffffff',
        borderWidth: 3,
        height: 50,
        width: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

    deleteNoteText: {
        color: '#ffffffff',
        fontSize: 20,
    }


});