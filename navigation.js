import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './home';
import ListScreen from './list';

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="List"
          component={ListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
