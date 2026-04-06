import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { app } from './App.styles';
import PageManager from './pages/PageManager';

const App: React.FC = () => {

    return (
        <View style={app.container}>
            <PageManager />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;
