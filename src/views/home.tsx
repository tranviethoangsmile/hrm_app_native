import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Home = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [number, setNumber] = useState(0);
  const handleNumber = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    console.log('M...M..');
    return () => {
      console.log('cancel');
    };
  });
  return (
    <SafeAreaView style={styles.areaView}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <View style={styles.homePageView}>
          <View style={styles.homeMenuTop}>
            <View style={styles.homeMenuTopItemNum}>
              <Text style={styles.homeMenuTopItemText}>{number}</Text>
            </View>
            <View style={styles.homeMenuTopItemBtn}>
              <TouchableOpacity onPress={handleNumber}>
                <Text style={styles.homeMenuTopItemBtnText}>Click</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.homeMenuMedium}>
            <Text>OK</Text>
          </View>
          <View style={styles.homeMenuBottom}>
            <Text>OK</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeMenuTopItemBtnText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
  },
  homeMenuTopItemBtn: {
    borderWidth: 1,
    width: '40%',
    height: '30%',
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: '#2e188f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeMenuTopItemText: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  homeMenuTopItemNum: {
    width: '60%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeMenuTop: {
    width: '100%',
    height: '33.3%',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeMenuMedium: {
    width: '100%',
    height: '33.3%',
    borderWidth: 1,
  },
  homeMenuBottom: {
    width: '100%',
    height: '33.3%',
    borderWidth: 1,
  },
  homePageView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  iconSetting: {
    height: '6%',
    width: '10%',
    padding: 15,
  },
  iconBack: {
    height: '40%',
    width: '30%',
    paddingRight: 10,
  },
  areaView: {
    flex: 1,
  },
  topBarView: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
  },
  back: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  setting: {
    width: '20%',
    height: '100%',
    marginLeft: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
  },
});

export default Home;
