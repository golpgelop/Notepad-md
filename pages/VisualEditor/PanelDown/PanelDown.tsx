import { TouchableOpacity, View, Alert, Text } from 'react-native';
import { paneldown } from './PanelDown.styles';


const Panel: React.FC = (props) => {

    const handlePressSave = () => {

    }

    const handlePressSize = () => {

    }
    
    return (
        <View style={paneldown.container}>
            <TouchableOpacity style={paneldown.Button} onPress={handlePressSave}>
                <Text style={paneldown.ButtonText}>Paste</Text>
            </TouchableOpacity>

            <TouchableOpacity style={paneldown.Button} onPress={handlePressSize}>
                <Text style={paneldown.ButtonText}>left</Text>
            </TouchableOpacity>

            <TouchableOpacity style={paneldown.Button} onPress={handlePressSave}>
                <Text style={paneldown.ButtonText}>right</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Panel;