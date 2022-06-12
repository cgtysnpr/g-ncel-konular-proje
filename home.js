import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import Tts from 'react-native-tts';
import {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalData from './data';
import {useIsFocused} from '@react-navigation/native';
import {
  Actionsheet,
  Box,
  useDisclose,
  Input,
  Button as BaseButton,
  Stack,
} from 'native-base';
const Home = props => {
  const [buttonData, setButtonData] = useState([]);
  const isFocused = useIsFocused();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [text, setText] = useState('');
  const getData = async () => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem('data');
      if (data !== null) {
        const finalData = generalData.filter(item =>
          JSON.parse(data).some(x => x == item.id),
        );
        setButtonData(finalData);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [isFocused]);
  const talk = sentence => {
    Tts.getInitStatus().then(() => {
      Tts.speak(sentence);
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          buttonData.length === 1
            ? {backgroundColor: item.color, width: '100%'}
            : {backgroundColor: item.color, width: '45%'},
        ]}
        onPress={() => {
          talk(item.talk);
        }}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.image,
          }}
        />
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <FlatList
          data={buttonData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          horizontal={false}
          contentContainerStyle={{padding: 15}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
        <View>
          <Stack
            mb="2.5"
            mt="1.5"
            direction={{
              base: 'row',
              md: 'row',
            }}
            space={2}
            mx={{
              base: 'auto',
              md: '0',
            }}>
            <Button
              mode="contained"
              style={{marginTop: 20, marginBottom: 20}}
              onPress={() => props.navigation.navigate('List')}>
              Ekle
            </Button>
            <Button
              mode="contained"
              style={{marginTop: 20, marginBottom: 20}}
              onPress={onOpen}>
              Yaz
            </Button>
          </Stack>
        </View>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Input
                variant="outline"
                onChangeText={text => setText(text)}
                placeholder="Kelime giriniz."
              />
            </Box>
            <Stack
              mb="2.5"
              mt="1.5"
              direction={{
                base: 'row',
                md: 'row',
              }}
              space={2}
              mx={{
                base: 'auto',
                md: '0',
              }}>
              <BaseButton onPress={onClose}>İptal</BaseButton>
              <BaseButton onPress={() => talk(text)}>Tamam</BaseButton>
            </Stack>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  button: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
