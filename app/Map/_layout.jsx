import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import MapScreen from './Mapscreen';  // Import the MapScreen component

const MapLayout = () => {
  return (
    <View style={styles.container}>
      {/* MapScreen will take the top half */}
      <View style={styles.mapContainer}>
        <MapScreen />
      </View>

      {/* Bottom half will change based on navigation */}
      <View style={styles.bottomContainer}>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Screen_One" />
          <Stack.Screen name="Screen_Two" />
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1, // Adjust this as needed
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MapLayout;
