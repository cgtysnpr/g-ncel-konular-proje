import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import data from './data';
import {List, Button} from 'react-native-paper';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ListData = props => {
  const [newSelected, setNewSelected] = useState([]);
  const getData = async () => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem('data');
      if (data !== null) {
        setNewSelected(JSON.parse(data));
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleNewSelection = id => {
    if (newSelected.includes(id)) {
      let index = newSelected.indexOf(Number(id));
      var newArray = newSelected;
      newArray.splice(index, 1);
      setNewSelected([...newSelected, newArray]);
    } else {
      setNewSelected([...newSelected, id]);
    }
  };
  const kaydet = () => {
    var clearedData = newSelected.filter(data => {
      if (typeof data.length === 'undefined') {
        return data;
      }
    });
    _storeData(clearedData);
    props.navigation.navigate('Home');
  };
  const _storeData = async data => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data.map(data => (
          <TouchableOpacity
            key={data.id}
            onPress={() => handleNewSelection(data.id)}>
            <List.Item
              title={data.title}
              left={props => (
                <List.Icon
                  color={newSelected.includes(data.id) ? 'green' : null}
                  icon={newSelected.includes(data.id) ? 'check' : 'close'}
                />
              )}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button mode="contained" onPress={() => kaydet()}>
        Kaydet
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default ListData;
