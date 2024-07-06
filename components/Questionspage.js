import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {ques} from '../assets/question.js';
import RadioGroup from 'react-native-radio-buttons-group';
import firestore from '@react-native-firebase/firestore';
// import Slide  from './Slide.js'
import {Slider} from '@rneui/themed';
import {LinearGradient} from 'react-native-gradients';

const Questions = ({navigation, route}) => {
  let [value1, setvalue1] = useState(0);

  const interpolate = (start: number, end: number) => {
    let k = (value1 - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };
  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  let [total, settotal] = useState(0);

  let [increaser, setincreaser] = useState(0);
  let colors;
  {
    value1 >= 1 && value1 <= 30
      ? 'green'
      : value1 >= 31 && value1 <= 60
      ? 'yellow'
      : 'red';
  }
  let dataupdate = () => {
    firestore()
      .collection('users')
      .doc(route.params.Email)
      .update({
        result: total,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {});
  };
  const colorList = [
    {offset: '100%', color: '#42047e', opacity: '.65'},
    // {offset: '29%', color: '#44107A', opacity: '1'},
    // {offset: '67%', color: '#FF1361', opacity: '1'},
    {offset: '100%', color: '#b5c6e0', opacity: '.98'},
  ];

  return (
    <ScrollView className="flex">
      <ImageBackground
        source={require('../assets/Welcome1.png')}
        resizeMode="cover"
        className="h-screen w-screen flex flex-1 flex-col rounded-lg">
        <View className="flex flex-1 h-3/5 w-80 justify-center items-center self-center ml-1 absolute top-44 rounded-xl">
          <LinearGradient colorList={colorList} angle={90} className="h-1/2" />
          <View
            className=" flex flex-col
        justify-between absolute  self-center  rounded-xl">
            <Text className="text-xl font-bold text-white self-center underline top-0">
              Questions {`${increaser + 1}`}
            </Text>
            <Text className="text-xl font-medium text-white mt-2 self-center top-0">
              Q.{`${ques[increaser].q}`}
            </Text>
            <Text className=" mt-5 text-black text-md font-medium underline">
              (Rate on the Scale of 1- 10)
            </Text>

            <View style={[styles.contentView]}>
              <Slider
                value={value1}
                onValueChange={setvalue1}
                maximumValue={10}
                minimumValue={0}
                step={1}
                allowTouchTrack
                trackStyle={{height: 7, backgroundColor: '#fff'}}
                thumbStyle={{height: 24, width: 24}}
                thumbTintColor={
                  value1 >= 0 && value1 <= 3
                    ? 'green'
                    : value1 >= 4 && value1 <= 7
                    ? 'yellow'
                    : 'red'
                }
              />
              <Text className="text-xl font-bold text-white self-center mt-2 ">
                value:{value1}
              </Text>
            </View>

            {value1 == 0 ? (
              <View
                className="mx-8 my-8 bg-blue-500 rounded-lg h-10 w-20 self-center align-middle justify-center items-center border-2 border-rose-50"
                onPress={() => {
                  setincreaser(increaser + 1);
                  settotal(total + value1);
                  setvalue1((value1 = 0));
                  console.log('====================================');
                  console.log(value1);

                  console.log(total);
                  console.log('====================================');
                }}>
                <Text className="text-white self-center align-middle justify-center items-center text-lg">
                  {' '}
                  NEXT{' '}
                </Text>
              </View>
            ) : increaser == 29 ? (
              <TouchableOpacity
                className="mx-8 my-8 bg-blue-500 rounded-lg h-10 w-20 self-center align-middle justify-center items-center hidden border-rose-50"
                onPress={() => {
                  settotal(total + value1);
                  setvalue1((value1 = 0));
                  setincreaser(increaser + 1);

                  console.log('====================================');
                  console.log(value1);

                  console.log(total);
                  console.log('====================================');
                }}>
                <Text className="text-white self-center align-middle justify-center items-center text-lg">
                  {' '}
                  NEXT{' '}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="mx-8 my-8 bg-blue-500 rounded-lg h-10 w-20 self-center align-middle justify-center items-center border-rose-50"
                onPress={() => {
                  settotal(total + value1);
                  setvalue1((value1 = 0));
                  setincreaser(increaser + 1);

                  console.log('====================================');
                  console.log(value1);

                  console.log(total);
                  console.log('====================================');
                }}>
                <Text className="text-white self-center align-middle justify-center items-center text-lg">
                  {' '}
                  NEXT{' '}
                </Text>
              </TouchableOpacity>
            )}
            {increaser == 29 ? (
              <TouchableOpacity
                className="mx-8 my-8 bg-blue-500 rounded-lg h-10 w-20 self-center align-middle justify-center items-center border-rose-50"
                onPress={() => {
                  dataupdate();
                  navigation.navigate('Result', {email: route.params.Email});
                  console.log('====================================');
                  console.log(value1);

                  console.log(total);
                  console.log('====================================');
                }}>
                <Text className="text-white self-center align-middle justify-center items-center text-lg">
                  {' '}
                  SUBMIT{' '}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="mx-8 my-8 bg-blue-500 rounded-lg h-10 w-20 self-center align-middle justify-center items-center hidden border-rose-50"
                onPress={() => {
                  navigation.navigate('Result', {email: route.params.Email});
                  console.log('====================================');
                  console.log(value1);
                  console.log(route.params.value1);
                  console.log(total);
                  console.log('====================================');
                }}>
                <Text className="text-white self-center align-middle justify-center items-center text-lg">
                  {' '}
                  SUBMIT{' '}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Questions;

const styles = StyleSheet.create({
  slider: {
    backgroundColor: '#FFFFFF',
  },
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});
