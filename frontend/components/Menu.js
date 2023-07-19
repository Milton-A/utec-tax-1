import { Text, View, StyleSheet, TouchableOpacity,Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation } from '@react-navigation/native';

export const Menu = () => {
    const navigation= useNavigation();
    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '80%', marginTop: -40}}>
            <TouchableOpacity style={styles.destination}>
                <View style={styles.where}>
                    <Text style={{fontWeight: 600, fontSize: 16, marginLeft: 20}}>Para onde?</Text>
                </View>
                <Ionicons name='arrow-forward-outline' width={50} color={'#000'}/>
            </TouchableOpacity>
            <View style={styles.blocks}>

                    <TouchableOpacity 
                    style={styles.block} 
                    onPress={()=>navigation.navigate('Historico')}>
                        <Text style={styles.blockText1}>Histórico</Text>
                        <Text style={styles.blockText2}>18 min</Text>
                        <Text>
                            <Ionicons name='pin-outline' width={50} color={'#000'}/>
                        </Text>
                    

                    </TouchableOpacity>
                <TouchableOpacity style={styles.block} >
                    <Text style={styles.blockText1}>Viagem</Text>
                    <Text>15 min</Text>
                    <Text>
                        <Ionicons name='pin-outline' width={50} color={'#000'}/>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.block} onPress={()=>navigation.navigate('Avaliar')}>
                    <Text style={styles.blockText1}>Marginal</Text>
                    <Text>40 min</Text>
                    <Text>
                        <Ionicons name='pin-outline' width={50} color={'#000'}/>
                    </Text>
                </TouchableOpacity>
            </View>

            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'space-around',
       alignItems: 'center',
       width: '100%',
       height: '30%',
       bottom: 0,
       position: 'absolute',
       zIndex: 1,
       borderTopLeftRadius: 30,
       borderTopRightRadius: 30,
       borderRadius: 10,
       shadowColor: '#000',
       shadowOpacity: 0.025,
       backgroundColor: '#fff'
    },
    destination: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#EEEEEE',
        height: 50,
    },
    where: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    blocks: {
        width: '90%',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
        
    },
    block: {
        height: '80%',
        width: '30%',
        backgroundColor: '#eee',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blockText1: {
        fontSize: 16,
        fontWeight: 600
    },
})