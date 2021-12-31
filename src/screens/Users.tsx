/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setItem} from '../helpers/AsyncStorage';
import {resetGo} from '../helpers/RootNavigation';
import {User} from '../interfaces';
import {UsersScreenNavigationProp} from '../interfaces/navigation';
import {MainContext} from '../store/MainProvider';

interface Props {
  navigation: UsersScreenNavigationProp;
}

const Users = ({navigation}: Props) => {
  const {users, username, call, reset, remoteUser, activeCall} =
    useContext(MainContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUsers, setNewUsers] = useState([]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    const setUser = users.filter((user: User) =>
      user.username.toLowerCase().includes(text.toLowerCase()),
    );
    setNewUsers(setUser);
  };

  const callUser = (user: User) => {
    call(user);
    navigation.reset({
      index: 0,
      routes: [{name: 'Call'}],
    });
  };

  const onLogout = async () => {
    reset();
    await setItem('@username', null);
    resetGo('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topContainer}>
        <Text style={styles.title}>Ringover</Text>
        <TouchableOpacity onPress={onLogout} style={styles.btnExit}>
          <Text style={[styles.text, {textAlign: 'center'}]}>Exit</Text>
        </TouchableOpacity>
      </View>
      {activeCall && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Call')}
          style={[styles.btn, {borderRadius: 0}]}>
          <Text style={styles.btnText}>
            Back to active call with {remoteUser?.username || ''}
          </Text>
        </TouchableOpacity>
      )}
      <TextInput
        value={searchTerm}
        onChangeText={handleSearch}
        style={styles.searchInput}
        placeholder="Search..."
      />
      <FlatList
        data={newUsers}
        keyExtractor={item => item.username}
        renderItem={({item}) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text2}>{item.username}</Text>
              {username !== item.username ? (
                <TouchableOpacity
                  disabled={activeCall}
                  onPress={() => callUser(item)}
                  style={[styles.btnExit, {opacity: activeCall ? 0.3 : 1}]}>
                  <Text style={styles.text}>Call</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.text2}>me</Text>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#121212',
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    padding: 12,
    borderBottomWidth: 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 13,
    fontSize: 16,
    borderRadius: 5,
    opacity: 2,
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
    color: '#000',
  },
  text2: {
    fontSize: 18,
    margin: 5,
    color: '#fff',
  },
  btn: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 99,
  },
  btnExit: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
});
