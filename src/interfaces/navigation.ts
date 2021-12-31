import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type Routes = 'Home' | 'Users' | 'Call' | 'Entrance' | 'Incoming';

export type RootStackParamList = {
  Entrance: undefined;
  Home: undefined;
  Users: undefined;
  Call: undefined;
  Incoming: any;
};

export type EntranceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Entrance'
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type UsersScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Users'
>;
export type CallScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Call'
>;
export type IncomingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Incoming'
>;
