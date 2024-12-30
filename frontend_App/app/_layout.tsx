
import { Stack } from 'expo-router/stack';
import "../global.css";
import { useFonts } from "expo-font";
// import { NativeWindStyleSheet } from "nativewind";
// import { styled } from 'nativewind';




export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="index"/>
  </Stack>
}
