import { TouchableOpacity, View, Text } from 'react-native';
import { ui } from './UIKeyboard.styles';

const UIKeyboard: React.FC = () => {
    const handlePressLeft = () => {};

    const handlePressRight = () => {};

    const handlePressUp = () => {};

    const handlePressDown = () => {};

    const handlePressPut = () => {};

    const handlePressPast = () => {};

    const handlePressCopy = () => {};

    const handlePressCancel = () => {};

    return (
        <View style={ui.container}>
            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>←</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressRight}>
                <Text style={ui.ButtonText}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressUp}>
                <Text style={ui.ButtonText}>↑</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressDown}>
                <Text style={ui.ButtonText}>↓</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressPut}>
                <Text style={ui.ButtonText}>put</Text>  
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressPast}>
                <Text style={ui.ButtonText}>past</Text>  
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressCopy}>
                <Text style={ui.ButtonText}>copy</Text>  
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressCancel}>
                <Text style={ui.ButtonText}>cancel</Text>  
            </TouchableOpacity>
        </View>
    );
};

export default UIKeyboard;