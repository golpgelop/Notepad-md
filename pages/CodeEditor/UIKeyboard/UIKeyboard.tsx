import { TouchableOpacity, View, Text } from 'react-native';
import { ui } from './UIKeyboard.styles';

interface IUIKeyboardProps {
  onLeft: () => void;
  onRight: () => void;
  onUp: () => void;
  onDown: () => void;
  onPut?: () => void;
  onPast?: () => void;
  onCopy?: () => void;
}

const UIKeyboard: React.FC<IUIKeyboardProps> = ({
  onLeft,
  onRight,
  onUp,
  onDown,
  onPut,
  onPast,
  onCopy,
}) => {
  return (
    <View style={ui.container}>
      <TouchableOpacity style={ui.Button} onPress={onLeft}>
        <Text style={ui.ButtonText}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ui.Button} onPress={onRight}>
        <Text style={ui.ButtonText}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ui.Button} onPress={onUp}>
        <Text style={ui.ButtonText}>↑</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ui.Button} onPress={onDown}>
        <Text style={ui.ButtonText}>↓</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ui.Button} onPress={onPut}>
        <Text style={ui.ButtonText}>put</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ui.Button} onPress={onPast}>
        <Text style={ui.ButtonText}>past</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ui.Button} onPress={onCopy}>
        <Text style={ui.ButtonText}>copy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UIKeyboard;