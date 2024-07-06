import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Onboarding2 = ({ navigation }) => {
  return (
    <View className="flex flex-1 justify-center">
      <ImageBackground
        source={require('../assets/Welcome2.png')}
        resizeMode="stretch"
        className="h-screen w-screen flex flex-1 flex-col">
        <View className="h-24 w-screen flex flex-col justify-end absolute bottom-0 rounded-t-3xl">

          <View className="flex flex-row justify-between">
            <TouchableOpacity
              className="mx-8 my-8 text-slate-300"
              onPress={() => {
                navigation.navigate('Details');
              }}>
              <Text className="text-black text-lg">SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mx-8 my-8"
              onPress={() => {
                navigation.navigate('Onboarding3');
              }}>
              <Text className="text-black text-lg">NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Onboarding2;

const styles = StyleSheet.create({});
