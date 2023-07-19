import { Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/authProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {IP, setMotorista, setCliente, setUsuario} = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post(IP + '/utilizador/login', {
        email,
        password,
      });
      if (response && response.data) {
        const { message, user, success, isMotorista, isCliente, retorno } = response.data;
        
        setUsuario(user);

        if (success) {
          if (isMotorista) {
            setMotorista(retorno);
            navigation.navigate('Dashboard');
          } else {
            setCliente(retorno);
            navigation.navigate('Mapa');
          }
        }else
        Alert.alert(message);
      } else {
        Alert.alert('Erro', 'Resposta inválida do servidor.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro desconhecido.');
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={20}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          disabled={email === '' && password === ''}
          style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 100,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    paddingVertical: 16,
    borderRadius: 8,
    width: 332,
    padding: 16,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: '#FFFFFE',
    fontSize: 16
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0870',
    paddingVertical: 16,
    borderRadius: 8,
    fontWeight: 'bold',
    width: 332,
    marginTop: 40
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});