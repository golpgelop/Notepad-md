import { TouchableOpacity, View, Alert, Text } from 'react-native';
import { ui } from './UI.styles';
import { IBasePage, PAGES } from '../PageManager';



const UI: React.FC<IBasePage> = (props) => {
    const { setPage } = props;

    const handlePressMain = () => {
        setPage(PAGES.MAIN)
    }

    const handlePressVisualEditor = () => {
        setPage(PAGES.VISUAL_EDITOR)
    }

    const handlePressCodeEditor = () => {
        setPage(PAGES.CODE_EDITOR)
    }

    return (
        <View style={ui.container}>
            <TouchableOpacity style={ui.Button} onPress={handlePressMain}>
                <Text style={ui.ButtonText}>Заметки</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressVisualEditor}>
                <Text style={ui.ButtonText}>Текст</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.Button} onPress={handlePressCodeEditor}>
                <Text style={ui.ButtonText}>Код</Text>
            </TouchableOpacity>
        </View>
    );
}

export default UI;