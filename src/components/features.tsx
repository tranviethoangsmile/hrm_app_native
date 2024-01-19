/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Text,
  LogBox,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import {format} from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const URL = 'http://192.168.0.101:4000';
const Features = (): JSX.Element => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [modalOrder, setModalOrder] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenFood, setIsOpenFood] = useState<boolean>(false);
  const [items, setItems] = useState<[]>([]);
  const [canteen_id, setCanteen_id] = useState<string>('');
  const [foods, setFoods] = useState<[]>([]);
  const [food_id, setFood_id] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const updateItems = useCallback((newItems: any) => {
    setItems(newItems);
  }, []);
  const updateFood = useCallback((newItems: any) => {
    setFoods(newItems);
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const handleUser = async () => {
      const data: any = await AsyncStorage.getItem('user');
      let value = await AsyncStorage.getItem('token');
      setToken(JSON.parse(value!));
      const user = JSON.parse(data);
      if (user) {
        setUserId(user?.id);
      }
      const canteen = await axios.get(URL + '/canteen');
      if (canteen?.data.success) {
        const newItems = canteen.data.data.map((item: any) => ({
          label: item.factory_name,
          value: item.id,
        }));
        updateItems(newItems);
      }
      const list_food = await axios.get(URL + '/food');
      if (list_food?.data.success) {
        const newFood = list_food.data.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        updateFood(newFood);
      }
    };
    handleUser();
    return () => {
      console.log('get out');
    };
  }, []);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = (date: any) => {
    let order_date = format(date, 'yyyy-MM-dd');
    setSelectedDate(order_date);
    hideDatePicker();
  };
  const handleOrderRequest = async () => {
    try {
      const data = {
        user_id: userId,
        canteen_id: canteen_id,
        food_id: food_id,
        date: selectedDate,
      };
      const response = await axios.post(
        URL + '/order',
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data.success) {
        setCanteen_id('');
        setFood_id('');
        setSelectedDate(formattedDate);
        setModalOrder(!modalOrder);
      } else {
        console.log('req fails');
      }
    } catch (error: any) {
      console.log('message: ', error?.message);
    }
  };
  const cancelOrderRequst = () => {
    setCanteen_id('');
    setFood_id('');
    setSelectedDate(formattedDate);
    setModalOrder(false);
  };

  return (
    <View style={styles.featureView}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.featuresLine}>
          <View style={styles.featureLine}>
            <View style={styles.featuresInLineUpLeft}>
              <TouchableOpacity
                onPress={() => {
                  setModalOrder(!modalOrder);
                }}>
                <Image
                  source={require('../images/order-icon.png')}
                  style={styles.featureslogo}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.featureLine}>
            <View style={styles.featuresInLineUpRight}>
              <TouchableOpacity>
                <Image
                  source={require('../images/request.png')}
                  style={styles.featureslogo}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.featuresLine}>
          <View style={styles.featureLine}>
            <View style={styles.featuresInLineMiddleLeft}>
              <TouchableOpacity>
                <Image
                  source={require('../images/report.png')}
                  style={styles.featureslogo}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.featureLine}>
            <View style={styles.featuresInLineMiddleRight}>
              <TouchableOpacity>
                <Image
                  source={require('../images/buy.png')}
                  style={styles.featureslogo}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.featuresLine}>
          <View style={styles.featureLine}>
            <View style={styles.featuresInLineDownLeft}>
              <TouchableOpacity>
                <Image
                  source={require('../images/analytics.png')}
                  style={styles.featureslogo}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.featureLine}>
            <View style={styles.featuresInLineDownRight}>
              <TouchableOpacity>
                <Image
                  source={require('../images/warning.png')}
                  style={styles.featureslogo}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        style={styles.modal}
        visible={modalOrder}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setModalOrder(false);
        }}>
        <View style={styles.orderModalView}>
          <View style={styles.orderModalViewHeader}>
            <View style={styles.orderModalViewHeaderBackBtn}>
              <TouchableOpacity
                onPress={() => {
                  setModalOrder(false);
                }}>
                <Image
                  source={require('../images/back-icon.png')}
                  style={styles.orderModalViewHeaderBackIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.orderModalViewHeaderTitle}>
              <Text style={styles.orderModalViewHeaderTitleText}>
                Create Order
              </Text>
            </View>
          </View>
          <View style={styles.orderModalViewBody}>
            <View style={styles.orderModalViewBodyItems}>
              <View style={styles.orderModalViewBodyItemsUp}>
                <Text style={styles.labelText}>Canteen:</Text>
                <DropDownPicker
                  style={styles.dropDownPickerContainer}
                  open={isOpen}
                  setOpen={() => {
                    setIsOpen(!isOpen);
                  }}
                  items={items}
                  value={canteen_id}
                  setValue={val => setCanteen_id(val)}
                  maxHeight={100}
                />
              </View>
              <View style={styles.orderModalViewBodyItemsMidle}>
                <Text style={styles.labelText}>Food:</Text>
                <DropDownPicker
                  open={isOpenFood}
                  setOpen={() => {
                    setIsOpenFood(!isOpenFood);
                  }}
                  items={foods}
                  value={food_id}
                  setValue={val => setFood_id(val)}
                  maxHeight={100}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Date:</Text>
                <Text>{selectedDate}</Text>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <Button title="Date" onPress={showDatePicker} />
              </View>
            </View>
          </View>
          <View style={styles.orderModalViewFooter}>
            <View style={styles.orderBtnView}>
              <TouchableOpacity
                onPress={handleOrderRequest}
                style={styles.orderBtn}>
                <Text style={styles.orderBtnText}>ORDER</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cancelOrderBtnView}>
              <TouchableOpacity
                style={styles.cancelOrderBtn}
                onPress={cancelOrderRequst}>
                <Text style={styles.cancelOrderBtnText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'absolute',
    top: 10,
  },
  cancelOrderBtnText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  orderBtnText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  cancelOrderBtn: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  orderBtn: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  cancelOrderBtnView: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderBtnView: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownPickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderModalViewBodyItemsDown: {
    width: '100%',
    height: '20%',
    marginBottom: 20,
  },
  orderModalViewBodyItemsMidle: {
    width: '100%',
    height: '30%',
    marginBottom: 20,
  },
  orderModalViewBodyItemsUp: {
    width: '100%',
    height: '30%',
    marginBottom: 20,
  },
  orderModalViewBodyItems: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  orderModalViewFooter: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orderModalViewBody: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderModalViewHeaderTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  orderModalViewHeaderTitle: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderModalViewHeaderBackIcon: {
    width: 30,
    height: 30,
  },
  orderModalViewHeaderBackBtn: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderModalViewHeader: {
    height: '5%',
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  orderModalView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  featuresInLineDownRight: {
    width: '95%',
    height: '95%',
    backgroundColor: '#ffa1d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresInLineDownLeft: {
    width: '95%',
    height: '95%',
    backgroundColor: '#ffa1d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresInLineMiddleRight: {
    width: '95%',
    height: '95%',
    backgroundColor: '#ffa1d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresInLineMiddleLeft: {
    width: '95%',
    height: '95%',
    backgroundColor: '#ffa1d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresLineMiddleLeft: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresInLineUpRight: {
    width: '95%',
    height: '95%',
    backgroundColor: '#ffa1d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresInLineUpLeft: {
    width: '95%',
    height: '95%',
    backgroundColor: '#02edc4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureLine: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresLine: {
    width: '100%',
    height: '33.3%',
    flexDirection: 'row',
  },
  featureView: {
    width: '100%',
    height: '65%',
  },
  featureslogo: {
    width: 70,
    height: 70,
    margin: 10,
  },
});
export default Features;
