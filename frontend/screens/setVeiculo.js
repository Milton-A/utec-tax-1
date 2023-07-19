import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Images from '../assets/image/1.png';
import { AuthContext } from '../contexts/authProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

console.disableYellowBox = true;

export const SetVeiculo = () => {
  const navigation = useNavigation();
  const [veiculos, setVeiculos] = useState([]);
  const [tempoVeiculo, setTempoVeiculo] = useState({ tempo: 0 });
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const {
    origin,
    destination,
    originCoordinates,
    getDriver,
    IP,
    veiculoId, getVeiculoId,
    viagem, getViagem,
    ajuste, setAjuste,
  } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      axios.get(IP + '/veiculo').then((res) => {
        calcularDist(res.data);
      }).catch((e) => {
        console.log(e.message);
      })

    })();
  }, []);

  function calcularDistancia(x, y, xu, yu) {
    return Math.sqrt(Math.pow(x - y, 2) + Math.pow(xu - yu, 2));
  };
  const calcularDist = (res) => {
    const obj = [];

    const shuffledArray = shuffle(res);
    const selectedVeiculos = shuffledArray.slice(0, 3);

    selectedVeiculos.forEach(element => {
      const x = destination.latitude;
      const y = destination.longitude;
      const xu = origin.latitude;
      const yu = origin.longitude;

      const distancia = calcularDistancia(x, y, xu, yu);
      const preco = Math.floor(element.preco_base_km * distancia);
      const tempo = (distancia / element.velocidade_media_km).toFixed(2);
      let tipo;
      if (preco <= 1103) {
        tipo = "Econômico";
      } else if (preco <= 2103) {
        tipo = "Conforte";

      } else {
        tipo = "Rápido";
      }
      obj.push({ veiculo: element, tempo: tempo, valor: preco, tipo, vm: element.velocidade_media_km, fiabilidade: element.factor_fiabilidade, precoBase: element.preco_base_km });
    });
    setVeiculos(obj);
  };

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  function calculaTempoReal(fiabilidade, tempoEstimado) {
    const tempoReal = tempoEstimado * (fiabilidade / 100);
    const differencePercent = Math.abs((tempoReal - tempoEstimado) / tempoEstimado) * 100;
    if (differencePercent > 25) {
      return false;
    } else {
      const adjustedPrice = (tempoReal / tempoEstimado);
      return adjustedPrice;
    }
  }

  function handleModelPress(veiculo) {
    const d = Math.ceil(calcularDistancia(veiculo.veiculo.coordenadas_origem_x, veiculo.veiculo.coordenadas_origem_y, origin.latitude, origin.longitude) * 10);
    const tempoChegada = (d / veiculo.vm).toFixed(2);

    const tempoEstimado = veiculo.tempo;
    const fiabilidade = veiculo.fiabilidade;
    const tempoReal = calculaTempoReal(fiabilidade, tempoEstimado);

    const precoReal = veiculo.precoBase * tempoReal;

    if (tempoReal !== false) {
      getViagem(tempoEstimado, tempoReal, veiculo.valor,precoReal );
      setAjuste(false);
    }else{
      getViagem(tempoEstimado, tempoEstimado, veiculo.valor, veiculo.valor);
      setAjuste(true);
    }

    setTempoVeiculo({ tempo: tempoChegada });
    getDriver(veiculo.veiculo.id_motorista);
    getVeiculoId(veiculo.veiculo.id_veiculo);
    setSelectedVeiculo(veiculo);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={20}>
      <Text style={styles.modelTextDist}>Tempo de chegada: {tempoVeiculo.tempo} min</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.modelblocks}
        showsHorizontalScrollIndicator={false}
      >
        {Array.isArray(veiculos) && veiculos.map((veiculo, index) => (
          <View style={
            styles.model
          }>
            <TouchableHighlight
              key={index}
              style={
                selectedVeiculo === veiculo && styles.selectedModel
              }
              onPress={() => {
                handleModelPress(veiculo);
              }}
              underlayColor="#FF0870"
            >
              <View style={styles.modelOp}>
                <Image style={styles.image} source={Images} />
                <View style={styles.modelOp2}>
                  <Text style={styles.modelText}>{veiculo.tipo} </Text>
                  <Text style={styles.modelText}>{veiculo.tempo} min</Text>
                  <Text style={styles.preco}>{veiculo.valor} kz</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.buttonRoute} onPress={() => { navigation.navigate('SetMotorista') }}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    bottom: 0,
    position: 'absolute',
    zIndex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.025,
    backgroundColor: '#fff',
    height: 320
  },
  selectedModel: {
    borderWidth: 2,
    borderColor: "#FF0870",
    backgroundColor: "#FF0870",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 95,
    height: 95,
    borderRadius: 6,
  },
  modelblocks: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelOp: {
    justifyContent: 'space-between',
  },
  modelOp2: {
    marginLeft: -10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  model: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ececec82',
    justifyContent: 'center',
    marginRight: 10,
    width: 95,
    height: 95,
    borderRadius: 6,
  },
  modelText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    width: 303,
    fontWeight: 'bold',
  },
  preco: {
    fontWeight: '500',
  },
  image: {
    marginTop: -20,
    marginBottom: -10,
    marginLeft: -20,
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  buttonRoute: {
    backgroundColor: '#FF0870',
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 50
  },
  modelTextDist: {
    marginTop: 30,
    fontWeight: '500',
    fontSize: 18
  }
});

export default SetVeiculo;