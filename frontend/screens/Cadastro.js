import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import { AuthContext } from '../contexts/authProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';
import * as Location from 'expo-location';

export default function CadastroForm({ navigation }) {
  const [service, setService] = React.useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date('2012-12-12'));
  const [morada, setMorada] = useState("");
  const [precoBaseKm, setPrecoBaseKm] = useState(0);
  const [velocidadeMediaKm, setVelocidadeMediaKm] = useState(0);
  const [tipoVeiculo, setTipoVeiculo] = useState("");


  const { IP,
    posVeiculo, setPosVeiculo,
  } = useContext(AuthContext);

  const [isDriver, setIsDriver] = useState(false); // Track user's selection
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCadastro = () => {
    const vehicleData = {
      preco_base_km: parseFloat(precoBaseKm), // Converter para número de ponto flutuante
      velocidade_media_km: parseFloat(velocidadeMediaKm), // Converter para número de ponto flutuante
      tipo_veiculo: tipoVeiculo === "" ? null : tipoVeiculo, // Se vazio, definir como nulo; caso contrário, usar o valor selecionado
      coordenadas_origem_x: posVeiculo.latitude, 
      coordenadas_origem_y: posVeiculo.longitude, 
    };
    const formData = {
      nome: nome,
      email: email,
      password: password,
      data_nascimento: dataNascimento,
      morada: morada,
      veiculo: vehicleData,
    };

    const url = isDriver ? IP + '/motorista/' : IP + '/cliente/';

    axios.post(url, formData)
      .then(response => {
        if (response.data === true) {
          Alert.alert('Cadastro realizado com sucesso!');
          setIsModalVisible(false);
          navigation.navigate('Login');
        } else {
          Alert.alert('O e-mail já está sendo usado!');
        }
      })
      .catch(error => {
        console.error('Erro ao realizar cadastro:', error);
      });

  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleVehicleDataChange = (key, value) => {
    setVehicleData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert('Permissão de localização não concedida');
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;

        setPosVeiculo({ latitude, longitude });
      } catch (error) {
        console.error('Erro ao obter a localização atual:', error);
      }
    };

    getCurrentLocation();
  }, []);

  const countries = ["Carros Ligeiros", "Carrinhas de 9 lugares", "Moto"];

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={20}>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.selectionButtons}>
        <TouchableOpacity
          style={[styles.selectionButton, isDriver ? styles.activeButton : null]}
          onPress={() => setIsDriver(false)}
        >
          <Text style={styles.buttonText}>Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectionButton, isDriver ? null : styles.activeButton]}
          onPress={() => {
            setIsDriver(true);
          }}
        >
          <Text style={styles.buttonText}>Motorista</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          onChangeText={(text) => setNome(text)}
        />
      </View>
      <View>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View>
        <Text style={styles.label}>Morada</Text>
        <TextInput
          style={styles.input}
          placeholder="Luanda/Kilamba/bloco A"
          onChangeText={(text) => setMorada(text)}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Data de Nascimento:</Text>
        <DatePicker
          style={styles.datePicker}
          date={dataNascimento}
          mode="date"
          useNativeDriver="false"
          placeholder="Selecione uma data"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate="2023-12-31"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              display: 'none',
            },
            dateInput: {
              borderWidth: 'none',
              alignItems: 'end',
              paddingLeft: 20
            },
          }}
          onDateChange={date => {
            setDataNascimento(date);
          }}
        />
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButtonContainer} onPress={closeModal}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Dados do Veiculo</Text>
          <View>
            <Text style={styles.label}>Tipo:</Text>
            <SelectDropdown
              buttonStyle={styles.input}
              dropdownStyle={styles.inputSelect}
              className="custom-select-dropdown" // Add a custom CSS class
              defaultButtonText="Selecione o Tipo"
              data={countries}
              onSelect={(selectedItem) => {
                setTipoVeiculo(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>Velocidade Média:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a velocidade Média"
              keyboardType="numeric" // Define o teclado como numérico
              onChangeText={text => setVelocidadeMediaKm(text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Preço Base:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o Preço Base"
              keyboardType="numeric" // Define o teclado como numérico
              onChangeText={text => setPrecoBaseKm(text)}
            />
          </View>
          <TouchableOpacity style={styles.registrar} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {isDriver ?
        <TouchableOpacity style={styles.registrar} onPress={openModal}>
          <Text style={styles.buttonText}>Proximo</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.registrar} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>}
    </KeyboardAwareScrollView>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 1,
    backgroundColor: "black",
    width: 80,
    height: 20,
    borderRadius: 8
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  registrar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0870',
    paddingVertical: 16,
    borderRadius: 8,
    fontWeight: 'bold',
    width: 332,
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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
  inputSelect: {
    paddingVertical: 4,
    borderRadius: 8,
    width: 332,
    padding: 16,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: '#FFFFFE',
    fontSize: 16,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  datePicker: {
    width: 303,
    height: 44,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#D5DDE0',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    marginBottom: 20,
  },
  selectionButtons: {
    flexDirection: 'row',
    marginBottom: 5
  },
  selectionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F7F8F9',
    borderColor: '#D5DDE0',
    borderWidth: 1,
  },
  activeButton: {
    backgroundColor: '#FF0870',
    borderColor: '#FF0870',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
};
