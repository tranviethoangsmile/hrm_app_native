import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';

const AiIcon = (): JSX.Element => {
  const URL = 'http://localhost:3030/chat';

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [respomse, setResponse] = useState<string | null>('');
  const [preload, setPreload] = useState<boolean>(true);
  const [chat, setChat] = useState('');
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handelChatRequest = async () => {
    setPreload(false);
    const res = await axios.post(URL, {
      chat,
    });
    if (res?.data?.success) {
      setPreload(true);
    }
    setResponse(res?.data?.message);
    setChat('');
  };

  return (
    <View style={styles.aiView}>
      <TouchableOpacity onPress={handleModal}>
        <Image
          source={require('../images/robot-icon.png')}
          style={styles.aiIcon}
        />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleModal}>
        <SafeAreaView>
          <View style={styles.modalView}>
            <View style={styles.modalTextView}>
              <Text style={styles.modalText}>Message: </Text>
              <View style={styles.modalTextInputView}>
                <TextInput
                  value={chat}
                  onChangeText={setChat}
                  style={styles.modalTextInput}
                />
                <Button title="Send" onPress={handelChatRequest} />
              </View>
            </View>
            <View style={styles.chat}>
              <View style={styles.chatView}>
                <ScrollView>
                  {preload ? (
                    <Text style={styles.chatText}>{respomse}</Text>
                  ) : (
                    <ActivityIndicator />
                  )}
                </ScrollView>
              </View>
            </View>
            <Button title="Close" onPress={handleModal} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  chatText: {
    fontSize: 20,
    fontWeight: '500',
  },
  chatView: {
    width: '95%',
    height: '100%',
    margin: 10,
  },
  chat: {
    width: '100%',
    height: '80%',
  },
  modalText: {
    width: '100%',
    height: '50%',
    fontSize: 25,
    fontWeight: '700',
  },
  modalTextInputView: {
    flexDirection: 'row',
    width: '100%',
    height: '50%',
  },
  modalTextInput: {
    width: '80%',
    height: '100%',
  },
  modalTextView: {
    flexDirection: 'column',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '15%',
  },
  modalView: {
    width: '100%',
    height: '100%',
  },
  aiIcon: {
    width: 50,
    height: 50,
  },
  aiView: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
export default AiIcon;
