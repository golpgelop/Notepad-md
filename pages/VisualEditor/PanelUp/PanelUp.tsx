import { TouchableOpacity, View, Alert, Text } from 'react-native';
import { panelup } from './PanelUp.styles';


const Panel: React.FC = (props) => {

    const handlePressSave = () => {

    }

    const handlePressSize = () => {

    }
    
    return (
        <View style={panelup.container}>
            <TouchableOpacity style={panelup.Button} onPress={handlePressSave}>
                <Text style={panelup.ButtonText}>Заметки</Text>
            </TouchableOpacity>

            <TouchableOpacity style={panelup.Button} onPress={handlePressSize}>
                <Text style={panelup.ButtonText}>Size</Text>
            </TouchableOpacity>

            <TouchableOpacity style={panelup.Button} onPress={handlePressSave}>
                <Text style={panelup.ButtonText}>Sava</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Panel;