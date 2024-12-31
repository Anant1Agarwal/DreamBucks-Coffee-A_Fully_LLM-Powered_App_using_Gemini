import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";


const SearchArea = () => {
  
  return (
    <View
    className='w-full items-center bg-[#222222] pb-6'>
    <View className='flex w-[90%] pt-8'>
    <Text className='text-[#A2A2A2] text-sm font-[Sora-Regular]'>
        Location
    </Text>
    <Text className='text-white text font-[Sora-Regular]'>
       Delhi, India
    </Text>

    
    <View className='w-full mt-5 flex-row justify-between'>
        <View 
        className="flex  w-[80%] h-14 px-4 bg-[#4D5661] rounded-2xl focus:border-secondary justify-center"
        >
        <AntDesign name="search1" size={24} color="white" />
        </View>

        <TouchableOpacity 
         style={{
          display:"flex",
          flex: 1,
          backgroundColor: "#285F43",
          height:40,
          width: 56,
          borderRadius: 13,
          alignItems: "center",
          justifyContent: "center",
        }}
        >
        <Entypo name="sound-mix" size={24} color="white" />
        </TouchableOpacity> 
    </View>
    </View>
</View>

  );
};

export default SearchArea;
