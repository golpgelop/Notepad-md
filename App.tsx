import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, AppState, AppStateStatus } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { app } from './App.styles';
import PageManager from './pages/PageManager';
import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { useNotes } from './hooks/useNotes';

export const StoreContext = React.createContext<ReturnType<typeof useNotes>>(null!);

const AppContent: React.FC = () => {
  const insets = useSafeAreaInsets();
  const store = useNotes(); 

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
    return () => subscription.remove();
  }, []);

  return (
    <View style={[app.container, { paddingBottom: insets.bottom }]}>
      <StoreContext.Provider value={store}>
        <PageManager />
        <StatusBar style="auto" />
      </StoreContext.Provider>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <AppContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;