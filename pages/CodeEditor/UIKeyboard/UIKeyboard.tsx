import { TouchableOpacity, View, Text } from 'react-native';
import { ui } from './UIKeyboard.styles';

interface IUIKeyboardProps {
    onLeft: () => void;
    onRight: () => void;
    onUp: () => void;
    onDown: () => void;
    // остальные можно добавить позже
    onPut?: () => void;
    onPast?: () => void;
    onCopy?: () => void;
    onCancel?: () => void;
}

const UIKeyboard: React.FC<IUIKeyboardProps> = ({
    onLeft,
    onRight,
    onUp,
    onDown,
    onPut,
    onPast,
    onCopy,
    onCancel,
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

            <TouchableOpacity style={ui.Button} >
                <Text style={ui.ButtonText}>put</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} >
                <Text style={ui.ButtonText}>past</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} >
                <Text style={ui.ButtonText}>copy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} >
                <Text style={ui.ButtonText}>cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UIKeyboard;