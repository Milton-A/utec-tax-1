import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Mapa from './screens/Mapa';
import Historico from './screens/Historico';
import SiderMenu from './screens/SiderMenu';
import Viagem from './screens/Viagem';
import LoginForm from './screens/Login';
import CadastroForm from './screens/Cadastro';
import Dashboard from './screens/Dashboard';
import GetStartedScreen from './screens/GetStarted';
import OpAvaliar1 from './screens/OpAvaliar1';
import { MarcarDestino } from './screens/MarcarDestino';
import { SetMotorista } from './screens/SetMotorista';
import { SetVeiculo } from './screens/setVeiculo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider from './contexts/authProvider';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStart" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Mapa" component={Mapa} />
          <Stack.Screen name="Historico" component={Historico} />
          <Stack.Screen name="Viagem" component={Viagem} />
          <Stack.Screen name="Cadastro" component={CadastroForm} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="SiderMenu" component={SiderMenu} />
          </Stack.Group>
          <Stack.Screen name="Avaliar" component={OpAvaliar1} />
          <Stack.Screen name="MarcarDestino" component={MarcarDestino} />
          <Stack.Screen name="SetMotorista" component={SetMotorista} />
          <Stack.Screen name="SetVeiculo" component={SetVeiculo} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;