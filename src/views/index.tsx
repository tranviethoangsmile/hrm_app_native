/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './login';
import Home from './home';
import Setting from './setting';
import Profile from './profile';
import FeaturePage from './featuresPage';
import CheckIn from './checkin';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = (): JSX.Element => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../images/home-icon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Features"
        component={FeaturePage}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../images/features-icon.jpeg')}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CheckIn"
        component={CheckIn}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../images/checkin.png')}
              style={styles.iconCheckIn}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../images/profile-icon.png')}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../images/setting.png')}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Root = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tabs"
          component={TabMenu}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconCheckIn: {
    width: 50,
    height: 50,
    tintColor: 'white',
    backgroundColor: '#75c852',
    position: 'absolute',
    bottom: 10,
    borderRadius: 40,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
  },
});
export default Root;
