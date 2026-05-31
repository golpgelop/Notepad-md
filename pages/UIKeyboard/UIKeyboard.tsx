import { TouchableOpacity, View, Text } from 'react-native';
import { ui } from './UIKeyboard.styles';


const UIKeyboard: React.FC = () => {

    const handlePressLeft = () => {
    }


    return (
        <View style={ui.container}>
            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>←</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>↑</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>↓</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>put</Text>  
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>past</Text>  
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>copy</Text>  
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressLeft}>
                <Text style={ui.ButtonText}>cancel</Text>  
            </TouchableOpacity>
        </View>
    );
}

export default UIKeyboard;