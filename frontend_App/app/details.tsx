import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PageHeader from '@/components/PageHeader';

const DetailsPage = () => {
    const { name, image_url, type, description, price, rating } = useLocalSearchParams() as { name: string, image_url: string, type: string, description: string, price: string, rating: string };
  
  return (
    <GestureHandlerRootView>
      <PageHeader title="Detail" showHeaderRight={true} bgColor="#F9F9F9" />
      <Text>DetailsPage {name}</Text>
    </GestureHandlerRootView>
  )
}

export default DetailsPage

