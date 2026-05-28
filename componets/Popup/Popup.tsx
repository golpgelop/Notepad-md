import { useState } from 'react';
import { TouchableOpacity, View, TextInput, Text } from 'react-native';
import { popup } from './Popup.styles';

type TData = {
  button: string;
  text: string;
  handler: (inputValue: string) => void;
};

export type TOptions = {
  data?: TData;
  error?: string;
};

const Popup: React.FC<TOptions> = ({ error, data }) => {
  const [inputValue, setInputValue] = useState('');

  const handlePress = () => {
    if (data?.handler) {
      data.handler(inputValue);
    }
  };

  return (
    <View style={popup.container}>
      {error && <Text>{error}</Text>}

      {data?.text && <Text style={popup.Text}>{data.text}</Text>}

      {data?.button && (
        <>
          <TextInput
            style={popup.inputAdd}
            placeholder="Введите текст"
            placeholderTextColor="#ffffffff"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity style={popup.Button} onPress={handlePress}>
            <Text style={popup.Text}>{data.button}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Popup;