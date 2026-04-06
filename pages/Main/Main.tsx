import { TouchableOpacity, View, Alert, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { main } from './Main.styles';
import React, { useState } from 'react';

const imageAdd = require('../../assets/addWhite.png');

const Main: React.FC = () => {

    const [text, setText] = useState('');

    return (

        <View style={main.container}>
            <TextInput
                style={main.inputSearch}
                placeholder="Введите текст"
                placeholderTextColor='#ffffffff'
                value={text}
                onChangeText={setText}
            />

            <TouchableOpacity
                onPress={() => Alert.alert('Нажато!')}
                style={main.buttonAdd}
            >
                <Image
                    style={main.buttonAddImage}
                    source={imageAdd}
                />
            </TouchableOpacity>
        </View>
    );
}

export default Main;


