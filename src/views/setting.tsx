import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Setting = ({navigation}: any): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const handleback = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.areaView}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <View style={styles.logoutBtn}>
          <TouchableOpacity onPress={handleback}>
            <Text style={styles.logoutBtnText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutBtnText: {
    fontSize: 20,
    fontWeight: '700',
  },
  logoutBtn: {
    borderWidth: 1,
    width: '20%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaView: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Setting;
