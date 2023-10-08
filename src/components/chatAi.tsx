import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import socket from '../socket/socketIO';

const ChatAi = (): JSX.Element => {
  const URL = 'http://192.168.0.108:3030';
  const [chat, setChat] = useState('');
  const [chatHistory, setChatHistory] = useState('');
  useEffect(() => {
    socket.on('messgpt', handleMessage);
  }, []);
  const handleMessage = (message: any) => {
    setChatHistory(prevHistory => prevHistory + message);
  };
  const handelChatRequest = async () => {
    if (!chat) {
      Alert.alert(
        'WARNING!!',
        'message not empty...!',
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
      return;
    }
    // setPreload(false);
    await axios.post(URL + '/chat', {
      chat,
    });
    setChatHistory('');
    setChat('');
  };

  return (
    <View style={styles.chatView}>
      <View style={styles.chatViewResponse}>
        <ScrollView>
          <Text style={styles.chatViewResponseText}>{chatHistory}</Text>
        </ScrollView>
      </View>
      <View style={styles.chatViewRequest}>
        <View style={styles.chatViewRequestIcon}>
          <TouchableOpacity>
            <Image
              source={require('../images/plus.png')}
              style={styles.chatViewRequestIconImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.chatViewRequestInput}>
          <TextInput
            multiline={true}
            value={chat}
            onChangeText={setChat}
            placeholder="message here..."
            style={styles.textInput}
          />
        </View>
        <View style={styles.chatViewRequestBtn}>
          <TouchableOpacity onPress={handelChatRequest}>
            <Image
              source={require('../images/send.png')}
              style={styles.chatViewRequestBtnIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatViewRequestBtnIcon: {
    width: 40,
    height: 40,
  },
  textInput: {
    width: '100%',
    height: '100%',
  },
  chatViewRequestIconImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  chatViewRequestBtn: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatViewRequestInput: {
    width: '80%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatViewRequestIcon: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatViewRequest: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatViewResponseText: {
    padding: 5,
    fontSize: 16,
  },
  chatViewResponse: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
    backgroundColor: '#b3ecc9',
  },
  chatView: {
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 5,
  },
});

export default ChatAi;
