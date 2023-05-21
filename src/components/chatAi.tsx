import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';

const ChatAi = (): JSX.Element => {
  const URL = 'http://localhost:3030';

  const [respomse, setResponse] = useState<string | null>('');
  const [preload, setPreload] = useState<boolean>(true);
  const [chat, setChat] = useState('');

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
    setPreload(false);
    const res = await axios.post(URL + '/chat', {
      chat,
    });
    if (res?.data?.success) {
      setPreload(true);
    }
    setResponse(res?.data?.message);
    setChat('');
  };

  return (
    <View style={styles.chatView}>
      <View style={styles.chatViewResponse}>
        <ScrollView>
          {preload ? (
            <Text style={styles.chatViewResponseText}>{respomse}</Text>
          ) : (
            <ActivityIndicator />
          )}
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
            numberOfLines={2}
            value={chat}
            onChangeText={setChat}
            placeholder="message here..."
            style={styles.textInput}
          />
        </View>
        <View style={styles.chatViewRequestBtn}>
          <TouchableOpacity disabled={!preload} onPress={handelChatRequest}>
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
