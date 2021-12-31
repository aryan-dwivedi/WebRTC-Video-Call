import React, {useContext} from 'react';
import {Alert, StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setItem} from '../helpers/AsyncStorage';
import {HomeScreenNavigationProp} from '../interfaces/navigation';
import {MainContext} from '../store/MainProvider';

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home = ({navigation}: Props) => {
  const {username, setUsername, initialize} = useContext(MainContext);

  const onEnter = async () => {
    if (username.length < 6) {
      Alert.alert('Username must be at least 6 characters');
      return;
    }
    initialize();
    await setItem('@username', username);
    navigation.navigate('Users');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/images/zoom.png')}
        style={styles.logo}
      />
      <View style={styles.main}>
        <Text style={styles.title}>Enter Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TouchableOpacity onPress={onEnter} style={styles.btn}>
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderRadius: 10,
    width: 300,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderWidth: 0.7,
    marginVertical: 8,
    fontSize: 18,
  },
  btn: {
    padding: 12,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
