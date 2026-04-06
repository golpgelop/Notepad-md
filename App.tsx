import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { app } from './App.styles';
import PageManager from './pages/PageManager';

import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

const App: React.FC = () => {

    // useEffect(() => {
    //     SystemUI.setBackgroundColorAsync('#1a1a1a');

    //     NavigationBar.setButtonStyleAsync('light');
    // }, []);

    return (
        <View style={app.container}>
            <PageManager />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;
