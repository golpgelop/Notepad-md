import { StyleSheet } from 'react-native';

export const visualEditor = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb983ff',
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
  textInput: {
    flex: 1,
    padding: 10,
    color: '#000',
    fontFamily: 'monospace',
    textAlignVertical: 'top',
  },
});