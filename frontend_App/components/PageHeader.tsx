import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Router, Stack } from "expo-router";
import { Button } from "react-native";
import { useState } from "react";

import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from '@expo/vector-icons/Feather';
import { GestureHandlerRootView } from "react-native-gesture-handler";
interface HeaderProps {
  title: string;
  showHeaderRight: boolean;
  bgColor: string;
}

const PageHeader: React.FC<HeaderProps> = ({
  title,
  showHeaderRight,
  bgColor,
}) => {
    const [count, setCount] = useState(0);
  return (
    <Stack.Screen
      options={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTitleAlign: "center",
        
        headerTitle: () => (
          <Text className="text-xl text-[#242424]  font-[Sora-SemiBold]">
            {/* {" "} */}
            {title}
          </Text>
        ),
     
        headerRight:showHeaderRight? () => (
            <Feather name='heart' style={{marginRight:15}} size={24} color='black' />
        ):undefined,
        headerBackVisible: false,
        headerLeft:()=>(
            <GestureHandlerRootView className="flex-row items-center gap-4">
                <TouchableOpacity className="pl-2" onPress={()=>router.back()}>
                <Ionicons name="chevron-back-sharp"  size={24} color="black" />
                </TouchableOpacity>
            </GestureHandlerRootView>
        )
      }}
    />
  );
};

export default PageHeader;
