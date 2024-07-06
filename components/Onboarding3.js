import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Onboarding3 = ({navigation}) => {
  return (
    <View className="flex flex-1 justify-center">
      <ImageBackground
        source={require('../assets/Welcome3.png')}
        resizeMode="stretch"
        className="h-screen w-screen flex flex-1 flex-col">
        <View
          className="h-80 w-screen flex flex-col
        justify-end absolute bottom-36 rounded-t-3xl">
          <View className="">
            <TouchableOpacity
              className="h-16 w-64 self-center my-0 bg-blue-400 rounded-md"
              onPress={() => {
                navigation.navigate('Details');
              }}>
              <Text className="text-white text-2xl text-center align-middle my-3">
                Take our Survey
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Onboarding3;

const styles = StyleSheet.create({});
