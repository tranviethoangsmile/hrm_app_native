/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  StatusBar,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import socket from '../socket/socketIO';
const URL = 'http://192.168.1.32:3030';
const Login = ({navigation}: any): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [openEye, setOpenEye] = useState(true);
  const [secure, setSecure] = useState(true);
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');

  const handleSecurePass = () => {
    setSecure(!secure);
    setOpenEye(!openEye);
  };
  const handleLogin = async () => {
    if (!user_name || !password) {
      Alert.alert(
        'WARNING!!',
        'Username and Password not empty..!!',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
    }
    const user = {
      user_name: user_name,
      password: password,
    };
    try {
      const log = await axios.post(URL + '/login', user);
      const us: any = log?.data?.data?.id;
      if (log.data?.success) {
        await AsyncStorage.setItem('user', JSON.stringify(log.data?.data));
        await AsyncStorage.setItem('token', JSON.stringify(log.data?.token));
        setPassword('');
        socket.emit('info', {us});
        navigation.navigate('Tabs');
      } else {
        Alert.alert(
          'WARNING !!',
          'Username or Password wrong...',
          [
            {
              text: 'Cancel',
            },
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../images/login.jpg')}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.areaView}>
        <View style={styles.containerView}>
          {/* login */}
          <View style={styles.logoView}>
            <Text style={styles.logoTextUp}>HRM - MANAGER</Text>
            <Text style={styles.logoTextDown}>Login to continue</Text>
          </View>
          <View style={styles.loginView}>
            {/* email */}
            <View style={styles.viewInput}>
              <Text style={styles.textMail}>Username </Text>
              <TextInput
                value={user_name}
                style={styles.inputMail}
                keyboardType="default"
                onChangeText={setUser_name}
              />
            </View>
            {/* password */}
            <View style={styles.viewInput}>
              <Text style={styles.textPass}>Password </Text>
              <TextInput
                onChangeText={setPassword}
                keyboardType="default"
                value={password}
                secureTextEntry={secure}
                style={styles.inputPass}
              />
              <TouchableOpacity
                onPress={handleSecurePass}
                style={styles.touchEye}>
                <Image
                  source={
                    openEye
                      ? require('../images/uneye.png')
                      : require('../images/eye.png')
                  }
                  style={styles.eye}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* button */}
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRegisterView}>
            <View style={styles.forgotPassView}>
              <TouchableOpacity>
                <Text style={styles.forgotPass}>forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logoTextUp: {
    fontSize: 30,
    fontWeight: '800',
    paddingTop: 40,
  },
  logoTextDown: {
    paddingTop: 10,
  },
  logoView: {
    width: '100%',
    height: '15%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  areaView: {
    flex: 1,
  },
  containerView: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  loginView: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  viewInput: {
    width: '80%',
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMail: {
    fontSize: 17,
    fontWeight: '600',
    width: '30%',
    color: 'black',
  },
  inputMail: {
    height: '80%',
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'black',
  },
  textPass: {
    fontSize: 17,
    fontWeight: '600',
    width: '30%',
    color: 'black',
  },
  inputPass: {
    height: '80%',
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingRight: 30,
    color: 'black',
  },
  buttonView: {
    width: '100%',
    height: '5%',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },
  eye: {
    width: '70%',
    height: '60%',
  },
  touchEye: {
    width: '10%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 32,
  },
  buttonRegisterView: {
    width: '100%',
    height: '10%',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassView: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegisterText: {
    fontWeight: '500',
    color: 'white',
  },
  forgotPass: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default Login;
