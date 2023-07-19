


const SearchRoute = () => {

    return (
        <View style={styles.searchContainer}>
            <InputAutocomplete
                label="Origem"
                onPlaceSelected={(details) => {
                    onPlaceSelected(details, "origin");
                }}
            />
            <InputAutocomplete
                label="Destino"
                onPlaceSelected={(details) => {
                    onPlaceSelected(details, "Destination");
                }}
            />
            <TouchableOpacity style={styles.buttonRoute} onPress={traceRoute}>
                <Text style={styles.buttonTextRoute}>Marcar Destino</Text>
            </TouchableOpacity>
            <Text style={styles.coordinatesText}>{originCoordinates}</Text>
            <Text style={styles.coordinatesText}>{destinationCoordinates}</Text>
        </View>
    );
}

export default SearchRoute;

const styles = StyleSheet.create({
    
  searchContainer: {
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
  
  buttonRoute: {
    backgroundColor: '#FF0870',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonTextRoute: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  coordinatesText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },

});