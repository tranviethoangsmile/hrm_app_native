import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
const TopBarInfo = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [dep, setDep] = useState<string>('');
  const avatar =
    'https://res.cloudinary.com/dcxtzn2y4/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1683452038/rusrcjzlcsawlzvh8cvu.jpg';
  useEffect(() => {
    const getUser = async () => {
      const data: any = await AsyncStorage.getItem('user');
      const user = JSON.parse(data);
      setName(user?.name);
      setDep(user.department.name);
    };
    getUser();
  }, []);
  return (
    <View style={styles.infoView}>
      <View style={styles.infoDetailView}>
        <View style={styles.infoDetailName}>
          <Text style={styles.infoDetailNameText}>{name}</Text>
        </View>
        <View style={styles.infoDetailDep}>
          <Text style={styles.infoDetailDepText}>{dep}</Text>
        </View>
      </View>
      <View style={styles.infoAvatarView}>
        <TouchableOpacity>
          <Image style={styles.avataView} source={{uri: avatar}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoDetailDepText: {
    fontSize: 15,
    fontWeight: '500',
  },
  infoDetailNameText: {
    fontSize: 20,
    fontWeight: '500',
  },
  infoDetailDep: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
  },
  infoDetailName: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
  },
  avataView: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  infoAvatarView: {
    width: '30%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  infoDetailView: {
    width: '70%',
    height: '100%',
    flexDirection: 'column',
  },
  infoView: {
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    position: 'relative',
  },
});

export default TopBarInfo;
