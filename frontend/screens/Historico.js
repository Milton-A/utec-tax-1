import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import CardHistorico from '../components/CardHistorico';

import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';

const Historico = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Feather
                        name='arrow-left'
                        size={32}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Histórico</Text>

                <View style={{ width: 32 }} />
            </View>

            <CardHistorico />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        marginBottom: 8
    },
    title: {
        fontSize: 22,
        fontWeight: '600'
    }
});

export default Historico;
