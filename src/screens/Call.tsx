import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RTCView} from 'react-native-webrtc';
import {CallScreenNavigationProp} from '../interfaces/navigation';
import {MainContext} from '../store/MainProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

interface Props {
  navigation: CallScreenNavigationProp;
}

const Call = ({}: Props) => {
  const {
    localStream,
    remoteStream,
    activeCall,
    remoteUser,
    isMuted,
    closeCall,
    toggleMute,
    switchCamera,
  } = useContext(MainContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {remoteStream && (
        <RTCView
          style={styles.remoteStream}
          streamURL={remoteStream.toURL()}
          objectFit="cover"
        />
      )}
      {localStream && (
        <View style={styles.myStreamWrapper}>
          <RTCView
            style={styles.myStream}
            objectFit="cover"
            streamURL={localStream.toURL()}
            zOrder={1}
          />
        </View>
      )}
      {!activeCall && (
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator color="#ffffff" size={120} />
          <Text style={styles.callingText}>Calling {remoteUser?.username}</Text>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton} onPress={switchCamera}>
            <Ionicons name="ios-camera-reverse" size={30} color={'white'} />
          </Pressable>

          <Pressable onPress={closeCall} style={styles.iconButton2}>
            <MaterialIcons name="phone-hangup" size={30} color={'white'} />
          </Pressable>

          <Pressable onPress={toggleMute} style={styles.iconButton}>
            <MaterialIcons
              name={isMuted ? 'microphone-off' : 'microphone'}
              size={30}
              color={'white'}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Call;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0f0f',
    flex: 1,
    position: 'relative',
  },
  myStream: {
    height: width * 0.5,
    width: width * 0.3,
  },
  myStreamWrapper: {
    position: 'absolute',
    top: 50,
    right: 20,
    height: width * 0.5 + 1,
    width: width * 0.3 + 1,
    backgroundColor: '#333',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteStreamWrapper: {},
  remoteStream: {
    width: '100%',
    height: '100%',
  },
  spinnerWrapper: {
    top: height * 0.3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callingText: {
    fontSize: 26,
    color: '#fff',
  },
  buttonsContainer: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 'auto',
    width: width,
    opacity: 0.7,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
  iconButton2: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
  },
});
