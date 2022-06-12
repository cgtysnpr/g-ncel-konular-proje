import React from 'react';
import {SafeAreaView} from 'react-native';

import AppContainer from './navigation';
import {NativeBaseProvider, Center} from 'native-base';
const App = () => {
  // Unsubscribe

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{flex: 1}}>
        <AppContainer />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
