import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {total} from './Questionspage';
import {Course, Email, Name, emailAddress} from './Details';
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import {LinearGradient} from 'react-native-gradients';

const Result = ({navigation, route}) => {
  const colorList = [
    {offset: '100%', color: '#42047e', opacity: '.65'},
    // {offset: '29%', color: '#44107A', opacity: '1'},
    // {offset: '67%', color: '#FF1361', opacity: '1'},
    {offset: '100%', color: '#b5c6e0', opacity: '.98'},
  ];
  let [Name, setName] = useState('');
  let [Number, setNumber] = useState('');
  let [Email, setEmail] = useState('');
  let [Course, setCourse] = useState('');
  let [total, settotal] = useState('');
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(route.params.email)
      .onSnapshot(documentSnapshot => {
        setName(documentSnapshot.data().name);
        setNumber(documentSnapshot.data().number);
        setEmail(documentSnapshot.data().email);
        setCourse(documentSnapshot.data().course);
        settotal(documentSnapshot.data().result);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [route.params.Email]);

  let level;
  if (total <= 300 && total > 240) {
    level = 'Extremely High';
  }
  if (total <= 240 && total > 180) {
    level = 'High';
  }
  if (total <= 180 && total > 120) {
    level = 'Medium';
  }
  if (total <= 120 && total > 60) {
    level = 'Average';
  }
  if (total <= 60 && total > 30) {
    level = 'Low';
  }
  let totalfinal = Math.round((total / 300) * 100);
  const localIcons = {
    Extremely: require('../assets/extreme.jpeg'),
    High: require('../assets/high.jpg'),
    Medium: require('../assets/medium.jpg'),
    Average: require('../assets/average.jpg'),
    Low: require('../assets/low.jpg'),
  };

  // Dynamically access icon image by name
  const getIconByName = name => {
    switch (name) {
      case 'Extremely High':
        return localIcons.Extremely;
      case 'High':
        return localIcons.High;
      case 'Medium':
        return localIcons.Medium;
      case 'Average':
        return localIcons.Average;
      case 'Average':
        return localIcons.Low;
    }
  };

  return (
    <ScrollView className="flex">
      <ImageBackground
        source={require('../assets/Welcome1.png')}
        resizeMode="cover"
        className="h-screen w-screen flex flex-1 flex-col">
        <View className="flex flex-1 h-3/4 w-80 justify-center items-center self-center ml-1 absolute top-24">
          <LinearGradient colorList={colorList} angle={90} className="h-1/2" />
          <View
            className=" flex flex-col
        justify-center absolute top-0 rounded-3xl">
            <Text className="text-white text-center text-xl font-bold  underline mt-2">
              RESULTS OF THE SURVEY
            </Text>
            <Image
              source={getIconByName(level)}
              resizeMode="contain"
              className="h-24 self-center  mt-4"
            />
            <Text className="text-white text-center ml-7 text-lg font-medium mt-2">
              Hello
              <Text className="text- text-center text-lg font-bold">
                {`${Name}`} !{' '}
              </Text>{' '}
            </Text>
            <Text className="text-white text-center ml-7 text-lg font-medium mt-2">
              Phone:
              <Text className="text  text-center text-lg font-bold">
                {`${Number}`}{' '}
              </Text>{' '}
            </Text>
            <Text className="text-white text-center ml-7 text-lg font-medium mt-2">
              Email:
              <Text className="text  text-center text-lg font-bold">
                {`${Email}`}{' '}
              </Text>{' '}
            </Text>
            <Text className="text-white text-center ml-7 text-lg font-medium mt-2">
              Course:
              <Text className="text  text-center text-lg font-bold">
                {`${Course}`}{' '}
              </Text>{' '}
            </Text>
            <Text className="text-white text-center ml-7 text-lg font-medium mt-2">
              Result:
              <Text className="text  text-center text-lg font-bold">
                {`${totalfinal}`}% stress{' '}
              </Text>{' '}
            </Text>
            <Text className="text-white text-center ml-7 text-lg font-medium mt-2">
              Level of stress:
              <Text className="text-white text-center text-lg font-bold">{`${level}`}</Text>
            </Text>
            <Text className="text-gray-50 text-base font-semibold ml-1 text-center mt-2 ">
              Your Survey Report is mailed to you at{'\n '} your Email. {'\n'}
              Check it out!
            </Text>
            <TouchableOpacity
              className="bg-blue-500 h-10 w-36 self-center  rounded-md items-center mt-5"
              onPress={() => {
                navigation.navigate('Details');
              }}>
              <Text className="font-bold text-lg text-white self-center items-center align-middle py-1">
                Wanna try again!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Result;

const styles = StyleSheet.create({});
