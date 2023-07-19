import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function GetStartedScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <View style={{ width: 305, height: 230 }} >
                <Image style={{ flex: 1, width: undefined, height: undefined }}
                    source={require('../assets/image/1.png')}
                />
            </View>
      <Text style={styles.title}>
                Viajamos juntos! 🚖
            </Text>
            <Text style={styles.description}>
                Agende uma Corrida e levamos-te ao seu destino com facilidade
            </Text>
      <View>
        <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCriar} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: 24
  },
  title: {
      fontSize: 28,
      fontWeight: '600',
      marginBottom: 8,
      textAlign: 'center',
      marginTop: 24
  },
  description: {
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
      color: '#999',
  },
  buttonEntrar: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF0870',
      paddingVertical: 16,
      borderRadius: 8,
      marginTop: 100,
      marginBottom: 12,
  },
  buttonCriar: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF0870',
      paddingVertical: 16,
      borderRadius: 8,
      fontWeight: 'bold',
      width: 332,
  },
  buttonText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold'
  },
  circle: {
      marginTop: 100,
      width: 200,
      height: 200,
      borderRadius: 200,
      backgroundColor: 'grey',
  },
});