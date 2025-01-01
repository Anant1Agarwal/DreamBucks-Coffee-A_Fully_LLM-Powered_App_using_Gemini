import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PageHeader from "@/components/PageHeader";
// import { ScrollView } from "react-native-gesture-handler";
import DetailsHeader from "@/components/DetailsHeader";
import DescriptionSection from "@/components/DescriptionSection";
import SizesSection from "@/components/SizesSection";
import { useCart } from "@/components/CartContext";
import Toast from "react-native-toast-message";
const DetailsPage = () => {
  const { name, image_url, type, description, price, rating } =
    useLocalSearchParams() as {
      name: string;
      image_url: string;
      type: string;
      description: string;
      price: string;
      rating: string;
    };
    const {addToCart} = useCart(); 
    const buyNow=()=>{
      addToCart(name,1);
       Toast.show({
            type: 'success',
            text1: (`${name} added to cart`),
            text2: 'Want to add more ? 😋'
          });
          router.back(); 
    }

  return (
    <GestureHandlerRootView className="w-full h-full bg-[#F9F9F9]">
      <PageHeader title={"Detail"} showHeaderRight={true} bgColor="#F9F9F9" />
      <View className="h-full flex-col justify-between">
        <ScrollView className="flex-grow">
          <View className="mx-5">
            <DetailsHeader
              image_url={image_url}
              name={name}
              rating={Number(rating)}
              type={type}
            />
            <DescriptionSection description={description} />
            <SizesSection />
          </View>
        </ScrollView>

        <View  className="flex-row justify-between bg-white rounded-tl-3xl rounded-tr-3xl pt-3 px-6 pb-7 " >
          <View>
            <Text className="text-base font-[Sora-SemiBold] text-[#A2A2A2] pb-3">
              Price
            </Text>
            <Text className="text-app_green_color text-2xl font-[Sora-SemiBold]">$ {price}</Text>
          </View>
          <TouchableOpacity onPress={()=>{buyNow()}} className="bg-app_best_green w-[70%] rounded-3xl items-center justify-center">
            <Text className="text-xl text-white font-[Sora-Regular]" >Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default DetailsPage;
