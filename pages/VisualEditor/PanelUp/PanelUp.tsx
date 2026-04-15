import { TouchableOpacity, View, Alert, Text } from 'react-native';
import { panelup } from './PanelUp.styles';
import { useState } from 'react';


const PanelUp: React.FC = () => {

    const [size, setSize] = useState(1);

    const handlePressSize = () => {
        if (size < 4) {
            setSize(size + 1)
        } else {
            setSize(1)
        }
    }

    const viewArray = ['view','𝑩', 'S̶', '</>', '𝑰']
    const [view, setView] = useState(viewArray[0]);

    const handlePressView = () => {
        const index = viewArray.indexOf(view);

        if (viewArray[index + 1]) {
            setView(viewArray[index + 1]);
        } else {
            setView(viewArray[0]);
        }

    }

    const markArray = ['mark','1.', '-', '•']
    const [mark, setMark] = useState(markArray[0]);

    const handlePressMark = () => {
        const index = markArray.indexOf(mark);

        if (markArray[index + 1]) {
            setMark(markArray[index + 1]);
        } else {
            setMark(markArray[0]);
        }

    }

    const handlePressLine = () => {}
    const handlePressSave = () => {}


    return (
        <View style={panelup.container}>
            <TouchableOpacity style={panelup.Button} onPress={handlePressMark}>
                <Text style={panelup.ButtonText}>{`${mark}`}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={panelup.Button} onPress={handlePressLine}>
                <Text style={panelup.ButtonText}>---</Text>
            </TouchableOpacity>

            <TouchableOpacity style={panelup.Button} onPress={handlePressView}>
                <Text style={panelup.ButtonText}>{`${view}`}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={panelup.Button} onPress={handlePressSize}>
                <Text style={panelup.ButtonText}>Aa: {`${size}`}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={panelup.Button} onPress={handlePressSave}>
                <Text style={panelup.ButtonText}>💾</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PanelUp;