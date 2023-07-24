/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import TopBarInfo from '../components/topBarInfo';
import AiIcon from '../components/aiIcon';
import ChatAi from '../components/chatAi';
import Features from '../components/features';
const FeaturePage = ({navigation}: any): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    return console.log('get out Feature');
  }, []);
  return (
    <SafeAreaView style={styles.areaView}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <TopBarInfo />
        <View style={styles.featuresView}>
          <ChatAi />
          <Features />
        </View>
        <AiIcon />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  featuresView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  areaView: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
  },
});

export default FeaturePage;
