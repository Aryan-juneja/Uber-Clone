import { View, Image, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setDestination } from '@/src/redux/navSlice';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native';
import Navfavourites from '../../src/components/Navfavourites';

const Screen_One = () => {
  const mapboxToken = 'pk.eyJ1IjoiYXJ5YW4zMTQiLCJhIjoiY20xNHRhYjh5MDFwdTJqc2I1c2Q5YTBnOCJ9.FbY09eoqp41ale6M5W17Ig';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [bool, setBool] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async (text) => {
    setSearchTerm(text);

    if (text.length > 2) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${mapboxToken}`
        );
        setSearchResults(response.data.features);
        setBool(true);
      } catch (error) {
        console.error('Error fetching search results:', error.message);
      }
    } else {
      setSearchResults([]);
      setBool(false);
    }
  };

  const handleSet = (item) => {
    setSearchTerm(item.place_name);
    dispatch(setDestination({
      lat: item.geometry.coordinates[1],
      lon: item.geometry.coordinates[0],
    }));
    setBool(false);
    setSearchResults([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSet(item)}>
      <Text style={styles.itemText}>
        {item.place_name}
      </Text>
    </TouchableOpacity>
  );

  const clearField = () => {
    setSearchTerm('');
    setSearchResults([]);
    setBool(false);
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Hey, Traveller</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Where?"
            value={searchTerm}
            onChangeText={handleSearch}
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <Icon name="cancel" size={30} color="gray" onPress={clearField} />
        </View>

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            style={styles.list}
          />
        )}

        <Navfavourites />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Screen_Two')}>
            <Icon name='car' type='font-awesome' color={'white'} size={16} />
            <Text style={styles.buttonText}>Get Ride</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Screen_One;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  list: {
    flex: 1,
    marginTop: 2,
    backgroundColor: 'white',
  },
  itemText: {
    padding: 10,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});
