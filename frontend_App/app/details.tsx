import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PageHeader from "@/components/PageHeader";
// import { ScrollView } from "react-native-gesture-handler";
import DetailsHeader from "@/components/DetailsHeader";
import DescriptionSection from "@/components/DescriptionSection";

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

  return (
    <GestureHandlerRootView className="w-full h-full bg-[#F9F9F9]">
      <PageHeader title={"Detail"} showHeaderRight={true} bgColor="#F9F9F9" />
      <View className="h-full flex-col justify-between">
        <ScrollView>
          <View className="mx-5">
            
            <DetailsHeader
              image_url={image_url}
              name={name}
              rating={Number(rating)}
              type={type}
            />
          <DescriptionSection description={description}/>
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default DetailsPage;
