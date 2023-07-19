import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { AuthContext } from '../contexts/authProvider';

import { Ionicons } from '@expo/vector-icons';

const Pedido = () => {
   
    const { IP, motorista, usuario, estadoMotorista, setEstadoMotorista, viagem } = useContext(AuthContext);

    const handleConfirm = () => {
        setEstadoMotorista(true)
        console.log(estadoMotorista)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.clientInfo}>
                    <View style={styles.avatar}></View>
                    <View>
                        <Text style={styles.name}>User</Text>
                        <View style={styles.time}>
                            <Ionicons
                                name='time-outline'
                                size={18}
                                color='#FF0870'
                            />
                            <Text style={{ marginLeft: 2 }}>15 min</Text>
                        </View>
                    </View>
                </View>

                <View

                >
                    <Text style={styles.price}>{viagem.custoReal} Kz</Text>
                    <Text style={styles.distance}>{viagem.tempoReal} min</Text>
                </View>
            </View>

            <View
                style={{
                    marginVertical: 16
                }}
            >
                <Text style={styles.location}>De: Talatona,</Text>
                <Text style={styles.location}>Para: Benfica, Kifica</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity style={styles.buttonAccept} onPress={handleConfirm}>
                    <Ionicons
                        name='checkmark'
                        size={32}
                        color='#FFF'
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDecline}>
                    <Ionicons
                        name='trash'
                        size={30}
                        color='#FF0870'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Pedido;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#BBB',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#BBB',
        paddingBottom: 20
    },
    clientInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 56,
        backgroundColor: 'gray',
        // marginBottom: 16
    },
    name: {
        fontSize: 18,
        marginLeft: 8,
        marginBottom: 4
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'right',
        marginBottom: 4
    },
    distance: {
        textAlign: 'right',
        fontSize: 16,
    },
    buttonAccept: {
        width: '48%',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#FF0870',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDecline: {
        width: '48%',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1.25,
        borderColor: '#FF0870',
        justifyContent: 'center',
        alignItems: 'center'
    },
    location: {
        fontSize: 18,
        marginTop: 8
    }
})