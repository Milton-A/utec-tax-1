import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/authProvider';
import { Octicons } from '@expo/vector-icons';
import Images from '../assets/image/22.jpg';
import axios from 'axios';

export const SetMotorista = () => {
  const {
    getDriver,
    driver,
    getUser1,
    user1,
    IP,
    getNome,
    origin,
    destination,
    veiculoId,
    ajuste, setAjuste,
    viagem,
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const [motorista, setMotorista] = useState([]);
  const [utilizador, setUtilizador] = useState([]);

  const test = (response) => {
    const { data } = response;
    setMotorista(data);
    getUser1(data.id_utilizador);
  };

  const test2 = (response) => {
    const { data } = response;
    setUtilizador(data);
  };

  useEffect(() => {
    axios.get(IP + '/motorista/' + driver.idMotorista)
      .then(function (response) {
        test(response);
        const { data } = response;
        axios.get(IP + '/utilizador/' + data.id_utilizador)
          .then(function (response) {
            test2(response);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);


  const handleModelPress = () => {
    getDriver(motorista.id_motorista);
    getNome(utilizador.nome);
    navigation.navigate('Viagem');
  };

  return (
    <View style={styles.container}>
      <View style={styles.perfil}>
        <View style={styles.perfilInfo}>
          <View style={styles.fotoperfil}><Image style={styles.fotoperfil} source={{ uri: 'https://img.freepik.com/fotos-gratis/retrato-de-jovem-com-oculos-escuros_273609-14360.jpg?w=740&t=st=1688439317~exp=1688439917~hmac=b8110255d638074ba349ed300b91308e236dcb400f35cfaae9685f5d216816cf' }} /></View>
          <View style={styles.nameRating}>
            <Text style={styles.nameperfil}>{utilizador.nome}</Text>
            <View style={styles.ratingContainer}>
              <Octicons name="star-fill" size={14} color="orange" />
              <Text style={styles.ratingNum}> {motorista.classificacao}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.model}>
            <Text style={styles.modelText}>Fiabilidade: {motorista.grau_cumprimento_horario}</Text>
          </View>
          <View style={styles.model}>
            <Text style={styles.modelText}>Preco Final: {viagem.custoReal}</Text>
          </View>
        </View>
      </View>
      <View style={styles.modeloveiculo}>
        {ajuste? <View>
          <Text style={styles.modelText}>Valor a Pagar</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Digite seu nome"
          //onChangeText={(text) => setNome(text)}
          />
        </View>
        :null}
      </View>
      <TouchableOpacity style={styles.confirm} onPress={handleModelPress}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    bottom: 0,
    position: 'absolute',
    zIndex: 1,
    gap: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.025,
    backgroundColor: '#fff',
  },
  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  perfilInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  model: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c1c1c3',
    borderRadius: 15,
    marginBottom: 5
  },
  fotoperfil: {
    width: 80,
    height: 80,
    borderRadius: 750,
    backgroundColor: 'gray',
  },
  input: {
    paddingVertical: 4,
    borderRadius: 8,
    width: 332,
    padding: 16,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: '#FFFFFE',
    fontSize: 16,
    height: 50
  },
  nameRating: {
    marginLeft: 15,
    flexDirection: 'column',
  },
  nameperfil: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNum: {
    fontWeight: 'bold',
  },
  modeloveiculo: {
    alignItems: 'flex-end',
  },
  modelText: {
    fontSize: 20,
    fontStyle: 'italic',
    marginRight: 2,

  },
  confirm: {
    alignItems: 'center',
    width: 303,
    height: 44,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#FF0870",
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    width: 303,
    fontWeight: 'bold',
  },
  image: {
    marginTop: -20,
    marginBottom: -10,
    marginLeft: -20,
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
});

export default SetMotorista;
