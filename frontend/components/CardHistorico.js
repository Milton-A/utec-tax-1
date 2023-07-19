import { View, Text, StyleSheet } from 'react-native';

const CardHistorico = () => {
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.left}>De: X, Y</Text>
                <Text style={styles.left}>Para: X, Y</Text>
            </View>

            <View>
                <Text style={[styles.right,{fontWeight:'700'}]}>7.000 Kz</Text>
                <Text style={styles.right}>Confirmado</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        marginHorizontal: 24,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        marginTop: 16
    },
    left: {
        fontSize: 18,
        marginVertical: 8
    },
    right: {
        fontSize: 18,
        marginVertical: 8,
        textAlign: 'right'
    }
})

export default CardHistorico;