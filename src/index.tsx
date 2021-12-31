import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './interfaces/navigation';
import MainContextProvider from './store/MainProvider';
import {navigationRef} from './helpers/RootNavigation';
import Entrance from './screens/Entrance';
import Home from './screens/Home';
import Call from './screens/Call';
import Users from './screens/Users';
import Incoming from './screens/Incoming';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MainContextProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Entrance"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Entrance" component={Entrance} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="Call" component={Call} />
          <Stack.Screen name="Incoming" component={Incoming} />
        </Stack.Navigator>
      </NavigationContainer>
    </MainContextProvider>
  );
}
