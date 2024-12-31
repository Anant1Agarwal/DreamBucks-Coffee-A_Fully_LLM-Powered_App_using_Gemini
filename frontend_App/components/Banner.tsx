import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
const Banner = () => {
  return (
    <View className="rounded-lg  items-center">
      <View className="absolute w-full h-[100px] -top-1 items-center bg-[#222222] pb-10" />
      <Image
        source={require("../assets/images/banner2.png")}
        className="w-[90%] h-40 rounded-3xl"
      />
      <View className="w-[90%] pl-7 absolute mt-2">
        {/* Promo Badge */}
        <Text className="  rounded-lg mb-1 text-m p-1.5 font-[Sora-SemiBold] self-start"></Text>
        {/* Promo Title */}

        <View className="w-[75%] h-7 top-6"></View>
        <View className="w-[60%] h-7 top-9"></View>

        {/* <Text
          className="text-white text-4xl font-[Sora-SemiBold] mt-3 w-[75%] -top-16"
          style={{ lineHeight: 45 }}
        ></Text> */}
      </View>
    </View>
  );
};

export default Banner;
