/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import socket from '../socket/socketIO';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckIn = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user_id, setUserId] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [userList, setUserList] = useState([]);
  const [conversation_id, setConversationId] = useState<string>('');
  const [receiver_id, setReceiver_id] = useState<string>('');

  useEffect(() => {
    const handleUser = async () => {
      const data: any = await AsyncStorage.getItem('user');
      const user = JSON.parse(data);
      if (user) {
        setUserId(user?.id);
      }
      const listUser: any = await axios.get('http://192.168.1.35:3030/user');
      console.log(listUser?.data?.success);
      if (listUser?.data?.success) {
        setUserList(listUser?.data?.data);
      }
    };
    handleUser();
  }, []);
  const handleSendMessage = () => {};
  const handleClickUserOpenChat = async (value: any) => {
    setReceiver_id(value);
    const data = {
      sender_id: user_id,
      receiver_id: receiver_id,
    };
    const conversationId = await axios.post(
      'http://192.168.1.35:3030/conversations',
      {
        ...data,
      },
    );
    console.log(conversationId?.data);
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <View style={styles.viewUser}>
          {userList.map((user: any) => (
            <TouchableOpacity
              key={user.id}
              onPress={() => {
                handleClickUserOpenChat(user.id);
              }}>
              <Text>{user.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.viewMessage}>
          <Text>Ok</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput value={content} onChangeText={text => setContent(text)} />
        </View>
        <View>
          <Button title="send" onPress={handleSendMessage} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewMessage: {
    width: '100%',
    height: '20%',
    flex: 1,
  },
  viewUser: {
    width: '100%',
    height: '20%',
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  textInput: {
    width: '100%',
    height: '10%',
    borderWidth: 2,
    margin: 3,
  },
});
export default CheckIn;
