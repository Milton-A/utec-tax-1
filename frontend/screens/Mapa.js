import React, { useRef, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from "react-native-maps-directions";
import { Menu } from '.././components/Menu';
import { Hamburger } from '../components/Hamburger';
import { GOOGLE_API_KEY } from '../enviroments';
import * as Location from 'expo-location';
import { AuthContext } from '../contexts/authProvider';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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

const Mapa = () => {
  const navigation = useNavigation();
  const { signIn, IP,
    destination, setDestination,
    origin, setOrigin,
    destinationCoordinates, setDestinationCoordinates,
    originCoordinates, setOriginCoordinates,
  } = useContext(AuthContext);
  const [showDirections, setShowDirections] = useState(false);
  const [isDestinationSelected, setIsDestinationSelected] = useState(false);

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);


  const mapRef = useRef(null);

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

        setOrigin({ latitude, longitude });
        setOriginCoordinates(`Origem: ${latitude}, ${longitude}`);
        mapRef.current.animateCamera({ center: { latitude, longitude } }, { duration: 1000 });
      } catch (error) {
        console.error('Erro ao obter a localização atual:', error);
      }
    };

    getCurrentLocation();
  }, []);

  const moveTo = async (position) => {
    const camera = await mapRef.current.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      const distance = calculateDistance(origin, destination);
      setDistance(args.distance);
      setDuration(args.duration);
    }
  }

  function calculateDistance(origin, destination) {
    const x1 = origin.latitude;
    const y1 = origin.longitude;
    const x2 = destination.latitude;
    const y2 = destination.longitude;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance;
  }


  useEffect(() => {
    const traceRoute = () => {
      if (origin && destination && isDestinationSelected) {
        setShowDirections(true);
        mapRef.current.fitToCoordinates([origin, destination], { edgePadding });
        setOriginCoordinates(`Origem: ${origin.latitude}, ${origin.longitude}`);
        setDestinationCoordinates(`Destino: ${destination.latitude}, ${destination.longitude}`);
      }
    };
  
    traceRoute();
  }, [origin, destination, isDestinationSelected]);
  

  const handleMarcarDestino = () => {
    if (destination) {
      navigation.navigate('SetVeiculo');
    } else {
      Alert.alert('Destino não definido', 'Por favor, selecione um destino antes de marcar.');
    }
  };

  const onPlaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    if (flag === "Destination") {
      set(position);
      setDestinationCoordinates(position);
      setIsDestinationSelected(true);
    } else {
      set(position);
      setIsDestinationSelected(false);
    }
    mapRef.current.animateCamera({ center: position }, { duration: 10 });
  };

  return (
    <View style={styles.container}>
      <Hamburger />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...origin,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={styles.map}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor='#FF0870'
            strokeWidth={5}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
      <InputAutocomplete
          label="Insira a Origem"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        <InputAutocomplete
          label="Insira o destino"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "Destination");
          }}
        />
        <TouchableOpacity style={styles.buttonRoute} onPress={handleMarcarDestino}>
          <Text style={styles.buttonTextRoute}>Marcar Viagem</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

export default Mapa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  menu: {
    position: 'absolute',
    bottom: '50%',
    zIndex: 1,
  },
  box: {
    backgroundColor: '#d1d1d1',
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  input: {
    paddingVertical: 16,
    borderRadius: 8,
    width: 332,
    padding: 16,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 2,
    backgroundColor: '#FFFFFE',
    fontSize: 16,
  },
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
