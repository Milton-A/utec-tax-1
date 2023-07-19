import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TouchableHighlight, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../enviroments';
import axios from 'axios';
import Images from '../assets/image/1.png';
import { AuthContext } from '../contexts/authProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export const AvaliacaoMenu = ({ onAvaliar, onCancelar }) => {
  const navigation = useNavigation();
  const [veiculos, setVeiculos] = useState([]);
  //Variaveis Globais
  const {
    origin,
    getDriver,
    IP,
    setShowDestinationInfo
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

  const calcularDist = (res) => {
    const obj = [];
    const shuffledArray = shuffle(res);
    const selectedVeiculos = shuffledArray.slice(0, 3);

    selectedVeiculos.forEach(element => {
      const x = element.coordenadas_origem_x;
      const y = element.coordenadas_origem_y;
      const xu = origin.latitude;
      const yu = origin.longitude;

      const distancia = Math.sqrt(Math.pow(x - y, 2) + Math.pow(xu - yu, 2));
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
      obj.push({ veiculo: element, tempo: tempo, valor: preco, tipo });
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

  const handleModelPress = (id) => {
    navigation.navigate('SetMotorista');
    getDriver(id);
  };
  function InputAutocomplete({
    label,
    placeholder,
    onPlaceSelected,
  }) {
    return (
      <>
        <Text>{label}</Text>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder={placeholder || ""}
          fetchDetails
          onPress={(data, details = null) => {
            onPlaceSelected(details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "pt-BR",
          }}
        />
      </>
    );
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={20}>
      <View style={styles.searchContainer} >
        <InputAutocomplete
          label="Destino"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "Destination");
          }}
        />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.modelblocks}
        showsHorizontalScrollIndicator={false}
      >
        {Array.isArray(veiculos) && veiculos.map((veiculo, index) => (
          <TouchableHighlight
            key={index}
            style={styles.model}
            onPress={() => {
              handleModelPress(veiculo.veiculo.id_motorista);
            }}
            underlayColor="#7EAB3A"
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
        ))}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 40,
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
  avaliar: {
    alignItems: 'center',
    width: 303,
    height: 44,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#7EAB3A',
    marginBottom: 40,
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
  input: {
    paddingVertical: 10,
    borderRadius: 8,
    width: 320,
    padding: 10,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: '#FFFFFE',
    fontSize: 16,
  }
});
