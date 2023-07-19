import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Pedido from '../components/Pedido';
import { AuthContext } from '../contexts/authProvider';
import axios from 'axios'; // Importe o módulo axios

const Dashboard = () => {
  const { IP, motorista, usuario, estadoMotorista, setEstadoMotorista } = useContext(AuthContext);
  const [totalViagem, setTotalViagem] = useState({ total: 0 }); // Correção: desestruture o array retornado por useState

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(IP + '/viagem/totalMotorista/' + motorista.id_motorista);
        setTotalViagem({ total: response.data });
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.avatar}></View>
        <View>
          <Text style={styles.hello}>Bem-vindo</Text>
          <Text style={styles.name}>{usuario.nome}</Text>
        </View>
      </View>
      <View style={styles.cardGroup}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>10.000$</Text>
          <Text style={styles.cardSubtitle}>Meus ganhos</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>{totalViagem.total}</Text>
          <Text style={styles.cardSubtitle}>Minhas corridas</Text>
        </View>
      </View>

      <Text style={styles.request}>Pedidos</Text>

      {!estadoMotorista && <Pedido />}
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 32,
        marginBottom: 24
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 56,
        backgroundColor: 'gray'
    },
    hello: {
        fontSize: 18,
        marginLeft: 8
    },
    name: {
        fontSize: 18,
        marginLeft: 8,
        fontWeight: '600'
    },
    cardGroup: {
        // borderWidth: 1,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24
    },
    card: {
        width: '48%',
        height: 104,
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        borderColor: '#BBB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    cardNumber: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 4
    },
    cardSubtitle: {
        fontSize: 16,
        fontWeight: '500'
    },
    request: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 16,
        marginBottom: 16
    },
})