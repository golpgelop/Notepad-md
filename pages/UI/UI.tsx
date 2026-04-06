import { TouchableOpacity, View, Alert, Text } from 'react-native';
import { ui } from './UI.styles';
import { IBasePage, PAGES } from '../PageManager';


const UI: React.FC<IBasePage> = (props) => {
    const { setPage } = props;

    const handlePressMain = () => {
        setPage(PAGES.MAIN)
    }

    const handlePressExplorer = () => {
        setPage(PAGES.EXPLORER)
    }

    const handlePressSetting = () => {
        setPage(PAGES.SETTING)
    }
    
    return (
        <View style={ui.container}>
            <TouchableOpacity style={ui.Button} onPress={handlePressMain}>
                <Text style={ui.ButtonText}>Заметки</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ui.Button} onPress={handlePressExplorer}>
                <Text style={ui.ButtonText}>Проводник</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ui.Button} onPress={handlePressSetting}>
                <Text style={ui.ButtonText}>Настройки</Text>
            </TouchableOpacity>
        </View>
    );
}

export default UI;