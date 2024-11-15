import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { router, useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import {setDestination} from '../../src/redux/navSlice'
const dat = [
  {
    id: 1,
    title: "Uber X",
    image: require('../../assets/fonts/uberselect.png'),
    desc: "Affordable rides, all to yourself",
    multiplier: 1,
  },
  {
    id: 2,
    title: "Black",
    image: require('../../assets/fonts/uberblack.png'),
    desc: "Luxury rides with professional drivers",
    multiplier: 1.5,
  },
  {
    id: 3,
    title: "Black SUV",
    image: require('../../assets/fonts/ubersuv.png'),
    desc: "Luxury rides for 6 with pro drivers",
    multiplier: 1.75,
  }
];

const Screen_Two = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const distance=useSelector((state)=>state.nav.distance)
  const Distance=(distance?.distance / 1000).toFixed(2) || '';
  const durationMinutes = Math.floor(distance?.duration / 60);
  const minutes = durationMinutes % 60;
  const hours = Math.floor(durationMinutes / 60);
  const duration = `${hours}h ${minutes}m` || '';
  const price =(Distance*11).toFixed(1)
    // console.log(distance)
  const handlePress=()=>{
    // console.log("object")
    // dispatch(setDestination(0))
    navigation.navigate('Screen_One')

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} className='rounded-full bg-black p-[0.25]' onPress={() => handlePress()}>
          <Icon name='arrow-back-sharp' type='ionicon' size={30} color='white' />
        </TouchableOpacity>
        <View className='space-y-2'>
        <Text style={styles.headerText}>Select a Ride-{Distance} km </Text>
        <Text style={styles.headerText}>Total Time-{duration}</Text>
        </View>
        <FlatList
          data={dat}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                selected?.id === item.id ? styles.selectedItem : {},
              ]}
              onPress={() => setSelected(item)}
            >
              <Image source={item.image} style={styles.image} resizeMode="contain" />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{price * item.multiplier}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={[styles.chooseButton, selected ? {} : styles.disabledButton]}
          disabled={!selected}
        >
          <Text style={styles.chooseButtonText}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Screen_Two;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    position: 'relative',
    padding: 12,
  },
  backButton: {
    position: 'absolute',
    top: 4,
    left: 14,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#ccc',
    marginVertical: 2,
  },
  itemContainer: {
    margin:5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 100,
    height: 100,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chooseButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
};
