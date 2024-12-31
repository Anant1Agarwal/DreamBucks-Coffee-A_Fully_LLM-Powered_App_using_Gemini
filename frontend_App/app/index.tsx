import { Text, View, SafeAreaView, ImageBackground } from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <View className="w-full h-full">
        <ImageBackground
          className="w-full h-full items-center"
          source={require("../assets/images/index_bg_image.png")}
        >
          <View className="flex h-[48%]" />
          <View className="flex w-[80%]">
            <Text className="text-white text-[40px] font-bold text-left font-[Sora-Bold] ">
              Welcome to DreamBucks Coffee!
            </Text>

            <Text className="pt-3 mt-2 mb-28 text-white text-[21px] text-left font-[Sora-Regular]">
              Come Fall in Love with coffee.
            </Text>
    
              <TouchableOpacity
                style={{
                  marginTop: 18 ,
                  backgroundColor: "#1E3932",
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text className="text-xl text-white font-[Sora-SemiBold]">
                  Get Started
                </Text>
              </TouchableOpacity>
    
           
          </View>
        </ImageBackground>
      </View>
    </GestureHandlerRootView>
  );
}
