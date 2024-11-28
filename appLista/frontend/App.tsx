import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/telas/login'; 
import Home from './src/telas/home';
import Listas from './src/telas/listas';
import SubListas from './src/telas/subListas';
import Cadastro from './src/telas/cadastro';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Cadastro' component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Listas" component={Listas} />
        <Stack.Screen name="SubLista" component={SubListas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
