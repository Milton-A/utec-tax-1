import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/authProvider';
import axios from 'axios';

export const OpAvaliar1 = ({ onAvaliar, onCancelar }) => {
  const navigation = useNavigation();
  const [pontuacao, setPontuacao] = useState("");
  const [data, setData] = useState();
  const [descricao, setDescricao] = useState("");
  const { userName, driver, IP } = useContext(AuthContext);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedOpe, setSelectedOpe] = useState(false);

  const formData = {
    'id_motorista': driver.idMotorista,
    'pontuacao': pontuacao,
    'descricao': "pontuacao",
    'data_classificacao': data
  }
  const pegarData = () => {
    const dataAtual = new Date('2023-07-19')
    return dataAtual;
  }
  const handleModelPress = (model) => {
    setSelectedOpe(true)
    setSelectedModel(model);
    setPontuacao(model);
    setData(pegarData);
  };

  const handleAvaliar = () => {
    console.log(IP)
    if (selectedOpe) {
      axios.post(IP + '/classificacao/', formData)
        .then(response => {
          Alert.alert('Classificação realizada com sucesso!');
          navigation.navigate('Mapa');
        })
        .catch(error => {
          console.error('Erro ao realizar Classificar:', formData);
        });
    }else{
      Alert.alert('Selecione uma opção!');
    }
  }

  const getModelStyle = (model) => {
    if (model === selectedModel) {
      return [styles.model, styles.modelSelected, styles.modelStyleSelected];
    }
    return styles.model;
  };

  const getModelTextStyle = (model) => {
    if (model === selectedModel) {
      return [styles.modelText, styles.modelTextStyleSelected];
    }
    return styles.modelText;
  };

  return (
    <View style={styles.container}>
      <View style={styles.perfil}>
        <View style={styles.perfilInfo}>
          <View style={styles.fotoperfil}></View>
          <View style={styles.nameRating}>
            <Text style={styles.nameperfil}>{userName.nome}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.modelblocks}>
          <TouchableHighlight
            style={getModelStyle(0)}
            onPress={() => handleModelPress(0)}
            underlayColor="#FF0870"
          >
            <Text style={getModelTextStyle(0)}>0%</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={getModelStyle(25)}
            onPress={() => handleModelPress(25)}
            underlayColor="#FF0870"
          >
            <Text style={getModelTextStyle(25)}>25%</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={getModelStyle(50)}
            onPress={() => handleModelPress(50)}
            underlayColor="#FF0870"
          >
            <Text style={getModelTextStyle(50)}>50%</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={getModelStyle(75)}
            onPress={() => handleModelPress(75)}
            underlayColor="#FF0870"
          >
            <Text style={getModelTextStyle(75)}>75%</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={getModelStyle(100)}
            onPress={() => handleModelPress(100)}
            underlayColor="#FF0870"
          >
            <Text style={getModelTextStyle(100)}>100%</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View>
        <TextInput style={styles.input} placeholder='Mensagem...' />
      </View>
      <TouchableOpacity style={styles.avaliar} onPress={handleAvaliar}>
        <Text style={styles.buttonText}>Avaliar</Text>
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
    height: '60%',
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
  input: {
    width: 303,
    height: 100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: '#FF0870',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
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
    marginTop: 10,
  },
  modelblocks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 303,
  },
  model: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#001',
    shadowOpacity: 0.1,
  },
  modelSelected: {
    backgroundColor: '#FF0870',
  },
  modelTextStyleSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fotoperfil: {
    width: 80,
    height: 80,
    borderRadius: 750,
    backgroundColor: 'gray',
  },
  nameRating: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  nameperfil: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modelText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginRight: 2,
  },
  avaliar: {
    alignItems: 'center',
    width: 303,
    height: 44,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FF0870',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    width: 303,
    fontWeight: 'bold',
  },
});

export default OpAvaliar1;
