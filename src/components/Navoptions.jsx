import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useNavigation, useRouter } from 'expo-router';

const data = [
  {
    id: 1,
    title: "Get a Ride",
    image: require('../../assets/fonts/carIcon.png'),
    page: "Mapscreen",
  },
  {
    id: 2,
    title: "Order Food",
    image: require('../../assets/fonts/three.jpg'),
    page: "Eatscreen",
  },
];

const Navoptions = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const nav = useSelector((state) => state.nav);

  return (
    <FlatList
      className="flex-1"
      data={data}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!nav.source}
          className={`m-4 ${nav.source ? "" : "opacity-80"} bg-black h-[250] rounded-lg justify-center`}
          onPress={() => router.push("/Map/Screen_One")}
        >
          <Image source={item.image} className="w-40 h-40" resizeMode="contain" />
          <Text className="text-white font-semibold text-xl text-center mt-2">
            {item.title}
          </Text>
          <Icon
            name="arrowright"
            color="black"
            type="antdesign"
            className="h-10 w-10 mt-2 p-2 rounded-full bg-white mx-auto"
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default Navoptions;
