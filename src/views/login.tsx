import React, {useState} from 'react';
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
  Modal,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import socket from '../socket/socketIO';
const URL = 'http://192.168.0.101:4000';
const Login = ({navigation}: any): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [openEye, setOpenEye] = useState(true);
  const [secure, setSecure] = useState(true);
  const [user_name, setUser_name] = useState('');
  const [password, setPassword] = useState('');
  const [nippouModal, setNippouModal] = useState(false);
  const [isOpenProductList, setIsOpenProductList] = useState(false);
  const [isValue, setIsValue] = useState<string>('');
  const [isATime, setIsATime] = useState<string>('');
  const [isBTime, setIsBTime] = useState<string>('');
  const [isWorkingTime, setIsWorkingTime] = useState<string>('');
  const [isPercent, setIsPercent] = useState<number>(0);
  const [isQuanlity, setIsQuanlity] = useState<string>('');
  const listProduct = [
    {label: '66', value: '1.08'},
    {label: '05k RR', value: '0.81'},
    {label: '05k FR', value: '0.85'},
    {label: '042', value: '1.09'},
    {label: 'D93F', value: '0.82'},
    {label: '14k RR', value: '1'},
    {label: '14k FR', value: '0.8'},
    {label: '67E', value: '0.80'},
    {label: '84N', value: '1.13'},
  ];
  const handleNippouModal = () => {
    setNippouModal(!nippouModal);
  };
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
  const handleCalculate = () => {
    const total =
      ((parseFloat(isQuanlity) * parseFloat(isValue)) /
        (parseFloat(isWorkingTime) -
          (parseFloat(isATime) + parseFloat(isBTime)))) *
      100;
    setIsPercent(parseFloat(total.toFixed(2)));
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
          <View style={styles.btnNippou}>
            <TouchableOpacity onPress={handleNippouModal}>
              <Text style={styles.buttonText}>日報計算</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          visible={nippouModal}
          animationType="slide"
          presentationStyle="fullScreen"
          onRequestClose={() => {
            setNippouModal(false);
          }}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.headerText}>日報</Text>
            </View>
            <View style={styles.modalBody}>
              <ScrollView>
                <View style={styles.productListView}>
                  <View>
                    <Text>Product:</Text>
                  </View>
                  <View>
                    <DropDownPicker
                      listMode="SCROLLVIEW"
                      scrollViewProps={{
                        decelerationRate: 'fast',
                      }}
                      maxHeight={200}
                      open={isOpenProductList}
                      setOpen={() => {
                        setIsOpenProductList(!isOpenProductList);
                      }}
                      items={listProduct}
                      modalAnimationType="slide"
                      autoScroll={false}
                      value={isValue}
                      setValue={val => {
                        setIsValue(val);
                      }}
                    />
                  </View>
                </View>
                <View style={styles.quantityView}>
                  <View>
                    <Text style={styles.infoText}>Quanlity</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.textInputInfo}
                      value={isQuanlity}
                      onChangeText={val => {
                        setIsQuanlity(val);
                      }}
                      keyboardType="default"
                    />
                  </View>
                </View>
                <View style={styles.productListView}>
                  <View>
                    <Text style={styles.infoText}>A Time</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.textInputInfo}
                      value={isATime}
                      onChangeText={val => {
                        setIsATime(val);
                      }}
                      keyboardType="default"
                    />
                  </View>
                </View>
                <View style={styles.productListView}>
                  <View>
                    <Text style={styles.infoText}>B Time</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.textInputInfo}
                      value={isBTime}
                      onChangeText={val => {
                        setIsBTime(val);
                      }}
                      keyboardType="default"
                    />
                  </View>
                </View>
                <View style={styles.productListView}>
                  <View>
                    <Text style={styles.infoText}>Working Time</Text>
                  </View>
                  <View>
                    <TextInput
                      style={styles.textInputInfo}
                      value={isWorkingTime}
                      onChangeText={val => {
                        setIsWorkingTime(val);
                      }}
                      keyboardType="default"
                    />
                  </View>
                </View>
                <View>
                  <View>
                    <Text style={styles.infoText}>Percent</Text>
                  </View>
                  <View>
                    <Text style={styles.infoText}>{isPercent} %</Text>
                  </View>
                </View>
                <View style={styles.calculateBtn}>
                  <TouchableOpacity onPress={handleCalculate}>
                    <Text style={styles.infoText}>Calculate</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <View style={styles.bottomCancelButton}>
              <TouchableOpacity onPress={handleNippouModal}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textInputInfo: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 20,
    color: 'black',
  },
  calculateBtn: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1,
  },
  quantityView: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productListView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNippou: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    borderRadius: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    width: '100%',
    Height: '100%',
  },
  modalHeader: {
    width: '100%',
    height: '5%',
    backgroundColor: '#2d7daf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCancelButton: {
    marginBottom: 0,
    width: '100%',
    backgroundColor: '#93ad89',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
  },
  cancelButton: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#023E8A',
  },
  NippouButtonView: {
    color: 'red',
    fontSize: 18,
  },
  NippouButton: {
    width: '40%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
