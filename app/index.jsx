import { View, Image, FlatList, TouchableOpacity, Text, TextInput ,SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import Navoptions from '../src/components/Navoptions';
import Navfavourites from '../src/components/Navfavourites';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '@/src/redux/navSlice';
import axios from 'axios';

const Index = () => {
  const mapboxToken = 'pk.eyJ1IjoiYXJ5YW4zMTQiLCJhIjoiY20xNHRhYjh5MDFwdTJqc2I1c2Q5YTBnOCJ9.FbY09eoqp41ale6M5W17Ig';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = async (text) => {
    setSearchTerm(text);

    if (text.length > 2) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${mapboxToken}`
        );
        setSearchResults(response.data.features);
      } catch (error) {
        console.error('Error fetching search results:', error.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSet = (item) => {
    setSearchTerm(item.place_name);
    dispatch(setOrigin({
      lat: item.geometry.coordinates[1],
      lon: item.geometry.coordinates[0],
    }));
    dispatch(setDestination(0));
    setSearchResults([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSet(item)} className="px-4 py-2 text-base">
      <Text>{item.place_name}</Text>
    </TouchableOpacity>
  );

  const clearField = () => {
    setSearchTerm('');
    setSearchResults([]);
    dispatch(setOrigin(0));
  };

  const renderSeparator = () => (
    <View className="h-px bg-gray-300 my-1" />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="ml-2">
        <Image
          source={{
            uri: "https://imgs.search.brave.com/8zg5DO_fhjOY8kGvQqMgKjzUI6q1tRN8HckKYTDo_Kc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA5/L1ViZXItbG9nby01/MDB4Mjk0LmpwZw",
          }}
          className="w-24 h-24"
          resizeMode="contain"
        />
      </View>

      <View className="flex-row items-center p-2 mx-2 rounded-lg border border-gray-300 bg-white">
        <TextInput
          placeholder="Your Location"
          value={searchTerm}
          onChangeText={handleSearch}
          className="flex-1 text-base text-black"
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
          className="flex-1 mt-1 bg-white"
        />
      )}

      <Navoptions />
      <Navfavourites />
    </SafeAreaView>
  );
};

export default Index;
