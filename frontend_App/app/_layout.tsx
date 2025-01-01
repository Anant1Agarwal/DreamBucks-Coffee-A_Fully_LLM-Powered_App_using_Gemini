import { Stack } from "expo-router/stack";
import "../global.css";
import { useFonts } from "expo-font";
import { CartProvider } from "@/components/CartContext";
// import { NativeWindStyleSheet } from "nativewind";
// import { styled } from 'nativewind';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Sora-Regular": require("../assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("../assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Bold": require("../assets/fonts/Sora-Bold.ttf"),
  });

  // wait for fonts to be loaded
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: true }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}
