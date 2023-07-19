import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/authProvider';
import axios from 'axios';

export const Viagem = () => {
  const {
    origin,
    destination,
    originCoordinates,
    destinationCoordinates,
    driverCoordinates,
    getDriver,
    driver,
    IP,
    viagem,
    user1,
    veiculoId,
    cliente,
    fiabilidade,
    motorista
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const [distance, setDistance] = useState(0);
  const [statusViagem, setStatusViagem] = useState(false);

  function calcularDistancia(x, y, xu, yu) {
    return Math.sqrt(Math.pow(x - y, 2) + Math.pow(xu - yu, 2));
  };
  const timer = useRef(null);
  useEffect(() => {
    if (distance < 0) {
      setDistance(0);
      clearInterval(timer.current);
      setStatusViagem(true);
      guardarViagem();
    }
  }, [distance]);

  const guardarViagem = () => {
    const formData = {
      coordenadas_origem_x: origin.latitude,
      coordenadas_origem_y: origin.longitude,
      coordenadas_destino_x: destination.latitude,
      coordenadas_destino_y: destination.longitude,
      custo_estimado: parseFloat(viagem.custoEstimado),
      custo_real: parseFloat(viagem.custoReal),
      tempo_estimado: parseFloat(viagem.tempoEstimado),
      tempo_real: parseFloat(viagem.tempoReal),
      preco_pago: parseFloat(viagem.custoReal),
      id_cliente: cliente.id_cliente,
      id_motorista: driver.idMotorista,
      id_veiculo: veiculoId.idVeiculo,
    }

    function calcularTempoAjustado() {
      return fatorFiabilidade = 0.8 + Math.random() * 0.4;
    }

    const formDataVeiculo = {
      coordenadas_origem_x: destination.latitude,
      coordenadas_origem_y: destination.longitude
    }
    
    axios.post(IP + '/viagem/', formData)
      .then(response => {
        Alert.alert('Viagem realizada com sucesso!');
        console.log(veiculoId.idVeiculo)
        axios.post(IP + '/veiculo/' + veiculoId.idVeiculo, formDataVeiculo)
          .then(response => {
            Alert.alert('Veiculo actualizado com sucesso!');
          })
          .catch(error => {
            console.error('Erro ao actualizar dados do Veiculo:', error);
          });
      })
      .catch(error => {
        console.error('Erro ao realizar cadastro:', error);
      });
  };

  function handleConfirmClick() {
    const calculatedDistance = calcularDistancia(origin.latitude, origin.longitude, destination.latitude, destination.longitude);
    setDistance(calculatedDistance);
    timer.current = setInterval(() => {
      setDistance(prevDistance => prevDistance - 5);
    }, 100);
  }

  function handleAvaliar() {
    navigation.navigate('Avaliar');
  }


  return (
    <View style={styles.container}>
      <Text>Distância até ao destino</Text>
      <Text style={styles.Text}>Distância: {distance.toFixed(2)} km</Text>
      {statusViagem ?
        <View>
          <TouchableOpacity style={styles.avaliar} onPress={handleAvaliar}>
            <Text style={styles.buttonText}>Avaliar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirm} onPress={()=>{navigation.navigate('Mapa')}}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
        : <TouchableOpacity style={styles.confirm} onPress={handleConfirmClick}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    gap: -30,
    shadowColor: '#000',
    backgroundColor: '#fff',
  },
  confirm: {
    alignItems: 'center',
    width: 303,
    height: 44,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FF0870',
    marginTop: 10,
  },
  avaliar: {
    alignItems: 'center',
    width: 303,
    height: 44,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    width: 303,
    fontWeight: 'bold',
  },
  Text: {
    fontSize: 25,
    textAlign: 'center',
    width: 303,
    fontWeight: 'bold',
  },
});

export default Viagem;
