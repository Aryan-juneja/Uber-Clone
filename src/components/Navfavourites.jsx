import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';

const data = [
  {
    id: 1,
    title: "Home",
    address: 'X-26 Naveen Shahdara Road, New Delhi, India',
    Icon: "home",
  },
  {
    id: 2,
    title: "Work",
    address: 'G-132 New Seelampur, New Delhi, India',
    Icon: "bag",
  },
];

const Navfavourites = () => {
  return (
    <View className="bg-white flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center p-5">
            <Icon
              name={item.Icon}
              color="white"
              size={18}
              type="ionicon"
              className="mr-4 rounded-full bg-gray-300 p-3"
            />
            <View>
              <Text className="text-lg font-semibold">{item.title}</Text>
              <Text className="text-gray-500">{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Navfavourites;
