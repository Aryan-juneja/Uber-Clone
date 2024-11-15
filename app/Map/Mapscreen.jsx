import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { distanceBtwThem } from '../../src/redux/navSlice';
import { Icon } from 'react-native-elements';

const MapScreen = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const origin = useSelector((state) => state.nav.source);
  const destination = useSelector((state) => state.nav.destination);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const accessToken = 'pk.eyJ1IjoiYXJ5YW4zMTQiLCJhIjoiY20xNHRhYjh5MDFwdTJqc2I1c2Q5YTBnOCJ9.FbY09eoqp41ale6M5W17Ig';

  const fetchRoute = async (startCoords, endCoords) => {
    if (!startCoords || !endCoords) {
      console.error('Invalid coordinates:', startCoords, endCoords);
      return [];
    }
    
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?geometries=geojson&access_token=${accessToken}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates;
      } else {
        console.error('No routes found in response:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      return [];
    }
  };

  const fetchData = async () => {
    const url2 = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin?.lon},${origin?.lat};${destination?.lon},${destination?.lat}?geometries=geojson&access_token=${accessToken}`;
    try {
      const response = await fetch(url2);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        // console.log(data.routes[0]);
        return { duration: data.routes[0].duration, distance: data.routes[0].distance };
      } else {
        console.error('No routes found in response:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      return [];
    }
  };

  useEffect(() => {
    if (!origin) {
      console.error('Origin is missing');
      navigation.navigate('index');
      return;
    }
    if (origin && destination) {
      const startCoords = origin;
      const endCoords = destination;
      if (!startCoords || !endCoords) {
        // console.log('Redirecting to /index');
        navigation.navigate('Screen_One');
        return;
      }
  
      const getRoute = async () => {
        // console.log('Fetching route...');
        const route = await fetchRoute(startCoords, endCoords);
        const coordinates = route.map(coord => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        const calculationData = await fetchData();
        // console.log("calculationData", calculationData);
        setRouteCoordinates(coordinates);
        dispatch(distanceBtwThem(calculationData));
        setTimeout(() => {
          if (mapRef.current && coordinates.length > 0) {
            mapRef.current.fitToCoordinates(coordinates, {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true,
            });
          }
        }, 100);
      };
  
      getRoute();
    }
  }, [origin, destination]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity style={{
          position: 'absolute',
          top: 60,
          left: 20,
          zIndex: 50
        }} onPress={()=>navigation.navigate('index')}>
      <Icon
        name='caret-back-outline'
        type='ionicon'
        color='black'
        size={40}
        
      />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          mapType='mutedStandard'
          style={{ flex: 1 }}
          initialRegion={{
            latitude: origin?.lat || 0,
            longitude: origin?.lon || 0,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {origin && destination ? (
            <>
              <Marker
                coordinate={{ latitude: origin.lat, longitude: origin.lon }}
                title='Source'
                description='From Your Location'
                pinColor='green'
              />
              <Marker
                coordinate={{ latitude: destination.lat, longitude: destination.lon }}
                title='Destination'
                description='Your Desired Location'
                pinColor='red'
              />
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#000"
                strokeWidth={3}
              />
            </>
          ) : (
            <Marker
              coordinate={{ latitude: origin.lat, longitude: origin.lon }}
              title='Source'
              description='Your Location'
              pinColor='Gray'
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;
