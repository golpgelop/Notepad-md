import { StatusBar } from 'expo-status-bar';
import { View, AppState, AppStateStatus } from 'react-native';
import { app } from './App.styles';
import PageManager from './pages/PageManager';

import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

const App: React.FC = () => {

    useEffect(() => {
        const setupNavigationBar = async () => {
            await NavigationBar.setBackgroundColorAsync('#000000');
            await NavigationBar.setVisibilityAsync('visible');
            await NavigationBar.setBehaviorAsync('inset-touch');
            await NavigationBar.setButtonStyleAsync('light');
            await NavigationBar.setPositionAsync('relative');
        };
        const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active') {
                setupNavigationBar();
                SystemUI.setBackgroundColorAsync('#1a1a1a');
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);



    return (
        <View style={app.container}>
            <PageManager />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;
